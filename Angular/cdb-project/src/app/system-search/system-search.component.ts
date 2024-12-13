import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SystemApiCallService } from '../service/system-api-call-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SysModel } from '../model/system-model';
import Swal from 'sweetalert2';
import { LoginApiCallService } from '../service/login-api-call-service.service';
import { EventLog } from '../model/event-log-model';

@Component({
  selector: 'app-system-search',
  templateUrl: './system-search.component.html',
  styleUrls: ['./system-search.component.css']
})
export class SystemSearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  sysModel: SysModel = new SysModel;

  currentDate : any = new Date();
 
  list!: SysModel[];

  displayedColumns: string[] = ['systemCode','systemName', 'remark', 'edit'];
  dataSource : any;

  mode: string = 'ADD';

  perm: boolean = false;
  userRole!: string;

  eventLog: EventLog = new EventLog();

  constructor(private apiCall: SystemApiCallService, private router: Router, private loginApi: LoginApiCallService) {};

  ngOnInit(): void {
    this.loadMenu();
    this.getData();
    sessionStorage.clear();
  }

  loadMenu(){
    this.userRole = this.loginApi.getUserRole();
    this.loginApi.getMenu(this.userRole).subscribe(data=>{
      for (let i=0; i < data.length; i++){
        for (let j=0; j < data[i].menus.length; j++){
          if (data[i].menus.length>0 && data[i].menus[j].activeFlag=='Y' && data[i].menus[j].menuId == 200 && data[i].menus[j].parentMenuId == 100){
            this.perm = true;
          }
        }
      }
    })
  }

  save(){
    this.loadMenu();
    if (this.perm == true){
      this.router.navigate(['/main/system']);
      
      let event = JSON.parse(this.loginApi.getUserData());
      this.eventLog.personName = event.personName;
      this.eventLog.positionName = event.positionName;
      this.eventLog.officeName = event.officeName;
      this.eventLog.userLogin = event.userName;
      this.eventLog.eventType = "SYSTEM";
      this.eventLog.eventSubType = "SELECT";
      this.eventLog.remark = "เพิ่มระบบ"
      this.eventLog.eventDate = new Date();
      this.loginApi.saveLog(this.eventLog);
    }else{
      Swal.fire('หน้านี้ปิดปรับปรุงหรือคุณอาจไม่มีสิทธิ์เข้าถึง','','error');
    }
  }

  editData(data:any){
    this.loadMenu();
    if (this.perm == true){
      sessionStorage.setItem('editData',JSON.stringify(data));
      this.router.navigate(['/main/system']);

      let event = JSON.parse(this.loginApi.getUserData());
      this.eventLog.personName = event.personName;
      this.eventLog.positionName = event.positionName;
      this.eventLog.officeName = event.officeName;
      this.eventLog.userLogin = event.userName;
      this.eventLog.eventType = "SYSTEM";
      this.eventLog.eventSubType = "SELECT";
      this.eventLog.remark = "แก้ไขระบบ"
      this.eventLog.eventDate = new Date();
      this.loginApi.saveLog(this.eventLog);
    }else{
      Swal.fire('หน้านี้ปิดปรับปรุงหรือคุณอาจไม่มีสิทธิ์เข้าถึง','','error');
    }
  }

  stringToDate(value: string | null): Date | null {
    if(value==null) return null;
    value = value.trim();    
    if(value=='-') return null;
    if(value.indexOf('/') == -1) return null;
    const check = value.split(/[\./-]/);
    var d = check[0];
    var m = check[1];
    var y = check[2];    
   
    if(check.length != 3 || d == null || m== null || y==null) return null;
    if((d.length < 1 || d.length > 2) || (m.length < 1 || m.length > 2) || (y.length != 4)) return null;

    const currentDate = new Date();
    let year: number = currentDate.getFullYear();
    let month: number = currentDate.getMonth();
    let day: number = currentDate.getDate();

    if (typeof value === 'string'){

      const str = value.split('/');

      day = !!str[0] ? +str[0] : day;
      month = !!str[1] ? +str[1] : month;
      year = (!!str[2] ? +str[2].length <= 3 ? +str[2] + 2000 : +str[2] : year) - 543;

      return new Date(year, month - 1, day);
    }
    return null;
  }

  search(date: any, code:any){
    if (date==""||date==null||date==undefined){
      if (code==null||code==""||code==undefined){
        this.getData();
      }
      else{
        this.apiCall.getCodeSearchData(code).subscribe(data=>{
          this.list = data;
          this.dataSource = new MatTableDataSource(this.list);
          this.dataSource.paginator = this.paginator;
        })
      }
    }
    else{
      if (code==""||code==null||code==undefined){
        this.apiCall.getDateSearchData(this.convertDateBack(date)).subscribe(data=>{
          this.list = data;
          this.dataSource = new MatTableDataSource(this.list);
          this.dataSource.paginator = this.paginator;
        })
      }
      else{
        this.apiCall.getBothSearchData(this.convertDateBack(date),code).subscribe(data=>{
          this.list = data;
          this.dataSource = new MatTableDataSource(this.list);
          this.dataSource.paginator = this.paginator;
        })
      }
    }

    let event = JSON.parse(this.loginApi.getUserData());
    this.eventLog.personName = event.personName;
    this.eventLog.positionName = event.positionName;
    this.eventLog.officeName = event.officeName;
    this.eventLog.userLogin = event.userName;
    this.eventLog.eventType = "SYSTEM";
    this.eventLog.eventSubType = "SEARCH";
    this.eventLog.eventDate = new Date();
    this.loginApi.saveLog(this.eventLog);
    
  }

  getData(){
    this.apiCall.getSystemData().subscribe(data=>{
      this.list = data;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
    })
  }

  deleteData(data:any){
    Swal.fire({
      title: 'คุณยืนยันที่จะลบข้อมูลนี้หรือไม่?',
      text: 'เมื่อยืนยันแล้วจะไม่สามารถทำการกู้คืนได้อีก',
      icon: 'warning',
      width: 650,
      confirmButtonText: 'ใช่',
      cancelButtonText: "ไม่",
      showCancelButton: true
    }).then((result)=>{
      if (result.isConfirmed){
        let event = JSON.parse(this.loginApi.getUserData());
        this.eventLog.personName = event.personName;
        this.eventLog.positionName = event.positionName;
        this.eventLog.officeName = event.officeName;
        this.eventLog.userLogin = event.userName;
        this.eventLog.dataId = data.systemId;
        this.eventLog.eventType = "SYSTEM";
        this.eventLog.eventSubType = "DELETE";
        this.eventLog.eventDate = new Date();
        this.loginApi.saveLog(this.eventLog);

        this.apiCall.deleteSystem(data.systemId);
        setTimeout(()=>{
          this.getData();
        }, 100)
      }
    });
  }

  convertDateBack(data:any){
    data = new Date(data);
    let cyear = new Date().getFullYear();
    let month = ('0'+(data.getMonth()+1)).slice(-2);
    let day = ("0" + data.getDate()).slice(-2);
    let year = data.getFullYear();
    year = parseInt(year);
    if (year<=cyear){
       year = year;
    }else{
       year = year-543;
    }
       
    var formatDate = (year+"-"+month+'-'+day);
    return formatDate;
  }

}
