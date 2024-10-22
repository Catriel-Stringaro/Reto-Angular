import { Routes } from '@angular/router';

// loadComponent throws error if the component it's not default
export const routes: Routes = [
    {
        path:'products',
        loadChildren: () => import('./features/products/Products.routes'),
    },
    {
        path:'checkout',
        loadComponent: () => import('./features/checkout/checkout.component'),
    },    
    {
        path:'', 
        redirectTo: 'products',
        pathMatch: 'full'
    },    
    {
        path:'**', 
        redirectTo: 'products',
        pathMatch: 'full'
    },
];
