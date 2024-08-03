import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss'
})
export class OrderSuccessComponent {
  orderId = '';

  constructor(private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.orderId = data['id']
    })
  }
}