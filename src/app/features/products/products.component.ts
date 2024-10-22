import { Component, inject, output } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductsService } from 'src/app/api/products.service';
import { Product } from 'src/app/shared/models/products.interface';
import { CartStore } from 'src/app/shared/store/shopping-cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export default class ProductsComponent {
  private readonly productService = inject(ProductsService);
  products = this.productService.products;
  cartStore = inject(CartStore);

  onAddToCart(product: Product): void {
    this.cartStore.addToCart(product);
  }
}
