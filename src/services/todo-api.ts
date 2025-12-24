import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TodoApiService {
  constructor(private http: HttpClient) {
    console.log('RUN constructor TodoApiService');
  }

  getTodos() {
    return this.http.get<any>('https://dummyjson.com/todos');
  }
}
