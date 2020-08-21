import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AmapHttpService {
  private http: HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(this.handler);
  }

  get(url, params?, headers?) {
    return this.http.get(url, { params });
  }
}
