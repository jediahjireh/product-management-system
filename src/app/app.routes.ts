import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

// routing
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  // load module when accessing a specific route
  {
    path: 'about-us',
    loadChildren: () =>
      import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
];
