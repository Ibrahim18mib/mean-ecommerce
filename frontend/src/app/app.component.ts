import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  searchText:string = '';
  title = 'frontend';
  cartCount = 0;

  constructor(private apiService:ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.currentItems.subscribe((data:any) => {
      this.cartCount = data.length;
    })
  }


  search() {
    this.apiService.searchProducts(this.searchText);
  }

  clearSearch() {
    this.apiService.clearSearch(this.searchText)
  }

  searchByEnterKey() {
    this.search()
  }
}
