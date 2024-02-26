import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../_models/order';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  baseUrl=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getDriverOrders(){
    return this.http.get<Order []>(this.baseUrl+"driver/get-driver-orders").pipe(map(orders=>{
      orders = orders.map((val,index)=>{
        return {...val,s_n:index+1}
    })
    return orders;
    }))
  }
  setOrderToSuccesful(id:number){
    return this.http.post(this.baseUrl+`driver/order-successful/`+id,{})
  }
}
