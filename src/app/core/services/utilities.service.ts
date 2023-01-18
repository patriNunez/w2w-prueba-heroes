import { Injectable, Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  port = '3000';
  url = `http://localhost:${this.port}`;
  getApiUrl() {
    return this.url;
  }
}
