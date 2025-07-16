import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { estudiantesmateriasresponse } from '../entidades/estudiantesmateriasresponse';
import { profesoresmateriasresponse } from '../entidades/profesoresmateriasresponse';
import { profesoresmaterias } from '../entidades/profesoresmaterias';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const apiUrl = `${environment.apiUrl}/profesoresmaterias`;
@Injectable({
  providedIn: 'root',
})
export class ProfesormateriasService {
  constructor(private http: HttpClient) {}

  get(id: number): Observable<profesoresmateriasresponse[]> {
    return this.http.get<profesoresmateriasresponse[]>(`${apiUrl}/${id}`).pipe(
      tap((res) => console.log(`fetched get`)),
      catchError(this.handleError('get', []))
    );
  }

  post(profesoresmaterias: profesoresmaterias[]): Observable<any> {
    return this.http.post<any>(apiUrl, profesoresmaterias, httpOptions).pipe(
      tap((res: any) =>
        console.log(`added usuario w/ id=${profesoresmaterias}`)
      ),
      catchError(this.handleError<any>('post usuarios'))
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
