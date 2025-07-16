import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { estudiantesmaterias } from '../entidades/estudiantesmaterias';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { estudiantesmateriasresponse } from '../entidades/estudiantesmateriasresponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const apiUrl = `${environment.apiUrl}/estudiantesmaterias`;

@Injectable({
  providedIn: 'root',
})
export class EstudiantesmateriasService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<estudiantesmateriasresponse[]> {
    return this.http.get<estudiantesmateriasresponse[]>(`${apiUrl}/${id}`).pipe(
      tap((res) => console.log(`fetched get`)),
      catchError(this.handleError('get', []))
    );
  }

  post(estuduantesmaterias: estudiantesmaterias[]): Observable<any> {
    return this.http.post<any>(apiUrl, estuduantesmaterias, httpOptions).pipe(
      tap((res: any) =>
        console.log(`added usuario w/ id=${estuduantesmaterias}`)
      ),
      catchError(this.handleError<any>('post usuarios'))
    );
  }

  delete(entidad: estudiantesmaterias) {
    const entidadDelete = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: entidad,
    };

    return this.http.delete<any>(apiUrl, entidadDelete).pipe(
      tap((_) => console.log(`deleted id=${entidad.Id}`)),
      catchError(this.handleError<any>('delete'))
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
