import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from './product.model';
import {map} from 'rxjs/operators';

import {Order} from './order.model';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.post(`${this.baseUrl}login`, {name: user, password: pass})
      .pipe(map(response => {
        const r = response as { success, token };
        this.auth_token = r.success ? r.token : null;
        return r.success;
      }));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get(`${this.baseUrl}products`).pipe(map(p => p as Product[]));
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post(`${this.baseUrl}products`, product, {
      params: new HttpParams().append('Authorization', `Bearer<${this.auth_token}>`)
    }).pipe(map(p => p as Product));
  }

  updateProduct(product): Observable<Product> {
    return this.http.put(`${this.baseUrl}products/${product.id}`, product, {
      params: new HttpParams().append('Authorization', `Bearer<${this.auth_token}>`)
    }).pipe(map(p => p as Product));
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete(`${this.baseUrl}products/${id}`, {
      params: new HttpParams().append('Authorization', `Bearer<${this.auth_token}>`)
    }).pipe(map(p => p as Product));
  }

  getOrders(): Observable<Order[]> {
    return this.http.get(`${this.baseUrl}orders`, {
      params: new HttpParams().append('Authorization', `Bearer<${this.auth_token}>`)
    }).pipe(map(p => p as Order[]));
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete(`${this.baseUrl}orders/${id}`, {
      params: new HttpParams().append('Authorization', `Bearer<${this.auth_token}>`)
    }).pipe(map(p => p as Order));
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put(`${this.baseUrl}orders/${order.id}`, {
      params: new HttpParams().append('Authorization', `Bearer<${this.auth_token}>`)
    }).pipe(map(p => p as Order));
  }

  saveOrder(order: Order) {
    return this.http.post(`${this.baseUrl}orders`, order).pipe(map(p => p as Order));
  }



}
