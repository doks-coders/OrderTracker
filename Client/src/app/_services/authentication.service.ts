import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../_models/registerUser';
import { LoginUser } from '../_models/loginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userSource = new BehaviorSubject<User|null>(null);
  currentUser$ = this.userSource.asObservable();
  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }

  login(loginInfo:LoginUser){
    return this.http.post<User>(this.baseUrl+"account/login",loginInfo).pipe(map(user=>{
      if(user){
        this.setUser(user);
      }
      return user;
    }))
  }

  logout(){
    this.removeUser();
  }

  register(registerInfo:RegisterUser){
    return this.http.post<User>(this.baseUrl+"account/register",registerInfo).pipe(map(user=>{
      if(user){
        this.setUser(user);
      }
      return user;
    }))
  }

  updateUser(updateUserInfo:any){
    return this.http.put<User>(this.baseUrl+"account/update-user",updateUserInfo).pipe(map(user=>{
      if(user){
        this.setUser(user);
      }
      return user;
    }))
  }


  setUser(user:User){
    let userJson:string = JSON.stringify(user);
    localStorage.setItem("user",userJson)
    this.userSource.next(user);
  }

  removeUser(){
    localStorage.removeItem("user");
    this.userSource.next(null);
  }
}
