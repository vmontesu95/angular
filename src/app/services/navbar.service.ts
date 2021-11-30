import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public menu: any[] = [];

  constructor() {}

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!).menu;
  }

}
