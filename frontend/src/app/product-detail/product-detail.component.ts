import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product:any = null
  qty:number = 1;


  constructor(
    private route:ActivatedRoute, 
    private apiService:ApiService,
    private cartService: CartService,
     private toastr: ToastrService
  
  )  {

  }
  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const id:string = data['id'];
      this.apiService.getSingleProduct(id).subscribe((data:any) => {
        this.product = data.product;
      })
    })
  }

  decreaseQty() {
    if(this.qty == 1) 
      return; 
    this.qty = this.qty - 1;
  }
  increaseQty() {
    if (this.qty == this.product.stock) {
        return;
    }
    this.qty = this.qty + 1;
  }

  addToCart() {
    const newCartItem = {
      product: this.product,
      qty: this.qty
    }

    if(this.product.stock == 0) {
      this.toastr.error('Cannot add item due to Out of Stock', 'MiniEcommerce');

      return ;
    }

    // Add cart item
    this.cartService.addItem(newCartItem)
    this.toastr.success('Cart Item Added', 'MiniEcommerce');
  }

}