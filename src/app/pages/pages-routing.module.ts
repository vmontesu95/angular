import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ProfileComponent } from './perfil/profile.component';


const routes: Routes = [
  { path: 'catalogo', component: CatalogoComponent , canActivate: [AuthGuard]},
  { path: 'perfil', component: ProfileComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class PagesRoutingModule { }
