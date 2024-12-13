import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventLog } from '../model/event-log-model';
import { HoliModel } from '../model/holiday-model';
import { HolidayApiCallService } from '../service/holiday-api-call-service.service';
import { LoginApiCallService } from '../service/login-api-call-service.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent implements OnInit {

  holiModel: HoliModel = new HoliModel();

  holidayForm!: FormGroup;

  holidayId!:number | null;
  mode: string = 'ADD';

  editData: any;

  eventLog: EventLog = new EventLog();

  constructor(private fb: FormBuilder, private loginApi: LoginApiCallService, private router: Router, private apiCall: HolidayApiCallService) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.editData = sessionStorage.getItem('editData');
    this.editData = JSON.parse(this.editData);

    if (this.editData!=null && this.editData!=undefined){
      this.holidayId = this.editData.holidayId;
    }else{
      this.holidayId = null;
    }

    if (this.holidayId==null){
      this.mode='ADD';
      this.router.navigate([]);
    }
    else if (this.holidayId!=null){
      this.loadEditData();
      this.mode='EDIT';
      this.router.navigate([]);
    }  
    
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
    this.eventLog.remark = "ข้อมูลวันหยุด";
    this.eventLog.eventDate = new Date();
    this.loginApi.saveLog(this.eventLog);
  }

  loadEditData(){
    this.apiCall.getHoliday(this.holidayId).subscribe(data=>{
      this.holiModel = data;
    })
  }

  reactiveForm() {
    this.holidayForm = this.fb.group({
      holidayDate: ['', Validators.required],
      holidayName: ['', Validators.required]
    });
  }

  save(){
    this.holidayForm.markAllAsTouched();
    if (this.holidayForm.valid) {
      if (this.mode=='ADD' && this.checkCase() == true){
        this.holiModel.createDate = new Date();
        this.apiCall.add(this.holiModel);

        let event = JSON.parse(this.loginApi.getUserData());
        this.eventLog.personName = event.personName;
        this.eventLog.positionName = event.positionName;
        this.eventLog.officeName = event.officeName;
        this.eventLog.userLogin = event.userName;
        this.eventLog.eventType = "HOLIDAY";
        this.eventLog.eventSubType = "ADD";
        this.eventLog.eventDate = new Date();
        this.loginApi.saveLog(this.eventLog);
      }else if (this.mode=='EDIT' && this.checkCase() == true){
        this.holiModel.updateBy = 'pip';
        this.holiModel.updateDate = new Date();
        this.apiCall.edit(this.holiModel);

        let event = JSON.parse(this.loginApi.getUserData());
        this.eventLog.personName = event.personName;
        this.eventLog.positionName = event.positionName;
        this.eventLog.officeName = event.officeName;
        this.eventLog.userLogin = event.userName;
        this.eventLog.dataId = this.holiModel.holidayId;
        this.eventLog.eventType = "HOLIDAY";
        this.eventLog.eventSubType = "EDIT";
        this.eventLog.eventDate = new Date();
        this.loginApi.saveLog(this.eventLog); 

        this.mode = 'ADD';
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
      case (this.holiModel.holidayName.length>150):
        Swal.fire({
          title: 'ชื่อวันหยุดไม่ถูกต้อง',
          text: 'ชื่อวันหยุดต้องมีความยาวไม่เกิน 150 ตัว',
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

}
