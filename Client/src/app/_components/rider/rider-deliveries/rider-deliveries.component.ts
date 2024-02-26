import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Order } from 'src/app/_models/order';
import { DriverService } from 'src/app/_services/driver.service';
import { DriversModalComponent } from '../../misc/drivers-modal/drivers-modal.component';

@Component({
  selector: 'app-rider-deliveries',
  templateUrl: './rider-deliveries.component.html',
  styleUrls: ['./rider-deliveries.component.css']
})
export class RiderDeliveriesComponent implements OnInit {
  bsModalRef:BsModalRef<DriversModalComponent> = new BsModalRef<DriversModalComponent>
  orders: Order [] = [];
  constructor(private driverService:DriverService,private modalService:BsModalService){}
  ngOnInit(): void {
    this.getDriversOrders();
  }
  showModal(order:Order){
    const config = {
      initialState:{
        order
      }
    }
    this.bsModalRef = this.modalService.show(DriversModalComponent,config);
    this.bsModalRef.onHide?.subscribe({
      next:()=>{
        let order = this.bsModalRef.content?.order
        console.log("On Hide Listener ")
        if(order){

          let index:number = this.orders.findIndex(e=>e.id==order?.id);
          this.orders[index] = order;
        }
        
      }})
  }
  getDriversOrders(){
    this.driverService.getDriverOrders().subscribe({
      next:(orders)=>{
        if(orders){
          this.orders = orders;
        }
      }
    })
  }
}
