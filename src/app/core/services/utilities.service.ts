import { Injectable, Inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  port = '3000';
  url = `http://localhost:${this.port}`;
  fakeId = 10;

  getApiUrl() {
    return this.url;
  }

  getFakeId() {
    return this.url;
  }

  updateFakeId() {
    this.fakeId++;
  }

  reduceFakeId() {
    this.fakeId--;
  }
}
