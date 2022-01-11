import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductInfoService {
    constructor(private _httpClient: HttpClient) {}

    getTempStrProducts(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/getTempStrProducts.php?shopId=' + shopId
        );
    }

    getProductsByStr(shopId): Observable<any> {
        return this._httpClient.get(
            '/api/products/getStoreProducts.php?shopId=' + shopId
        );
    }

    getCategories(): Observable<any> {
        return this._httpClient.get('/api/mobileAPI/getCategory.php');
    }
}
