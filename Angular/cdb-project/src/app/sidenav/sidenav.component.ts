import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EventLog } from '../model/event-log-model';
import { MenuModel } from '../model/menu-model';
import { LoginApiCallService } from '../service/login-api-call-service.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;

  menuList: Array<MenuModel> = [];
  userRole!: string;

  eventLog: EventLog = new EventLog();

  options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });
  
  constructor(private _formBuilder: FormBuilder, private apiCall: LoginApiCallService) { }

  ngOnInit(): void {
    this.loadMenu();
  }


  loadMenu(){
    this.userRole = this.apiCall.getUserRole();
    this.apiCall.getMenu(this.userRole).subscribe(data=>{
      for (let i=0; i < data.length;i++){
        if (data[i].activeFlag == 'Y'){
          this.menuList[i] = data[i];
        }
      }
    })
  }

  clearEditData(menu: MenuModel){
    sessionStorage.clear();
    let data = JSON.parse(this.apiCall.getUserData());
    this.eventLog.personName = data.personName;
    this.eventLog.positionName = data.positionName;
    this.eventLog.officeName = data.officeName;
    this.eventLog.userLogin = data.userName;
    this.eventLog.eventType = "MENU";
    this.eventLog.eventSubType = "SELECT";
    this.eventLog.remark = menu.menuName;
    this.eventLog.eventDate = new Date();
    this.apiCall.saveLog(this.eventLog);
  }

}
