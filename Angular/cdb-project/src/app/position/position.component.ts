import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventLog } from '../model/event-log-model';
import { PositionModel } from '../model/position-model';
import { LoginApiCallService } from '../service/login-api-call-service.service';
import { PositionApiCallService } from '../service/position-api-call-service.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  positionModel: PositionModel = new PositionModel();

  positionForm!: FormGroup;

  positionId!:number | null;
  mode: string = 'ADD';

  editData: any = null;

  eventLog: EventLog = new EventLog();

  constructor(private fb: FormBuilder, private loginApi: LoginApiCallService, private apiCall: PositionApiCallService, private router: Router) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.editData = sessionStorage.getItem('editData');
    this.editData = JSON.parse(this.editData);
    
    if (this.editData!=null && this.editData!=undefined){
      this.positionId = this.editData.positionId;
    }else{
      this.positionId = null;
    }

    if (this.positionId==null || this.positionId==undefined){
      this.mode='ADD';
      this.router.navigate([]);
    }
    else if (this.positionId!=null && this.positionId!=undefined){
      this.loadData();
      this.mode='EDIT';
      this.router.navigate([]);
    }
    this.positionModel.officeType = 'กรมสรรพสามิต';
  }

  reactiveForm(){
    this.positionForm = this.fb.group({
      positionName: ['', Validators.required],
      officeType: [''],
      orderNo:['', Validators.required],
    });
  }

  loadData(){
    this.apiCall.getPosition(this.positionId).subscribe(data=>{
      this.positionModel = data;
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
    this.eventLog.remark = "ข้อมูลตำแหน่งงาน";
    this.eventLog.eventDate = new Date();
    this.loginApi.saveLog(this.eventLog);
  }

  save(){
    this.positionForm.markAllAsTouched();
    if (this.positionForm.valid) {
      if (this.mode=='ADD' && this.checkCase() == true){
        this.positionModel.createDate = new Date();
        this.apiCall.add(this.positionModel)
        
        let event = JSON.parse(this.loginApi.getUserData());
        this.eventLog.personName = event.personName;
        this.eventLog.positionName = event.positionName;
        this.eventLog.officeName = event.officeName;
        this.eventLog.userLogin = event.userName;
        this.eventLog.eventType = "POSITION";
        this.eventLog.eventSubType = "ADD";
        this.eventLog.eventDate = new Date();
        this.loginApi.saveLog(this.eventLog);
      }else if (this.mode=='EDIT' && this.checkCase() == true){
        this.positionModel.updateBy = 'pip';
        this.positionModel.updateDate = new Date();
        this.apiCall.edit(this.positionModel);

        let event = JSON.parse(this.loginApi.getUserData());
        this.eventLog.personName = event.personName;
        this.eventLog.positionName = event.positionName;
        this.eventLog.officeName = event.officeName;
        this.eventLog.userLogin = event.userName;
        this.eventLog.dataId = this.positionModel.positionId;
        this.eventLog.eventType = "POSITION";
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

  checkCase(): boolean{
    let check = false;
    switch(true){
      case (this.positionModel.positionName!.length>150):
        Swal.fire({
          title: 'ชื่อหน่วยงานไม่ถูกต้อง',
          text: 'ชื่อหน่วยงานต้องมีความยาวไม่เกิน 150 ตัว',
          icon: 'error',
          width: 650,
          confirmButtonText: 'ตกลง'
        });
        break;
      case (this.positionModel.officeType!.length>50):
        Swal.fire({
          title: 'ประเภทหน่วยงานไม่ถูกต้อง',
          text: 'ประเภทหน่วยงานต้องมีความยาวไม่เกิน 50 ตัว',
          icon: 'error',
          width: 650,
          confirmButtonText: 'ตกลง'
        });
        break;
      case (this.positionModel.orderNo!.toString.length>11):
        Swal.fire({
          title: 'เลขลำดับไม่ถูกต้อง',
          text: 'เลขลำดับต้องมีความยาวไม่เกิน 11 ตัว',
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
