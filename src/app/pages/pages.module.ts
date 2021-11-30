import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CatalogoComponent } from './catalogo/catalogo.component';
import {MatCardModule} from '@angular/material/card';
import { ProfileComponent } from './perfil/profile.component';


@NgModule({
  declarations: [CatalogoComponent, ProfileComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatCardModule,
  ]
})
export class PagesModule { }
