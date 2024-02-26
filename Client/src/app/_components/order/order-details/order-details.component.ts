import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: FormGroup = new FormGroup({})
  

  sizes = [{ value: "10g - 100g", display: "10g - 100g" },
  { value: "100g - 1kg", display: "100g - 1kg" },
  { value: "1kg - 100kg", display: "1kg - 100kg" }]

  vehicles = [{ value: "Bike", display: "Bike" },
  { value: "Car", display: "Car" },
  { value: "Trailer", display: "Trailer" }]

  

  constructor(private formbuilder: FormBuilder,private router:Router,private orderService:OrderService,private authenicationService:AuthenticationService) { }
  ngOnInit(): void {
    this.intialiseForm();
  }
  intialiseForm() {
    this.authenicationService.currentUser$.pipe(take(1)).subscribe({
      next:(user)=>{
        this.orderDetails = this.formbuilder.group({
          name: [user?.name,Validators.required],
          country: ["Nigeria",Validators.required],
          address: [user?.address,Validators.required],
          phone_number: [user?.phone_number,Validators.required],
    
          product_name:["",Validators.required],
          transport: ["Bike"],
          description:["",Validators.required],
          size: ["10g - 100g",Validators.required],
    
    
          reciever_email:["",Validators.required],
          reciever_name:["",Validators.required],
          reciever_phone_number:["",Validators.required],
          reciever_location:["",Validators.required]
    
        });
      }
    })
    
  }


  createOrder(){
    this.orderService.createOrder(this.orderDetails.value).subscribe({
      next:(_)=>{
        this.router.navigateByUrl("/view-orders");
      }
    })
  }


}
