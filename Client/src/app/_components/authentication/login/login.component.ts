import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/_models/loginUser';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({});

  constructor(private formBuilder:FormBuilder,private authenticationService:AuthenticationService,private router:Router){}
  ngOnInit(): void {
    this.intialiseForm();
  }
  intialiseForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    let loginInfo:LoginUser = this.loginForm.value;
    this.authenticationService.login(loginInfo).subscribe({
      next:(user)=>{
        this.router.navigateByUrl("/")
      }
    });
  }
}
