import {Component, OnInit} from '@angular/core';
import {OrderRepository} from '../../model/order.repository';
import {Order} from '../../model/order.model';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {

  includeShipped = false;

  constructor(private repository: OrderRepository) {
  }

  ngOnInit() {
  }

  getOrders(): Order[] {
    return this.repository.getOrders().filter(o => this.includeShipped || !o.shipped);
  }

  markShipped(order: Order) {
    order.shipped = true;
    this.repository.updateOrder(order);
  }

  delete(id: number) {
    this.repository.deleteOrder(id);
  }
}
