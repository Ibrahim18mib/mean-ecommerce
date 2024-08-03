import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {
    console.log('apiservice');
  }

  productsSource = new BehaviorSubject([]);
  currentProducts = this.productsSource.asObservable();
  productsTmp = [];

  getProducts() {
    this.http
      .get(environment.apiUrl + '/api/mib/products')
      .subscribe((data: any) => {
        this.productsSource.next(data);
        this.productsTmp = data;
      });
  }

  searchProducts(searchText: string) {
    this.http
      .get(environment.apiUrl + '/api/mib/products', {
        params: { keyword: searchText },
      })
      .subscribe((data: any) => {
        this.productsSource.next(data);
      });
  }

  clearSearch(searchText: string) {
    if (searchText == '') {
      this.productsSource.next(this.productsTmp);
    }
  }

  getSingleProduct(id: string) {
    return this.http.get(environment.apiUrl + '/api/mib/product/' + id);
  }

  orderCreate(order: any) {
    return this.http.post(environment.apiUrl + '/api/mib/order', order);
  }
}
