import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IHero, IApiResponse } from '../../shared/models/interfaces';
import { UtilitiesService } from './utilities.service';

@Injectable()
export class HeroesService {
  private baseUrl = this.utilitiesService.getApiUrl();
  private heroesBaseUrl = this.baseUrl + '/heroes';

  constructor(
    private http: HttpClient,
    private utilitiesService: UtilitiesService
  ) {}

  getHeroes(): Observable<IHero[]> {
    return this.http
      .get<IHero[]>(this.heroesBaseUrl)
      .pipe(catchError(this.handleError));
  }

  getHero(id: number): Observable<IHero> {
    return this.http
      .get<IHero>(this.heroesBaseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  insertHero(heroe: IHero): Observable<IHero> {
    return this.http
      .post<IHero>(this.heroesBaseUrl, heroe)
      .pipe(catchError(this.handleError));
  }

  updateHero(heroe: IHero): Observable<boolean> {
    return this.http
      .put<IApiResponse>(this.heroesBaseUrl + '/' + heroe.id, heroe)
      .pipe(
        map((res) => res.status),
        catchError(this.handleError)
      );
  }

  deleteHero(id: number): Observable<boolean> {
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
