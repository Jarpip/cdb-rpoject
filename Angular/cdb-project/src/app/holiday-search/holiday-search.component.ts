import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventLog } from '../model/event-log-model';
import { HoliModel } from '../model/holiday-model';
import { HolidayApiCallService } from '../service/holiday-api-call-service.service';
import { LoginApiCallService } from '../service/login-api-call-service.service';

@Component({
  selector: 'app-holiday-search',
  templateUrl: './holiday-search.component.html',
  styleUrls: ['./holiday-search.component.css']
})
export class HolidaySearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  list!: HoliModel[];

  displayedColumns: string[] = ['row', 'holidayDate', 'holidayName', 'edit'];
  dataSource : any;

  currentYear: number = new Date().getFullYear();
  holidayName: String = '';
  startDate: Date | null = new Date(this.currentYear, 0, 1);
  endDate: Date | null = new Date(this.currentYear, 11, 31);

  perm: boolean = false;
  userRole!: string;

  eventLog: EventLog = new EventLog();

  constructor(private router: Router, private apiCall: HolidayApiCallService, private loginApi: LoginApiCallService) {
  }

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
          if (data[i].menus.length>0 && data[i].menus[j].activeFlag=='Y' && data[i].menus[j].menuId == 202 && data[i].menus[j].parentMenuId == 102){
            this.perm = true;
          }
        }
      }
    })
  }

  save(){
    this.loadMenu();
    if (this.perm == true){
      this.router.navigate(['/main/holiday']);

      let event = JSON.parse(this.loginApi.getUserData());
      this.eventLog.personName = event.personName;
      this.eventLog.positionName = event.positionName;
      this.eventLog.officeName = event.officeName;
      this.eventLog.userLogin = event.userName;
      this.eventLog.eventType = "HOLIDAY";
      this.eventLog.eventSubType = "SELECT";
      this.eventLog.remark = "เพิ่มวันหยุด"
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
      this.router.navigate(['/main/holiday']);

      let event = JSON.parse(this.loginApi.getUserData());
      this.eventLog.personName = event.personName;
      this.eventLog.positionName = event.positionName;
      this.eventLog.officeName = event.officeName;
      this.eventLog.userLogin = event.userName;
      this.eventLog.eventType = "HOLIDAY";
      this.eventLog.eventSubType = "SELECT";
      this.eventLog.remark = "แก้ไขวันหยุด"
      this.eventLog.eventDate = new Date();
      this.loginApi.saveLog(this.eventLog);
    }else{
      Swal.fire('หน้านี้ปิดปรับปรุงหรือคุณอาจไม่มีสิทธิ์เข้าถึง','','error');
    }
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
        this.eventLog.dataId = data.holidayId;
        this.eventLog.eventType = "HOLIDAY";
        this.eventLog.eventSubType = "DELETE";
        this.eventLog.eventDate = new Date();
        this.loginApi.saveLog(this.eventLog);

        this.apiCall.deleteHoliday(data.holidayId);
        setTimeout(()=>{
          this.getData();
        }, 50)
      }
    });
  }

  getData(){
    this.apiCall.getHolidayData().subscribe(data=>{
      this.list = data;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
    })
  }

  search(start: any, end:any, name:any){
    if (start==null||end==null){
      Swal.fire('กรุณาระบุช่วงวันที่ที่ต้องการค้นหา', '', 'error');
      this.getData();
    }else{
      this.apiCall.getHolidaySearchData(this.convertDateBack(start), this.convertDateBack(end), name).subscribe(data=>{
        this.list = data;
        this.dataSource = new MatTableDataSource(this.list);
        this.dataSource.paginator = this.paginator;
      })

      let event = JSON.parse(this.loginApi.getUserData());
      this.eventLog.personName = event.personName;
      this.eventLog.positionName = event.positionName;
      this.eventLog.officeName = event.officeName;
      this.eventLog.userLogin = event.userName;
      this.eventLog.eventType = "HOLIDAY";
      this.eventLog.eventSubType = "SEARCH";
      this.eventLog.eventDate = new Date();
      this.loginApi.saveLog(this.eventLog);
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

  convertDateBack(data:any){
    data = new Date(data);
    var cyear = new Date().getFullYear();
    var month = ('0'+(data.getMonth()+1)).slice(-2);
    var day = ("0" + data.getDate()).slice(-2);
    var year = data.getFullYear();
    year = parseInt(year);
    if (year<=cyear){
       year = year;
    }else{
       year = year-543;
    }
       
    var formatDate = (year+"-"+month+'-'+day);
    return formatDate;
  }  

  convertToThaiDate(data:any){
    let parts = data.split('-');
    return (('0'+parts[2]).slice(-2)+'/'+('0'+parts[1]).slice(-2)+'/'+(parseInt(parts[0])+543).toString())
  }

}
