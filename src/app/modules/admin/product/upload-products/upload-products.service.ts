import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadProductsService {

  constructor(private _http: HttpClient) { }

  readXLColFrmDB(shopId): Observable<any> {
    return this._http.get<any>('/api/products/readXLColFrmDB.php?shopId=' +
      shopId);
  }

  getXLTempData(shopId): Observable<any> {
    return this._http.get<any>('/api/products/readXLDataFrmDB.php?shopId=' +
      shopId);
  }
}
