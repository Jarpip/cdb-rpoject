import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';
import { EventLog } from '../model/event-log-model';
import { UserModel } from '../model/ีuser-model';
import { LoginApiCallService } from '../service/login-api-call-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  hide = true;

  userModel: UserModel = new UserModel();
  userList!: Array<UserModel>;
  status: boolean = false;

  eventLog: EventLog = new EventLog();

  constructor(private fb: FormBuilder,private router: Router, private apiCall: LoginApiCallService) {}


  ngOnInit(): void {
    this.reactiveForm();
    this.apiCall.logout();
  }

  loadUser(){
    this.userModel.userName = this.userModel.userName.trim();
    this.userModel.password = this.userModel.password.trim();
    this.apiCall.login(this.userModel).subscribe(data=>{
      this.userList = data;
      const result = this.userList.find(data=>{
        return data.userName == this.userModel.userName && data.password == this.userModel.password;
      })
      if (this.userList.length>0){
        if (result != undefined){
          if (result?.activeFlag == 'Y'){
            this.status = true;
            this.apiCall.updateUserData(result);
          }
          else{
            Swal.fire('user นี้ถูกระงับการเข้าถึง','','error');
          }
        }
        else{
          Swal.fire('ไม่พบ user นี้ในระบบ','กรุณาเช็ค username และ password','error');
        }
      }else{
        Swal.fire('ไม่พบ user นี้ในระบบ','กรุณาเช็ค username และ password','error');
      }
    })
  }

  reactiveForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  doLogin(){
    if (this.form.valid) {
      this.loadUser();
      setTimeout(()=>{
        if(this.apiCall.getUserName() != "" && this.apiCall.getUserName() != null && this.apiCall.getUserName() != undefined){
          Swal.fire({
            icon: 'success',
            title: 'Login สำเร็จ',
            timer: 1500
          });
          let event = JSON.parse(this.apiCall.getUserData());
          this.eventLog.personName = event.personName;
          this.eventLog.positionName = event.positionName;
          this.eventLog.officeName = event.officeName;
          this.eventLog.userLogin = event.userName;
          this.eventLog.eventType = "LOGIN"
          this.eventLog.eventDate = new Date();
          this.apiCall.saveLog(this.eventLog);
          this.router.navigate(['/main/project-search']);
        }
      }, 50)
    }else{
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบ',
        icon: 'error',
        width: 650,
        confirmButtonText: 'ตกลง'
      });
    }
  }

}
