import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) {}

  getInfo(){
    return this.http.get(this.baseUrl+"order/information")
  }

  createOrder(order:Order){
    return this.http.post(this.baseUrl+"order/create-order",order)
  }

  getOrders(){
    return this.http.get<Order []>(this.baseUrl+"order/get-orders").pipe(map(orders=>{
      orders = orders.map((val,index)=>{
        return {...val,s_n:index+1}
      });
      console.log({orders})
      return orders;
    }))
  }

}