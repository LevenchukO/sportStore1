
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product.model';
import { map } from 'rxjs/operators';

import {Order} from './order.model';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getProducts(): Observable<Product[]> {
    return this.http.get(`${this.baseUrl}products`).pipe(map(p => p as Product[]));
  }

  saveOrder(order: Order) {
    return this.http.post(`${this.baseUrl}products`, order);
  }

}
