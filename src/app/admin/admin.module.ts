import {AdminComponent} from './admin.component';
import {AuthComponent} from './auth/auth.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

const routing = RouterModule.forChild([
  {path: 'auth', component: AuthComponent},
  {path: 'main', component: AdminComponent},
  {path: '**', redirectTo: 'auth'}
]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    AuthComponent,
    AdminComponent
  ]
})
export class AdminModule {
}
