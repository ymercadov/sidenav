import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { materias } from '../entidades/materias';
import { inscritos } from '../entidades/inscritos';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const apiUrl = `${environment.apiUrl}/materias`;

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<materias[]> {    
    return this.http.get<materias[]>(apiUrl).pipe(
      tap((res) => console.log(`fetched getAll relacionado`)),
      catchError(this.handleError('getAll', []))
    );
  }

   getInscritos(id: number, materiaid: number): Observable<inscritos[]> {    
    const url = `${apiUrl}/inscritos?id=${id}&materiaId=${materiaid}`;
    return this.http.get<inscritos[]>(url).pipe(
      tap((res) => console.log(`fetched getInscritos relacionado`)),
      catchError(this.handleError('getInscritos', []))
    );
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
