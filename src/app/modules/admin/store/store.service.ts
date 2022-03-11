import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private _http: HttpClient) { }

  changeSubDomain(domainname, user_id): Observable<any> {
    return this._http.get<any>('/api/databaseCreation/changeSubDomain.php?domainname=' +
      domainname +
      '&user_id=' +
      user_id
    );
  }
}
