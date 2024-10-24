import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartStore } from 'src/app/shared/store/shopping-cart.store';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export default class CheckoutComponent {
  cartStore = inject(CartStore);
  private readonly checkoutSvc = inject(CheckoutService);

  constructor(){
  }
  removeItem(id: number): void{
    this.cartStore.removeFromCart(id);
  }
  clearAll(): void{
    this.cartStore.clearCart();
  }
  onProceedToPay(): void{
    this.checkoutSvc.onProceedToPay();
  }
}
