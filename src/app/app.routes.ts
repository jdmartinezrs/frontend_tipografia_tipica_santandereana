import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  {
    path: 'auth',
    title: 'Acceso | Tipografía Típica de Santander',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout').then((m) => m.AuthLayout),
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '',
    // canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: 'fuentes',
        loadChildren: () =>
          import('./features/fonts/fonts.routes').then((m) => m.FONTS_ROUTES),
      },
      {
        path: 'artistas',
        loadChildren: () =>
          import('./features/artists/artists.routes').then((m) => m.ARTISTS_ROUTES),
      },
      {
        path: 'carrito',
        loadChildren: () =>
          import('./features/cart/cart.routes').then((m) => m.CART_ROUTES),
      },
    ],
  },
  // Cualquier ruta desconocida vuelve al inicio (y el guard decidirá si pide login)
  { path: '**', redirectTo: '' },
];
