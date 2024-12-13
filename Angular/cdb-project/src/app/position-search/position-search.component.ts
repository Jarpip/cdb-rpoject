import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventLog } from '../model/event-log-model';
import { PositionModel } from '../model/position-model';
import { LoginApiCallService } from '../service/login-api-call-service.service';
import { PositionApiCallService } from '../service/position-api-call-service.service';

@Component({
  selector: 'app-position-search',
  templateUrl: './position-search.component.html',
  styleUrls: ['./position-search.component.css']
})
export class PositionSearchComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  positionModel: PositionModel = new PositionModel();
  list!: PositionModel[];

  displayedColumns: string[] = ['row', 'positionName', 'officeType', 'orderNo', 'edit'];
  dataSource : any;

  perm: boolean = false;
  userRole!: string;

  eventLog: EventLog = new EventLog();

  constructor(private router: Router, private apiCall: PositionApiCallService, private loginApi: LoginApiCallService) { }

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
          if (data[i].menus.length>0 && data[i].menus[j].activeFlag=='Y' && data[i].menus[j].menuId == 204 && data[i].menus[j].parentMenuId == 104){
            this.perm = true;
          }
        }
      }
    })
  }

  save(){
    this.loadMenu();
    if (this.perm == true){
      this.router.navigate(['/main/position']);

      let event = JSON.parse(this.loginApi.getUserData());
      this.eventLog.personName = event.personName;
      this.eventLog.positionName = event.positionName;
      this.eventLog.officeName = event.officeName;
      this.eventLog.userLogin = event.userName;
      this.eventLog.eventType = "POSITION";
      this.eventLog.eventSubType = "SELECT";
      this.eventLog.remark = "เพิ่มตำแหน่งงาน"
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
      this.router.navigate(['/main/position']);

      let event = JSON.parse(this.loginApi.getUserData());
      this.eventLog.personName = event.personName;
      this.eventLog.positionName = event.positionName;
      this.eventLog.officeName = event.officeName;
      this.eventLog.userLogin = event.userName;
      this.eventLog.eventType = "POSITION";
      this.eventLog.eventSubType = "SELECT";
      this.eventLog.remark = "แก้ไขตำแหน่งงาน"
      this.eventLog.eventDate = new Date();
      this.loginApi.saveLog(this.eventLog);
    }else{
      Swal.fire('หน้านี้ปิดปรับปรุงหรือคุณอาจไม่มีสิทธิ์เข้าถึง','','error');
    }
    
  }

  getData(){
    this.apiCall.getPositionData().subscribe(data=>{
      this.list = data;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
    })
  }

  search(data: PositionModel){
    this.apiCall.getPositionSearchData(data.positionName, data.officeType).subscribe(data=>{
      this.list = data;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
    })

    let event = JSON.parse(this.loginApi.getUserData());
    this.eventLog.personName = event.personName;
    this.eventLog.positionName = event.positionName;
    this.eventLog.officeName = event.officeName;
    this.eventLog.userLogin = event.userName;
    this.eventLog.eventType = "POSITION";
    this.eventLog.eventSubType = "SEARCH";
    this.eventLog.eventDate = new Date();
    this.loginApi.saveLog(this.eventLog);
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
        this.eventLog.dataId = data.positionId;
        this.eventLog.eventType = "POSITION";
        this.eventLog.eventSubType = "DELETE";
        this.eventLog.eventDate = new Date();
        this.loginApi.saveLog(this.eventLog);

        this.apiCall.deletePosition(data.positionId);
        setTimeout(()=>{
          this.getData();
        }, 50)
      }
    });
    
  }

}
