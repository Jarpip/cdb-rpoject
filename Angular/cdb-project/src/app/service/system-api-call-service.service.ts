import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})

export class SystemApiCallService {
    constructor(private httpClient: HttpClient){}
    httpOptions = {
        headers: new HttpHeaders( { 'Content-Type': "application/json;charset=utf-8" })
    };

    getSystemData(): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/findAllSys',{headers:this.httpOptions.headers });
    }

    getCodeSearchData(code:any): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/searchSystemByCode?system_code='+code,{headers:this.httpOptions.headers })
    }

    getDateSearchData(date:any): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/searchSystemByCreateDate?create_date='+date,{headers:this.httpOptions.headers })
    }

    getBothSearchData(date:any, code:any): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/searchSystemByBoth?create_date='+date+"&system_code="+code,{headers:this.httpOptions.headers })
    }

    getSystem(id:any): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/get/'+id,{headers:this.httpOptions.headers });
    }

    add(data:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/addSystem', data, {headers:this.httpOptions.headers}).subscribe({
            complete: ()=>{
                Swal.fire('บันทึกข้อมูลสำเร็จ!', '', 'success');
            },
            error: error => {
                Swal.fire('บันทึกข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error');
            }
        })
        
    }

    edit(data:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/updateSystem', data, {headers:this.httpOptions.headers }).subscribe({
            complete: ()=>{
                Swal.fire('แก้ไขข้อมูลสำเร็จ!', '', 'success')
            },
            error: error => {
                Swal.fire('แก้ไขข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error')
            }
        })
       
    }

    deleteSystem(id:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/deleteSystem?system_id='+id, null, {headers:this.httpOptions.headers }).subscribe({
            complete: ()=>{
                Swal.fire('ลบข้อมูลสำเร็จ!', '', 'success')
            },
            error: error => {
                Swal.fire('ลบข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error')
            }
        });
    }
}