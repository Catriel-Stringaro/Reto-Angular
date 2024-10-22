import { Routes } from '@angular/router';

// loadComponent throws error if the component it's not default
const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./products.component'),
    },
    {
        path:':id',
        loadComponent: () => import('./details/details.component'),
    }
];

export default routes;
