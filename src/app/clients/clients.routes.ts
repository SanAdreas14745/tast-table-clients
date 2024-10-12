import {Route} from "@angular/router";

export const clientsRoutes: Route[] = [
    {
        path: 'clients',
        loadComponent: () => import('./components/clients-table/clients-table.component').then(
            m => m.ClientsTableComponent)
    },
];
