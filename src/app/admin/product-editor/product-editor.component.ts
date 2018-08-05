import {Component, OnInit} from '@angular/core';
import {ProductRepository} from '../../model/product.repository';
import {Product} from '../../model/product.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {

  editing = false;
  product: Product = new Product();

  constructor(private repository: ProductRepository,
              private router: Router,
              activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params['mode'] === 'edit';
    if (this.editing) {
      Object.assign(this.product, this.repository.getProduct(activeRoute.snapshot.params['id']));
    }
  }

  ngOnInit() {
  }

  save(form: NgForm) {
    this.repository.saveProduct(this.product);
    this.router.navigateByUrl('/admin/main/products');
  }

}
