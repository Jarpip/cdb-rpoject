import { Component, OnInit } from '@angular/core';
import { EventLog } from '../model/event-log-model';
import { LoginApiCallService } from '../service/login-api-call-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  sideNavStatus: boolean = false; 

  event: EventLog = new EventLog();

  constructor(private apiCall: LoginApiCallService) { }

  ngOnInit(): void {
  }

}


