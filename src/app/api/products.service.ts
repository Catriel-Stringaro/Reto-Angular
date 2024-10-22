import { HttpClient } from '@angular/common/http';
import {
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
  signal,
} from '@angular/core';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Product } from '../shared/models/products.interface';
import { toSignal } from '@angular/core/rxjs-interop';
@Injectable({ providedIn: 'root' })
export class ProductsService {
  public products = signal<Product[]>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);
  constructor() {
    this.getProducts();
  }

  public getProducts(): void {
    this._http
      .get<Product[]>(`${this._endPoint}/products/?sort=desc`)
      .pipe(
        map((products: Product[]) =>
          products.map((product: Product) => ({ ...product, qty: 1 }))
        ),
        tap((products: Product[]) => this.products.set(products))
      )
      .subscribe();
  }

  public getProductById(id: number) {
    //return this._http.get<Product>(`${this._endPoint}/products/${id}`)

    // the context execution is needed and inside the method we don't have the context so we need to inject
    return runInInjectionContext(this._injector, () =>
      toSignal<Product>(
        this._http.get<Product>(`${this._endPoint}/products/${id}`).pipe(
          map((product: Product) => ({
            ...product,
            qty: 1, 
            subTotal: product.price * (product.qty ?? 0), // Update subTotal if needed
          }))
        )
      )
    );
  }
}
