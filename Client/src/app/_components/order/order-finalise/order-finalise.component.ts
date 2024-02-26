import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-finalise',
  templateUrl: './order-finalise.component.html',
  styleUrls: ['./order-finalise.component.css']
})
export class OrderFinaliseComponent implements OnInit {
  recieverInformation:FormGroup = new FormGroup({})
  ngOnInit(): void {
    this.intialiseInput();
  }
  constructor(private formBuilder:FormBuilder){}

  intialiseInput(){
   this.recieverInformation = this.formBuilder.group({
    email:[""],
    name:[""],
    phone_number:[""],
    location:[""]
   })
  }

  submitOrder(){
    console.log(this.recieverInformation.value)
  }

}
