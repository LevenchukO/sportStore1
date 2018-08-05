import {Component, OnInit} from '@angular/core';
import {ProductRepository} from '../../model/product.repository';
import {Product} from '../../model/product.model';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {

  constructor(private repository: ProductRepository) {
  }

  ngOnInit() {
  }

  getProducts(): Product[] {
    return this.repository.getProducts();
  }

  deleteProduct(id: number) {
    this.repository.deleteProduct(id);
  }

}
