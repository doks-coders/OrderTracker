import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/_models/order';
import { DriverService } from 'src/app/_services/driver.service';

@Component({
  selector: 'app-drivers-modal',
  templateUrl: './drivers-modal.component.html',
  styleUrls: ['./drivers-modal.component.css']
})
export class DriversModalComponent {
  order?:Order
  constructor(public bsModalRef:BsModalRef, private driverService:DriverService,private toastr:ToastrService){}

  setOrderToSuccessful(){
    if(this.order){
      this.order = {...this.order, orderStatus:"Successful"};
      console.log({order:this.order})
    }
    if(this.order){
      this.driverService.setOrderToSuccesful(this.order?.id).subscribe({
        next:(val:any)=>{
          
          this.toastr.success(val.message);
        }
      })
    }
  }

  confirm(){
    this.bsModalRef.hide();
  }

  decline(){
    this.bsModalRef.hide();
  }
  
}
