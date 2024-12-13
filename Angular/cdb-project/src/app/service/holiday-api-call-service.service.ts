import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
})

export class HolidayApiCallService {
    constructor(private httpClient: HttpClient){}
    httpOptions = {
        headers: new HttpHeaders( { 'Content-Type': "application/json;charset=utf-8" })
    };

    getHolidayData(): Observable<any>{
        return this.httpClient.get('http://localhost:8778/cdbctrl/findAllHoliday',{headers:this.httpOptions.headers })
    }

    getHolidaySearchData(start:any, end:any, name:any): Observable<any>{
        return this.httpClient.get('http://localhost:8778/cdbctrl/searchHoliday?start='+start+"&end="+end+"&holiday_name="+name,{headers:this.httpOptions.headers })
    }

    getHoliday(id:any): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/getHoliday/'+id,{headers:this.httpOptions.headers });
    }

    add(data:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/addHoliday', data, {headers:this.httpOptions.headers}).subscribe({
            complete: ()=>{
                Swal.fire('บันทึกข้อมูลสำเร็จ!', '', 'success');
            },
            error: error => {
                Swal.fire('บันทึกข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error');
            }
        })
        
    }

    edit(data:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/updateHoliday', data, {headers:this.httpOptions.headers }).subscribe({
            complete: ()=>{
                Swal.fire('แก้ไขข้อมูลสำเร็จ!', '', 'success')
            },
            error: error => {
                Swal.fire('แก้ไขข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error')
            }
        })
       
    }

    deleteHoliday(id:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/deleteHoliday?holiday_id='+id, null, {headers:this.httpOptions.headers }).subscribe({
            complete: ()=>{
                Swal.fire('ลบข้อมูลสำเร็จ!', '', 'success')
            },
            error: error => {
                Swal.fire('ลบข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error')
            }
        });
    }

}