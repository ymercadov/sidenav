import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { usuarios } from '../entidades/usuarios';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { loginmodel } from '../entidades/loginmodel';
import { AuthResponseModel } from '../entidades/auth-response-model';
import { estudianterelacionados } from '../entidades/estudianterelacionados';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const apiUrl = `${environment.apiUrl}/usuarios`;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  tokenkey: string = 'token';
  userid: string = 'userid';
  tipousuario: string = 'tipousuario';
  profesores: any = ([] = []);
  //unUsuario: usuarios = new usuarios();
  constructor(private http: HttpClient) {}

  get(id: number): Observable<usuarios> {
    return this.http.get<usuarios>(`${apiUrl}/${id}`).pipe(
      tap((_) => console.log(`fetched get isbn=${id}`)),
      catchError(this.handleError<usuarios>(`get id=${id}`))
    );
  }

  getAll(): Observable<usuarios[]> {
    return this.http.get<usuarios[]>(apiUrl).pipe(
      tap((res) => console.log(`fetched getAll relacionado`)),
      catchError(this.handleError('getAll', []))
    );
  }
  post(usuario: usuarios): Observable<any> {
    console.log(usuario);
    return this.http.post<any>(apiUrl, usuario, httpOptions).pipe(
      tap((res: any) => console.log(`added usuario w/ id=${usuario}`)),
      catchError(this.handleError<any>('post usuarios'))
    );
  }

  getResgistrados(id: number): Observable<estudianterelacionados[]> {
    const url = `${apiUrl}/ConsultarResgistrosEstudiantes?id=${id}`;
    return this.http.get<estudianterelacionados[]>(url).pipe(
      tap((res) => console.log(`fetched getAll relacionado`)),
      catchError(this.handleError('getAll', []))
    );
  }

  update(usuario: usuarios): Observable<any> {
    const entidadUpdate = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: usuario,
    };
    return this.http.put(apiUrl, usuario, httpOptions).pipe(
      tap((_) => console.log(`updated  id=${usuario.id}`)),
      catchError(this.handleError<any>('updateestudiante'))
    );
  }
  login(vm: loginmodel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${apiUrl}/login`, vm).pipe(
      map((res) => {
        if (res.result) {
          localStorage.setItem(this.userid, res.userId);
          localStorage.setItem(this.tipousuario, res.tipoUsuario);
          localStorage.setItem(this.tokenkey, res.token);
        }
        return res;
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenkey);
    localStorage.removeItem(this.userid);
    localStorage.removeItem(this.tipousuario);
  }
  isLoggedIn(): boolean {
    const token = this.retriveToken();
    if (token == null) {
      return false;
    }
    return this.isTokenValid(token);
  }
  private retriveToken(): string | null {
    return localStorage.getItem(this.tokenkey) || null;
  }

  isTokenValid(token: string): boolean {
    if (token == null) return false;

    try {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      const isValid = Date.now() < decodedToken.exp * 1000;

      if (!isValid) this.logout();

      return isValid;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return throwError(() => error); // Aquí es donde lanzas el error para que lo capture el componente
      // // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // // Let the app keep running by returning an empty result.
      // return of(result as T);
    };
  }
}
