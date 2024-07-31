import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: any = [];
  emptyproducts: any = [];
  isLoading: boolean = true;

  constructor(private apiServ: ApiService) {}

  ngOnInit(): void {
    this.fetchdata();
  }

  fetchdata() {
    this.apiServ.getProducts();

    this.apiServ.currentProducts.subscribe(
      (data: any) => {
        this.isLoading = true;
        if (data && data.products) {
          console.log(data, 'data');
          this.products = data.products;
        } else {
          this.products = [];
        }
        this.isLoading = false;
      },
      (error) => {
        console.log('Error fetching the products', error);
        this.products = [];
        this.isLoading = false;
      }
    );
  }
}
