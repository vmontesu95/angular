import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Token } from '../interfaces/token.interface';
import { of } from 'rxjs';
import { UserLogin } from '../interfaces/user.interface';

const APP_URL = environment.APP_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usuario: Usuario;
  public sessionId: string = '';

  constructor(
    private http: HttpClient,
  ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.userId || '';
  }

  get headers() {
    return {
      headers: {
        'Authorization': 'Bearer ' + this.token
      }
    }
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token); // obtener una nueva versión del token
  }

  /* Estas son las opciones
  de menú del navbar y se utiliza
  en el servicio de navbar */
  guardarMenu(menu: any) {
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  login(form) {
    const user = form.email;
    const password = form.password;

    return this.http.post<Token>(`https://vmontesu-eval-test.apigee.net/oauth-sandbox/v1/access-token?grant_type=client_credentials`, {
      headers: {
        'Authorization': 'Basic UFkzVHRBNDZQOTdBOVZ4bnBGOWJUWkxSQ01BV3B5RXI6N2o0UnpwUVBkV1ZMQ2ZaUg=='
      }
    })
      .pipe(
        switchMap( resp => {
          this.guardarToken(resp.accessToken);

          return this.http.post<UserLogin>(`${ APP_URL }/um-mock/v1/users/login`, {'user': user, 'password': password}, this.headers)
            .pipe(
              tap( (resp) => {
                const { userId, clientId, clientData: { name, lastName, userName } } = resp.userInfo;

                this.sessionId = resp.session.sessionId;
                this.usuario = new Usuario(userId, clientId, name, lastName, userName);
              }),
              tap( ( _ ) => this.http.get(`${ APP_URL }/um-mock/v1/users/menu`).subscribe( menu => this.guardarMenu(menu))),
              catchError( ( _ ) => of(false)),
            );
        }),
        catchError( ( _ ) => of(false))
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    return this.http.post(`${ APP_URL }/um-mock/v1/users/logout`, {}, {
      headers: {
        'Authorization': this.token,
        'Logged-Session-Id': this.sessionId
      }
    });
  }

}
