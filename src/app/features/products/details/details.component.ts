import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, Input, OnInit, Signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductsService } from 'src/app/api/products.service';
import { Product } from 'src/app/shared/models/products.interface';
import { CartStore } from 'src/app/shared/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export default class DetailsComponent implements OnInit {
  //@Input({ alias: 'id'}) productId! : number;
  productId = input<number>(0, { alias: 'id' });
  starsArray: number[] = new Array(5).fill(0);
  product!: Signal<Product | undefined>;
  cartStore = inject(CartStore);
  private readonly productSvc = inject(ProductsService);
  private readonly sanitizer = inject(DomSanitizer);
  ngOnInit(): void {
    this.product = this.productSvc.getProductById(this.productId());
  }

  addToCart() {
    const product = this.product();
      this.cartStore.addToCart(product as Product);
  }

  generateSVG(index: number){
    const rate = this.product()?.rating.rate as number;
    let svgContent = null;

    if (index + 1 <= Math.floor(rate)) {
      svgContent = `<svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>`;
    } else if (index < rate) {
      svgContent = `
      <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="half-fill" x1="0" y1="0" x2="100%" y2="0">
              <stop offset="50%" stop-color="currentColor"></stop>
              <stop offset="50%" stop-color="transparent"></stop>
            </linearGradient>
          </defs>
          <path fill="url(#half-fill)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>`;
    } else {
      svgContent = `<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>`;
    }

    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }
}
