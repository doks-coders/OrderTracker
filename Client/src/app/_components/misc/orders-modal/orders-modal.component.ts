import { Component, OnInit } from '@angular/core';
import { FormArrayName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/_models/order';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-orders-modal',
  templateUrl: './orders-modal.component.html',
  styleUrls: ['./orders-modal.component.css']
})
export class OrdersModalComponent implements OnInit{
  order?:Order;
  result:boolean=false;
  orderForm:FormGroup = new FormGroup({});

  vehicles = [{ value: "Bike", display: "Bike" },
  { value: "Car", display: "Car" },
  { value: "Trailer", display: "Trailer" }];

  drivers:any = [];

  constructor(public bsModalRef:BsModalRef, private adminService:AdminService, private formBuilder:FormBuilder, private toastr:ToastrService){}
  ngOnInit(): void {
    this.getDrivers();
    this.initialiseForm();
  }

  confirm(){
    this.result = true
    this.bsModalRef.hide();
  }

  decline(){
    this.result = false;
    this.bsModalRef.hide();
  }
  
  getDrivers(){
    this.adminService.getDrivers().subscribe({
      next:(users)=>{
        let driverSelectList:any =  users.map(val=>{
          return({
            display:val.name,
            value:val.id
          })
        })

        this.drivers = driverSelectList;
      }
    })
  }

  initialiseForm(){
    if(this.order){
      console.log(this.order);
      this.orderForm = this.formBuilder.group({
        transport:[this.order?.transport,Validators.required],
        driverUserId:[this.order?.driverUserId,Validators.required],
        id:[this.order.id,Validators.required],
      })
    }
    
  }

  submitForm(){
    let value  = this.orderForm.value;
    value.driverUserId = Number(value.driverUserId);
    this.order = {...this.order,...value,orderStatus:"Shipped"}
    
    this.adminService.processOrder(value).subscribe({
      next:(val)=>{
        console.log(val);
        this.toastr.success("Processed Order Successfully")
      }
    })
    
  }
}
