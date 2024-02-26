import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent {
  @Input() orders:Order [] = []
  @Output() clickEvent = new EventEmitter();

  clickItem(order:Order){
    this.clickEvent.emit(order);
  }
}
