import { CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import { Component ,inject,signal} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from 'src/app/shared/store/shopping-cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass,SlicePipe,CurrencyPipe,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
showCart = signal<boolean>(false);
cartStore = inject(CartStore);
}
