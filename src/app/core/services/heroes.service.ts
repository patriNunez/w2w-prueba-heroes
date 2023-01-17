import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IHeroes, IApiResponse } from '../../shared/models/interfaces';
import { UtilitiesService } from './utilities.service';

@Injectable()
export class HeroesService {
  baseUrl = this.utilitiesService.getApiUrl();
  heroesBaseUrl = this.baseUrl + '/heroes';

  constructor(
    private http: HttpClient,
    private utilitiesService: UtilitiesService
  ) {}

  getHeroes(): Observable<IHeroes[]> {
    return this.http
      .get<IHeroes[]>(this.heroesBaseUrl)
      .pipe(catchError(this.handleError));
  }

  getHeroe(id: number): Observable<IHeroes> {
    return this.http
      .get<IHeroes>(this.heroesBaseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  insertHeroe(heroe: IHeroes): Observable<IHeroes> {
    return this.http
      .post<IHeroes>(this.heroesBaseUrl, heroe)
      .pipe(catchError(this.handleError));
  }

  updateHeroe(heroe: IHeroes): Observable<boolean> {
    return this.http
      .put<IApiResponse>(this.heroesBaseUrl + '/' + heroe.id, heroe)
      .pipe(
        map((res) => res.status),
        catchError(this.handleError)
      );
  }

  deleteHeroe(id: number): Observable<boolean> {
    return this.http.delete<IApiResponse>(this.heroesBaseUrl + '/' + id).pipe(
      map((res) => res.status),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(() => errMessage);
    }
    return throwError(() => error || 'Node.js server error');
  }
}
