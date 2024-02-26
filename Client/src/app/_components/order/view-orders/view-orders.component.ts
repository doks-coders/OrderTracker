import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  constructor(private orderService: OrderService) { }
  orders:Order [] = [];
  processingOrders:Order [] = []
  successOrders: Order [] = []
  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.orderService.getOrders().subscribe({
      next: (orders) => {
        if(orders){
          this.orders = orders;
          this.successOrders = this.orders.filter(val=>val.orderStatus=="Successful");
          this.processingOrders = this.orders.filter(val=>val.orderStatus=="Processing");
        }
      }
    });
  }

}
