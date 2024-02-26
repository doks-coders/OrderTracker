import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  constructor(private authenticationService:AuthenticationService){}

  ngOnInit(): void {
    this.setCurrentUser(); 
  }
  setCurrentUser(){
    const userString:(string|null) = localStorage.getItem("user");
    if(userString == null) return;
    const userObject:User = JSON.parse(userString);
    this.authenticationService.setUser(userObject);
   }
}
