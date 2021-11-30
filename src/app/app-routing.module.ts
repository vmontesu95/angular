import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { AuthGuard } from './auth/auth.guard';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { ProfileComponent } from './pages/perfil/profile.component';


const routes: Routes = [
  //{ path: '', pathMatch: 'full', component: LoginComponent },
  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'catalogo', component: CatalogoComponent, canActivate: [AuthGuard] },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule,
    PagesRoutingModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
