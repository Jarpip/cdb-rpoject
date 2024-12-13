import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventLog } from '../model/event-log-model';
import { ProjModel } from '../model/project-model';
import { LoginApiCallService } from '../service/login-api-call-service.service';
import { ProjectApiCallService } from '../service/project-api-call-service.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projectId!: number | null;

  mode: string = 'ADD';

  projModel: ProjModel = new ProjModel();
  listProject!: Array<ProjModel>;
  projectForm!: FormGroup;

  displayedColumns: string[] = ['systemProjectId', 'systemId', 'projectId'];

  editData: any;

  eventLog: EventLog = new EventLog();
  
  constructor(private fb: FormBuilder, private apiCall: ProjectApiCallService, private router: Router, private loginApi: LoginApiCallService) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.editData = sessionStorage.getItem('editData');
    this.editData = JSON.parse(this.editData);

    if (this.editData!=null && this.editData!=undefined){
      this.projectId = this.editData.projectId;
    }else{
      this.projectId = null;
    }

    if (this.projectId==null){
        this.mode='ADD';
        this.router.navigate([]);
    }
    else if (this.projectId!=null){
        this.loadData();
        this.mode='EDIT';
        this.router.navigate([]);
    }
  }

  loadData(){
    this.apiCall.getProject(this.projectId).subscribe(data=>{
      this.projModel = data;
    })
  }

  reactiveForm() {
    this.projectForm = this.fb.group({
      projectName: ['', Validators.required],
      projectCode: ['', Validators.required],
      contractNum: ['', Validators.required],
      contractDate: ['', Validators.required],
      remark: ['', Validators.required]
    });
  }

  stringToDate(value: string | null): Date | null {

    // 1. check format date
    //console.log('1. value -> ',value);
    if(value==null) return null;
    value = value.trim();    
    if(value=='-') return null;
    if(value.indexOf('/') == -1) return null;
    const check = value.split(/[\./-]/);
    var d = check[0];
    var m = check[1];
    var y = check[2];    
    //console.log('check.length=',check.length,'d=',d,'m=',m,'y=',y);
    if(check.length != 3 || d == null || m== null || y==null) return null;
    if((d.length < 1 || d.length > 2) || (m.length < 1 || m.length > 2) || (y.length != 4)) return null;

    //console.log('2. value ->', value);
    // 2. convert to thai year
    const currentDate = new Date();
    let year: number = currentDate.getFullYear();
    let month: number = currentDate.getMonth();
    let day: number = currentDate.getDate();

    if (typeof value === 'string'){

      const str = value.split('/');

      day = !!str[0] ? +str[0] : day;
      month = !!str[1] ? +str[1] : month;
      year = (!!str[2] ?
        // If year is less than 3 digit long, we add 2000.
        +str[2].length <= 3 ? +str[2] + 2000 : +str[2] : year) - 543;

      //console.log("value -> " ,value);
      //console.log("day -> " , day);
      //console.log("month -> " , month);
      //console.log("year -> " , year);

      return new Date(year, month - 1, day);

    }
    return null;
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
    this.eventLog.remark = "ข้อมูลโครงการ";
    this.eventLog.eventDate = new Date();
    this.loginApi.saveLog(this.eventLog);
  }

  save(){
    this.projectForm.markAllAsTouched();
    if (this.projectForm.valid) {
      if (this.mode=='ADD' && this.checkCase() == true){
        this.projModel.createDate = new Date();
        this.apiCall.add(this.projModel);

        let event = JSON.parse(this.loginApi.getUserData());
        this.eventLog.personName = event.personName;
        this.eventLog.positionName = event.positionName;
        this.eventLog.officeName = event.officeName;
        this.eventLog.userLogin = event.userName;
        this.eventLog.eventType = "PROJECT";
        this.eventLog.eventSubType = "ADD";
        this.eventLog.eventDate = new Date();
        this.loginApi.saveLog(this.eventLog);
      }else if (this.mode=='EDIT' && this.checkCase() == true){
        this.projModel.updateBy = 'pip';
        this.projModel.updateDate = new Date();
        this.apiCall.edit(this.projModel);

        let event = JSON.parse(this.loginApi.getUserData());
        this.eventLog.personName = event.personName;
        this.eventLog.positionName = event.positionName;
        this.eventLog.officeName = event.officeName;
        this.eventLog.userLogin = event.userName;
        this.eventLog.dataId = this.projModel.projectId;
        this.eventLog.eventType = "PROJECT";
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
      case (this.projModel.projectCode.length>50):
        Swal.fire({
          title: 'รหัสโครงการไม่ถูกต้อง',
          text: 'รหัสโครงการต้องมีความยาวไม่เกิน 50 ตัว',
          icon: 'error',
          width: 650,
          confirmButtonText: 'ตกลง'
        });
        break;
      case (this.projModel.projectName.length>500):
        Swal.fire({
          title: 'ชื่อโครงการไม่ถูกต้อง',
          text: 'ชื่อโครงการต้องมีความยาวไม่เกิน 500 ตัว',
          icon: 'error',
          width: 650,
          confirmButtonText: 'ตกลง'
        });
        break;
      case (this.projModel.contractNo.length>20):
        Swal.fire({
          title: 'เลขที่สัญญาไม่ถูกต้อง',
          text: 'เลขที่สัญญาต้องมีความยาวไม่เกิน 20 ตัว',
          icon: 'error',
          width: 650,
          confirmButtonText: 'ตกลง'
        });
        break;
      case (this.projModel.remark.length>2500):
        Swal.fire({
          title: 'หมายเหตุไม่ถูกต้อง',
          text: 'หมายเหตุต้องมีความยาวไม่เกิน 2500 ตัว',
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
