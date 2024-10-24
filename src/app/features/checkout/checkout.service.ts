
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class CheckoutService {
    
    constructor() { }

    onProceedToPay(): any{
        console.log("servicio pagar")
    }
}
