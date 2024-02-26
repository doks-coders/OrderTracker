import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/_models/registerUser';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm:FormGroup=new FormGroup({});
  constructor(private formBuilder:FormBuilder,private authenticationSerice:AuthenticationService,private router:Router){}
  ngOnInit(): void {
    this.intialiseForm();
  }
  intialiseForm(){
    this.signupForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      verify_password:["",this.matchValues("password")]
    })

    this.signupForm.controls["password"].valueChanges.subscribe({ //checks if password changes
      next:()=>  {
       return this.signupForm.controls["verify_password"].updateValueAndValidity()
      }
    })
  }

  matchValues(matchTo:string){
    return (control:AbstractControl)=>{
      return (control.value===control.parent?.get(matchTo)?.value ? null:{notMatching:true})
    }
  }

  signUp(){
    if(!this.signupForm.valid) return;
    let registerInfo:RegisterUser=this.signupForm.value;
    this.authenticationSerice.register(registerInfo).subscribe({
      next:()=>{
        this.signupForm.reset();
        this.router.navigateByUrl("/edit-user");
      }
    })

  }
  
  
}
