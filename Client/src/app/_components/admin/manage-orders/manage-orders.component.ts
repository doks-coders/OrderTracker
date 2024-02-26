import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { OrdersModalComponent } from '../../misc/orders-modal/orders-modal.component';
import { AdminService } from 'src/app/_services/admin.service';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  bsModalRef:BsModalRef<OrdersModalComponent> = new BsModalRef<OrdersModalComponent>
  orders:Order []=[];
  successOrders:Order []=[];
  shippingOrders:Order []=[];
  processingOrders:Order []=[];
  constructor(private modalService:BsModalService,private adminService:AdminService){}
  ngOnInit(): void {
    this.getOrders();
  }

  showModal(orderEvent:Order){
    const config = {
      initialState:{
        order:orderEvent
      }
    }
   this.bsModalRef = this.modalService.show(OrdersModalComponent,config);

   this.bsModalRef.onHide?.subscribe({
    next:()=>{
      let order = this.bsModalRef.content?.order
      if(order){
        let index:number = this.orders.findIndex(e=>e.id==order?.id);
        this.orders[index] = order;
        this.sortOrders(this.orders);
      }
      
    }
   })
  }

  private sortOrders(orders:Order []){
    this.orders = orders;
    this.successOrders = this.orders.filter(val=>val.orderStatus=="Successful");
    this.shippingOrders = this.orders.filter(val=>val.orderStatus=="Shipped");
    this.processingOrders = this.orders.filter(val=>val.orderStatus=="Processing");
  }
  getOrders(){
    this.adminService.getOrders().subscribe({
      next:(orders)=>{
        this.sortOrders(orders);
      }
    })
  }
}
