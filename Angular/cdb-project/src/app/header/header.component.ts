import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventLog } from '../model/event-log-model';
import { LoginApiCallService } from '../service/login-api-call-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName!: string;
  userRole!: string;

  eventLog: EventLog = new EventLog();

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  constructor(private apiCall: LoginApiCallService, private router: Router) {
  }

  ngOnInit(): void {
    this.userName = this.apiCall.getUserName();
    this.userRole = this.apiCall.getUserRole();
  }

  doLogout(){
    let event = JSON.parse(this.apiCall.getUserData());
    this.eventLog.personName = event.personName;
    this.eventLog.positionName = event.positionName;
    this.eventLog.officeName = event.officeName;
    this.eventLog.userLogin = event.userName;
    this.eventLog.eventType = "LOGOUT"
    this.eventLog.eventDate = new Date();
    this.apiCall.saveLog(this.eventLog);
    this.router.navigate(['/login']);
  }

  SideNavToggle(){
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
    this.menuStatus = false;
  }

  CloseSideNav(){
    this.menuStatus = false;
    this.sideNavToggled.emit(this.menuStatus);
  }
}
