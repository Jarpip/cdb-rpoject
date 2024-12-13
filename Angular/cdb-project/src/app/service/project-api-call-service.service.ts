import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})

export class ProjectApiCallService {
    constructor(private httpClient: HttpClient){}
    httpOptions = {
        headers: new HttpHeaders( { 'Content-Type': "application/json;charset=utf-8" })
    };

    getProjectData(): Observable<any>{
        return this.httpClient.get('http://localhost:8778/cdbctrl/findAllProj',{headers:this.httpOptions.headers });
    }

    getCodeSearchData(code:any): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/searchProjectByCode?project_code='+code,{headers:this.httpOptions.headers })
    }

    getDateSearchData(date:any): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/searchProjectByCreateDate?create_date='+date,{headers:this.httpOptions.headers })
    }

    getBothSearchData(date:any, code:any): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/searchProjectByBoth?create_date='+date+"&project_code="+code,{headers:this.httpOptions.headers })
    }

    // getProjectSearchData(date:any, code:any): Observable<any>{
    //     return this.httpClient.get('http://localhost:8778/cdbctrl/searchProject?create_date='+date+'&project_code='+code,{headers:this.httpOptions.headers })
    // }

    getProject(id:any): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/getProject/'+id,{headers:this.httpOptions.headers });
    }

    add(data:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/addProject', data, {headers:this.httpOptions.headers}).subscribe({
            complete: ()=>{
                Swal.fire('บันทึกข้อมูลสำเร็จ!', '', 'success');
            },
            error: error => {
                Swal.fire('บันทึกข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error');
            }
        })
        
    }

    edit(data:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/updateProject', data, {headers:this.httpOptions.headers }).subscribe({
            complete: ()=>{
                Swal.fire('แก้ไขข้อมูลสำเร็จ!', '', 'success')
            },
            error: error => {
                Swal.fire('แก้ไขข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error')
            }
        })
       
    }

    deleteProject(id:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/deleteProject?project_id='+id, null, {headers:this.httpOptions.headers }).subscribe({
            complete: ()=>{
                Swal.fire('ลบข้อมูลสำเร็จ!', '', 'success')
            },
            error: error => {
                Swal.fire('ลบข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error')
            }
        });
    }

}