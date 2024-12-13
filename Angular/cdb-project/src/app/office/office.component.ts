import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventLog } from '../model/event-log-model';
import { OfficeModel } from '../model/office-model';
import { LoginApiCallService } from '../service/login-api-call-service.service';
import { OfficeApiCallService } from '../service/office-api-call-service.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css']
})
export class OfficeComponent implements OnInit {

  officeModel: OfficeModel = new OfficeModel();

  officeForm!: FormGroup;

  officeId!:number | null;
  mode: string = 'ADD';

  editData: any;

  eventLog: EventLog = new EventLog();

  constructor(private fb: FormBuilder, private loginApi: LoginApiCallService, private apiCall: OfficeApiCallService, private router: Router) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.editData = sessionStorage.getItem('editData');
    this.editData = JSON.parse(this.editData);

    if (this.editData!=null && this.editData!=undefined){
      this.officeId = this.editData.officeId;
    }else{
      this.officeId = null;
    }

    if (this.officeId==null){
      this.mode='ADD';
      this.router.navigate([]);
    }
    else if (this.officeId!=null){
      this.loadEditData();
      this.mode='EDIT';
      this.router.navigate([]);
    }
    this.officeModel.officeType = 'กรมสรรพสามิต';
  }

  loadEditData(){
    this.apiCall.getOffice(this.officeId).subscribe(data=>{
      this.officeModel = data;
    })
  }

  clearEditData(){
    sessionStorage.clear();
    let event = JSON.parse(this.loginApi.getUserData());
    this.eventLog = new EventLog();
    this.eventLog.personName = event.personName;
    this.eventLog.positionName = event.positionName;
    this.eventLog.officeName = event.officeName;
    this.eventLog.userLogin = event.userName;
    this.eventLog.eventType = "MENU";
    this.eventLog.eventSubType = "SELECT";
    this.eventLog.remark = "ข้อมูลหน่วยงาน";
    this.eventLog.eventDate = new Date();
    this.loginApi.saveLog(this.eventLog);
  }

  reactiveForm(){
    this.officeForm = this.fb.group({
      officeName: ['', Validators.required],
      officeType: [''],
      orderNo:['', Validators.required],
      officeColor:['', Validators.required]
    });
  }

  save(){
    this.officeForm.markAllAsTouched();
    if (this.officeForm.valid) {
      if (this.mode=='ADD' && this.checkCase() == true){
        this.officeModel.createDate = new Date();
        this.apiCall.add(this.officeModel);

        let event = JSON.parse(this.loginApi.getUserData());
        this.eventLog.personName = event.personName;
        this.eventLog.positionName = event.positionName;
        this.eventLog.officeName = event.officeName;
        this.eventLog.userLogin = event.userName;
        this.eventLog.eventType = "OFFICE";
        this.eventLog.eventSubType = "ADD";
        this.eventLog.eventDate = new Date();
        this.loginApi.saveLog(this.eventLog);
      }else if (this.mode=='EDIT' && this.checkCase() == true){
        this.officeModel.updateBy = 'pip';
        this.officeModel.updateDate = new Date();
        this.apiCall.edit(this.officeModel);

        let event = JSON.parse(this.loginApi.getUserData());
        this.eventLog.personName = event.personName;
        this.eventLog.positionName = event.positionName;
        this.eventLog.officeName = event.officeName;
        this.eventLog.userLogin = event.userName;
        this.eventLog.dataId = this.officeModel.officeId;
        this.eventLog.eventType = "OFFICE";
        this.eventLog.eventSubType = "EDIT";
        this.eventLog.eventDate = new Date();
        this.loginApi.saveLog(this.eventLog); 

        this.mode = 'ADD'
      }
    }else{
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบ',
        icon: 'error',
        width: 650,
        confirmButtonText: 'ตกลง'
      });
    }
  }

  checkCase(){
    let check = false;
    switch(true){
      case (this.officeModel.officeName!.length>150):
        Swal.fire({
          title: 'ชื่อหน่วยงานไม่ถูกต้อง',
          text: 'ชื่อหน่วยงานต้องมีความยาวไม่เกิน 150 ตัว',
          icon: 'error',
          width: 650,
          confirmButtonText: 'ตกลง'
        });
        break;
      case (this.officeModel.officeType!.length>50):
        Swal.fire({
          title: 'ประเภทหน่วยงานไม่ถูกต้อง',
          text: 'ประเภทหน่วยงานต้องมีความยาวไม่เกิน 50 ตัว',
          icon: 'error',
          width: 650,
          confirmButtonText: 'ตกลง'
        });
        break;
      case (this.officeModel.orderNo!.toString.length>11):
        Swal.fire({
          title: 'เลขลำดับไม่ถูกต้อง',
          text: 'เลขลำดับต้องมีความยาวไม่เกิน 11 ตัว',
          icon: 'error',
          width: 650,
          confirmButtonText: 'ตกลง'
        });
        break;
      case (this.officeModel.officeColor!.length>10):
        Swal.fire({
          title: 'สีหน่วยงานไม่ถูกต้อง',
          text: 'สีหน่วยงานต้องมีความยาวไม่เกิน 10 ตัว',
          icon: 'error',
          width: 650,
          confirmButtonText: 'ตกลง'
        });
        break;
      default:
        check = true;
        break;
    }
    return check;
  }

}
