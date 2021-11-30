import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup; // podría tener un nombre más específico como loginForm
  public mostrarErrores: boolean = false; // se vuelve verdadera cuando se hace submit y hay errores

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private usuarioService: UserService,
    private navbarService: NavbarService
  ) {
    // TODO: hacer validaciones una vez se pidan las credenciales de acceso
    this.form = this.fb.group({
      email   : [ 'vmontesu', [ Validators.required ] ],
      password: [ '123', [ Validators.required ] ],
    });
  }

  handleSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.mostrarErrores = true;
      return;
    } else {
      this.mostrarErrores = false;
    }

    // intentar iniciar sesión
    this.usuarioService.login(this.form.value).subscribe( usuario => {
       if( usuario ) {
        this.navbarService.cargarMenu(); // cargar el menú en la interfaz
        this.router.navigate(['/catalogo']);
       } else {
        console.log("No entró");
       }
    }, (err) => {
      // TODO: Mostrar mensajes de error
      console.log(err);
    });
  }

  esCampoInvalido(campo: string) {
    return this.form.get(campo)?.invalid && this.form.get(campo)?.touched;
  }

}
