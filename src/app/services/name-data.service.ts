import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NameDataService {

  private url = 'assets/names.json';

  constructor(private http: HttpClient) { }

  getNames(): Observable<string[]> {
    return this.http.get<{ names: string[] }>(this.url).pipe(
      // debugger
      map(response => (response.names))
    );
  }
}
