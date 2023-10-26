import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users=[
    {username:'ismail', password:'1234', role:'ADMIN'}
  ];
  public isAuthenticated!:boolean;
  public userAuthenticated:any;

  constructor(private http : HttpClient) { }

  public login(username:string, password:string){
    let user = undefined;
    this.users.forEach(u=>{
      if (u.username==username && u.password==password){
        user = u;
      }
    });
    if (user){
      this.isAuthenticated=true;
      this.userAuthenticated=user;
    }else {
      this.isAuthenticated=false;
      this.userAuthenticated=undefined;
    }
  }

}
