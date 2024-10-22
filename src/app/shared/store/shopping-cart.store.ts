import { computed } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "../models/products.interface";


export interface CartStore{
    products: Product[];
    totalAmount: number;
    productsCount: number;
}

const initialState: CartStore = {
    products:[],
    totalAmount: 0,
    productsCount: 0,
};

export const CartStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ products }) => ({ 
        productsCount: computed(() => calculateProductCount(products())),
        totalAmount: computed(() => calculateTotalAmount(products())),
    })),
    withMethods(({products, ...store}) => ({
        addToCart(product: Product) {
            patchState(store, { products: [...products(), product] });
        },
        removeFromCart(id: number){
            const updateProducts = products().filter(product => product.id != id);
            patchState(store, { products: updateProducts });
         },
        clearCart(){
            patchState(store, initialState) //better managment of store
        },
    })),
)
function calculateTotalAmount(products: Product[]) : number {
    let value = products.reduce((acc, product) => acc + product.price, 0);
    return value
}
function calculateProductCount(products: Product[]): number {
    const value = products.reduce((acc, product) => {
        return acc + product.qty;
    }, 0);

    return value;
}