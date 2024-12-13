import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import Swal from "sweetalert2";


@Injectable({
    providedIn: 'root'
})

export class PositionApiCallService {
    constructor(private httpClient: HttpClient){}
    httpOptions = {
        headers: new HttpHeaders( { 'Content-Type': "application/json;charset=utf-8" })
    };

    getPositionData(): Observable<any>{
        return this.httpClient.get('http://localhost:8778/cdbctrl/findAllPosition',{headers:this.httpOptions.headers })
    }

    getPositionSearchData(name:any, type:any): Observable<any>{
        return this.httpClient.get('http://localhost:8778/cdbctrl/searchPosition?position_name='+name+"&office_type="+type,{headers:this.httpOptions.headers })
    }

    getPosition(id:any): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/getPosition/'+id,{headers:this.httpOptions.headers });
    }

    add(data:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/addPosition', data, {headers:this.httpOptions.headers}).subscribe({
            complete: ()=>{
                Swal.fire('บันทึกข้อมูลสำเร็จ!', '', 'success');
            },
            error: error => {
                Swal.fire('บันทึกข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error');
            }
        })
        
    }

    edit(data:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/updatePosition', data, {headers:this.httpOptions.headers }).subscribe({
            complete: ()=>{
                Swal.fire('แก้ไขข้อมูลสำเร็จ!', '', 'success')
            },
            error: error => {
                Swal.fire('แก้ไขข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error')
            }
        })
       
    }

    deletePosition(id:any){
        this.httpClient.post('http://localhost:8778/cdbctrl/deletePosition?position_id='+id, null, {headers:this.httpOptions.headers }).subscribe({
            complete: ()=>{
                Swal.fire('ลบข้อมูลสำเร็จ!', '', 'success')
            },
            error: error => {
                Swal.fire('ลบข้อมูลไม่สำเร็จ!', 'กรุณาลองใหม่ภายหลัง', 'error')
            }
        })
    }
}