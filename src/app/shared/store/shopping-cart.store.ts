import { computed } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "../models/products.interface";


export interface CartStore{
    products: Product[];
}

const initialState: CartStore = {
    products:[]
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
            const isProductInCart = products().find((item: Product) => item.id === product.id);
            if(isProductInCart){
                isProductInCart.qty++;
                isProductInCart.subTotal = isProductInCart.qty * isProductInCart.price;
                patchState(store, { products: [...products()] });
            }else{
                patchState(store, { products: [...products(), product] });
            }
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
    let value = products.reduce((acc, product) => acc + product.price * product.qty, 0);
    console.log("calculateTotalAmount",value)
    return value
}
function calculateProductCount(products: Product[]): number {
    const value = products.reduce((acc, product) => {
        return acc + product.qty;
    }, 0);
    console.log("calculateProductCount",value)
    return value;
}