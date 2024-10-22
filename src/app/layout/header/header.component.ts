import { NgClass } from '@angular/common';
import { Component ,inject,signal} from '@angular/core';
import { CartStore } from 'src/app/shared/store/shopping-cart.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
showCart = signal<boolean>(false);
cartStore = inject(CartStore);
}
