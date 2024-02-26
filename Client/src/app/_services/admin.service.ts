import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';
import { map } from 'rxjs';
import { UserList } from '../_models/userList';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getOrders(){
    return this.http.get<Order []>(this.baseUrl+"admin/get-orders").pipe(map(orders=>{
      orders = orders.map((val,index)=>{
        return {...val,s_n:index+1}
      });
      return orders;
    }))
  }

  getDrivers(){
    return this.http.get<UserList []>(this.baseUrl+"admin/get-drivers")
  }

  processOrder(processOrderInfo:any){
    return this.http.post(this.baseUrl+"admin/set-processing",processOrderInfo)
  }
  


}
