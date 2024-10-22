import { CommonModule, CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from 'src/app/shared/models/products.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe,SlicePipe,RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  product = input.required<Product>();
  //@Input() product!: Product; 
  @Output() addToCartEvent = new EventEmitter<Product>();

  onAddToCart():void {
    console.log("add to cart:", this.product())
    this.addToCartEvent.emit(this.product());
  }
}
