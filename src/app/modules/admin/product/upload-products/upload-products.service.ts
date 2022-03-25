import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadProductsService {

  constructor(private _httpClient: HttpClient) { }

  readXLColFrmDB(shopId): Observable<any> {
    return this._httpClient.get<any>('/api/products/readXLColFrmDB.php?shopId=' +
      shopId);
  }

  getXLTempData(shopId): Observable<any> {
    return this._httpClient.get<any>('/api/products/readXLDataFrmDB.php?shopId=' +
      shopId);
  }

  saveXLConfig(product): Observable<any> {
    return this._httpClient.post<any>(
      '/api/products/saveXLConfig.php',
      product
    );
  }

  saveXLConfigStatus(product): Observable<any> {
    return this._httpClient.post<any>(
      '/api/products/saveXLConfigStatus.php',
      product
    );
  }

  mapTblHeaders(shopId): Observable<any> {
    return this._httpClient.get<any>('/api/products/MoveTblData.php?shopId=' +
      shopId);
  }

  getXLConfigData(shopId): Observable<any> {
    return this._httpClient.get<any>('/api/products/getXLConfigData.php?shopId=' +
      shopId);
  }

  pushMappedData(shopId): Observable<any> {
    return this._httpClient.get<any>('/api/products/pushMappedData.php?shopId=' +
      shopId);
  }

  saveMaptblheaderStatus(shopId): Observable<any> {
    return this._httpClient.get<any>('/api/products/saveMaptblheaderStatus.php?shopId=' +
      shopId);
  }

  getShopDetailsById(
    shopId: string,
    user_id: string
  ): Observable<any> {
    return this._httpClient.get<any>(
      '/api/getShopDetailsById.php?shopId=' +
      shopId +
      '&user_id=' +
      user_id
    );
  }
}
