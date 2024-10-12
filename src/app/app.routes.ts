import {Route} from '@angular/router';
import {clientsRoutes} from "./clients/clients.routes";

export const appRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./core/layout/layout.component').then(
            m => m.LayoutComponent),
        children: [...clientsRoutes],
    },
    {
        path: '**',
        loadComponent: () => import('./shared/pages/not-found/not-found.component').then(
            m => m.NotFoundComponent)
    }
];

