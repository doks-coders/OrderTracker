import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUser:FormGroup = new FormGroup({})
  editPassword:FormGroup = new FormGroup({})

  constructor(private formbuilder:FormBuilder,private authenticationService:AuthenticationService,private toastr:ToastrService){}
  ngOnInit(): void {
    this.initialiseForm();
  }

  initialiseForm(){
    this.authenticationService.currentUser$.pipe(take(1)).subscribe({
      next:(user)=>{
        this.editUser = this.formbuilder.group({
          name:[user?.name],
          country:[""],
          address:[user?.address],
          phone_number:[user?.phone_number]
        })
      }
    })
    
    this.editPassword = this.formbuilder.group({
      password:[""],
      password_verify:[""]
    })
  }

  modifyUser(){
    this.authenticationService.updateUser(this.editUser.value).subscribe({
      next:(user)=>{
        this.editUser = this.formbuilder.group({
          name:[user.name],
          country:[""],
          address:[user.address],
          phone_number:[user.phone_number]
        })
        this.toastr.success("User Updated Successfully");
      }
    })

  }
  modifyPassword(){
    console.log(this.editPassword.value)
  }

}
