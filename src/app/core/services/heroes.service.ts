import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IHero, IApiResponse } from '../../shared/models/interfaces';
import { UtilitiesService } from './utilities.service';

@Injectable()
export class HeroesService {
  baseUrl = this.utilitiesService.getApiUrl();
  heroesBaseUrl = this.baseUrl + '/heroes';

  constructor(
    private http: HttpClient,
    private utilitiesService: UtilitiesService
  ) {}

  getHeroes(): Observable<IHero[]> {
    return this.http
      .get<IHero[]>(this.heroesBaseUrl)
      .pipe(catchError(this.handleError));
  }

  getHeroe(id: number): Observable<IHero> {
    return this.http
      .get<IHero>(this.heroesBaseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  insertHeroe(heroe: IHero): Observable<IHero> {
    return this.http
      .post<IHero>(this.heroesBaseUrl, heroe)
      .pipe(catchError(this.handleError));
  }

  updateHeroe(heroe: IHero): Observable<boolean> {
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
