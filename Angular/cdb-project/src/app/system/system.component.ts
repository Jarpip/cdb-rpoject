import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventLog } from '../model/event-log-model';
import { ProjModel } from '../model/project-model';
import { SysModel } from '../model/system-model';
import { SysProjModel } from '../model/system-project-model';
import { LoginApiCallService } from '../service/login-api-call-service.service';
import { ProjectApiCallService } from '../service/project-api-call-service.service';
import { SystemApiCallService } from '../service/system-api-call-service.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  sysModel: SysModel = new SysModel();
  newSystem: SysModel = new SysModel();
  systemId!: number | null;

  systemForm!: FormGroup;

  mode: string = 'ADD';
  
  isNewProject: boolean = false;
  listProject!: Array<ProjModel>;
  projModel: ProjModel = new ProjModel();

  displayedColumns: string[] = ['row','systemProjectId','projectName', 'edit'];
  sysProjDataSource! : MatTableDataSource<SysProjModel>;

  editSystemProjectIndex!: number;
  editProject: SysProjModel = new SysProjModel();
  newProject: SysProjModel = new SysProjModel();

  projectId: string = '...';

  editData:any;

  eventLog: EventLog = new EventLog();

  constructor(private fb: FormBuilder, private router: Router, private apiCall: SystemApiCallService, private projApi: ProjectApiCallService, private loginApi: LoginApiCallService) { }

  ngOnInit(): void {
    this.reactiveForm();
    this.loadProject();
    this.editData = sessionStorage.getItem('editData');
    this.editData = JSON.parse(this.editData);

    if (this.editData!=null && this.editData!=undefined){
      this.systemId = this.editData.systemId;
    }else{
      this.systemId = null;
    }
    
    if (this.systemId==null){
      this.mode='ADD'
      this.router.navigate([]);
    }
    else if (this.systemId!=null){
      this.loadData();
      this.mode='EDIT'
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
    this.eventLog.remark = "ข้อมูลระบบ";
    this.eventLog.eventDate = new Date();
    this.loginApi.saveLog(this.eventLog);
  }

  loadProject(){
    this.projApi.getProjectData().subscribe(data=>{
      this.listProject = data;
    })
  }

  getProjectName(projectId:any){
    const result = this.listProject.find(project=>{
      return project.projectId === projectId;
    })
    return result?.projectName;
  }

  getProjectId(projectName:any){
    const result = this.listProject.find(project=>{
      return project.projectName === projectName;
    })
    return result?.projectId;
  }

  loadData(){
    this.apiCall.getSystem(this.systemId).subscribe(data=>{
      this.sysModel = data;
      this.sysProjDataSource = new MatTableDataSource(this.sysModel.systemProject);
      this.sysProjDataSource.paginator = this.paginator;
    })
  }

  reactiveForm() {
    this.systemForm = this.fb.group({
      systemName: ['', Validators.required],
      systemCode: ['', Validators.required],
      remark: ['', Validators.required]
    });
  }

  save(){
    this.systemForm.markAllAsTouched();
    if (this.systemForm.valid) {
      if (this.mode=='ADD' && this.checkCase()==true){
        this.sysModel.createDate = new Date();
        this.apiCall.add(this.sysModel)

        let event = JSON.parse(this.loginApi.getUserData());
        this.eventLog.personName = event.personName;
        this.eventLog.positionName = event.positionName;
        this.eventLog.officeName = event.officeName;
        this.eventLog.userLogin = event.userName;
        this.eventLog.dataId = this.sysModel.systemId;
        this.eventLog.eventType = "SYSTEM";
        this.eventLog.eventSubType = "ADD";
        this.eventLog.eventDate = new Date();
        this.loginApi.saveLog(this.eventLog);

      }else if (this.mode=='EDIT' && this.checkCase()==true){
        this.sysModel.updateBy = 'pip';
        this.sysModel.updateDate = new Date();
        this.apiCall.edit(this.sysModel)

        let event = JSON.parse(this.loginApi.getUserData());
        this.eventLog.personName = event.personName;
        this.eventLog.positionName = event.positionName;
        this.eventLog.officeName = event.officeName;
        this.eventLog.userLogin = event.userName;
        this.eventLog.dataId = this.sysModel.systemId;
        this.eventLog.eventType = "SYSTEM";
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
      })
    }
    
  }

  deleteSystemProject(index:any){
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
        this.eventLog.dataId = this.sysModel.systemProject[index].projectId;
        this.eventLog.eventType = "SYSTEM PROJECT";
        this.eventLog.eventSubType = "DELETE";
        this.eventLog.eventDate = new Date();
        this.loginApi.saveLog(this.eventLog);

        this.sysModel.systemProject.splice(index,1)
        this.sysProjDataSource = new MatTableDataSource(this.sysModel.systemProject);
        this.mode = 'EDIT';
        Swal.fire('ลบข้อมูลเรียบร้อยแล้ว!', '', 'success')
        
      }
    });
  }

  newProjectOnclick(){
    this.isNewProject = true;
    this.projModel = new ProjModel();
  }

  newProjectData(){
    this.newProject.createDate = new Date();
    this.newProject.projectId = this.projModel.projectId
    this.sysModel.systemProject.push(this.newProject);
    this.sysProjDataSource = new MatTableDataSource(this.sysModel.systemProject);
    this.editSystemProjectIndex = -1;
    this.isNewProject = false;
    this.newProject = new SysProjModel();

    let event = JSON.parse(this.loginApi.getUserData());
    this.eventLog.personName = event.personName;
    this.eventLog.positionName = event.positionName;
    this.eventLog.officeName = event.officeName;
    this.eventLog.userLogin = event.userName;
    this.eventLog.dataId = this.projModel.projectId;
    this.eventLog.eventType = "SYSTEM PROJECT";
    this.eventLog.eventSubType = "ADD";
    this.eventLog.eventDate = new Date();
    this.loginApi.saveLog(this.eventLog);
  }

  editProjectData(index:any){
    this.editProject.projectId = this.projModel.projectId;
    this.editProject.updateDate = new Date();
    this.editProject.updateBy = 'pip';
    this.sysModel.systemProject[index] = this.editProject;
    this.sysProjDataSource = new MatTableDataSource(this.sysModel.systemProject);
    
    let event = JSON.parse(this.loginApi.getUserData());
    this.eventLog.personName = event.personName;
    this.eventLog.positionName = event.positionName;
    this.eventLog.officeName = event.officeName;
    this.eventLog.userLogin = event.userName;
    this.eventLog.dataId = this.projModel.projectId;
    this.eventLog.eventType = "SYSTEM PROJECT";
    this.eventLog.eventSubType = "EDIT";
    this.eventLog.eventDate = new Date();
    this.loginApi.saveLog(this.eventLog);

    this.editSystemProjectIndex = -1;
  }

  editProjectOnclick(index:any, data:SysProjModel){
    this.editSystemProjectIndex = index;
    this.editProject = this.sysModel.systemProject[index];
    for (let i=0; i < this.listProject.length;i++){
      if (this.listProject[i].projectId==data.projectId){
        this.projModel = this.listProject[i]
      }
    }
  }

  cancelIsNewProjectOnclick(){
    this.isNewProject = false;
    this.editSystemProjectIndex = -1;
    this.projModel = new ProjModel();
  }

  checkCase(){
    let check = false;
    switch(true){
      case (this.sysModel.systemCode.length>50):
        Swal.fire({
          title: 'รหัสระบบไม่ถูกต้อง',
          text: 'รหัสระบบต้องมีความยาวไม่เกิน 50 ตัว',
          icon: 'error',
          width: 650,
          confirmButtonText: 'ตกลง'
        });
        break;
      case (this.sysModel.systemName.length>250):
        Swal.fire({
          title: 'ชื่อระบบไม่ถูกต้อง',
          text: 'ชื่อระบบต้องมีความยาวไม่เกิน 250 ตัว',
          icon: 'error',
          width: 650,
          confirmButtonText: 'ตกลง'
        });
        break;
      case (this.sysModel.remark.length>2500):
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
