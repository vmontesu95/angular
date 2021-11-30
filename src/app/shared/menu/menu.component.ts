import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public navbarService: NavbarService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.userService.logout().subscribe( ( _ ) => {
      this.router.navigate(['/login']);
    });
  }

  profile() {
    this.router.navigate(['/perfil']);
  }

  catalog() {
    this.router.navigate(['/catalogo']);
  }

}
