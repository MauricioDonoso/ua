import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { DefaultLayoutComponent }       from './layouts/default/default.component';

import { ExtraLayoutComponent }         from './layouts/extra/extra.component';

import { Page404Component }             from './pages/extra-pages/page-404/page-404.component';

import { LoginComponent } from './pages/login/login/login.component';

import { Full_ROUTES } from './servicios/routes/routes';

const LoginRoutes: Routes = [
 { path: '', component: LoginComponent}
];
const errorRoutes: Routes = [
  { path: '', component: Page404Component }
];

export const routes: Routes = [
  { path: '',pathMatch: 'full',component: ExtraLayoutComponent,children:LoginRoutes},
  // { path: '', component: DefaultLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES,  },
  { path: '**', component: ExtraLayoutComponent,children: errorRoutes }
];

@NgModule({
  imports: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
