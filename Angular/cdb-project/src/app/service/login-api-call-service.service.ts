import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import * as CryptoJS from 'crypto-js';
import { UserModel } from "../model/ีuser-model";
import { EventLog } from "../model/event-log-model";

@Injectable({
    providedIn: 'root'
})

export class LoginApiCallService {

    private key = "u7x!A%C*F-JaNdRgUkXp2s5v8y/B?E(G+KbPeShVmYq3t6w9z$C&F)J@McQfTjWn";

    httpOptions = {
        headers: new HttpHeaders( { 'Content-Type': "application/json;charset=utf-8" })
    };


    constructor(private httpClient: HttpClient){}

    login(user:UserModel): Observable<any>{
        return this.httpClient.post<UserModel>('http://localhost:8778/cdbctrl/login', user, { headers: this.httpOptions.headers});
    }

    updateUserData(user: UserModel){
        localStorage.setItem("personName", this.encrypt(user.personName));
        localStorage.setItem("userRole", this.encrypt(user.userRole));
        localStorage.setItem("userData", this.encrypt(JSON.stringify(user)));
    }

    getUserData(){
        let data = localStorage.getItem('userData') || "";
        return this.decrypt(data);
    }

    saveLog(event: EventLog){
        this.httpClient.post<EventLog>('http://localhost:8778/cdbctrl/addEventLog', event, { headers: this.httpOptions.headers}).subscribe({
            complete: ()=>{
            },
            error: error => {
            }
        });
    }

    logout(){
        localStorage.clear();
    }

    getUserName(){
        let data = localStorage.getItem("personName") || "";
        return this.decrypt(data);
    }

    getUserRole(){
        let data = localStorage.getItem("userRole") || "";
        return this.decrypt(data);
    }

    getMenu(role:any): Observable<any>{
        return this.httpClient.get<any>('http://localhost:8778/cdbctrl/getMenu/'+role, { headers: this.httpOptions.headers});
    }

    private encrypt(txt: string): string {
        return CryptoJS.AES.encrypt(txt, this.key).toString();
    }
    
    private decrypt(txtToDecrypt: string) {
        return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
    }
}