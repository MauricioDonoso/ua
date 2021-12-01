import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { DefaultLayoutComponent }       from './layouts/default/default.component';

import { ExtraLayoutComponent }         from './layouts/extra/extra.component';

import { Page404Component }             from './pages/extra-pages/page-404/page-404.component';

import { LoginComponent } from './pages/login/login/login.component';
import { PoliticasComponent } from './pages/login/politicas/politicas.component';

import { Full_ROUTES } from './servicios/routes/routes';

const LoginRoutes: Routes = [
 { path: '', component: LoginComponent}
];
const PoliticasRoutes: Routes = [
  { path: 'politicas-y-privacidad', component: PoliticasComponent}
 ];
const errorRoutes: Routes = [
  { path: '', component: Page404Component }
];

export const routes: Routes = [
  { path: '',pathMatch: 'full',component: ExtraLayoutComponent,children:LoginRoutes},
  { path: '', component: ExtraLayoutComponent, data: { title: 'full Views' }, children: PoliticasRoutes,  },
  { path: '**', component: ExtraLayoutComponent,children: errorRoutes }
];

@NgModule({
  imports: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
