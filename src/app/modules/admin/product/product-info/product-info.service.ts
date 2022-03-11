import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryProduct } from 'app/Model/inventory.types';

@Injectable({
    providedIn: 'root',
})
export class ProductInfoService {
    constructor(private _httpClient: HttpClient) { }

    getTempStrProducts(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/getTempStrProducts.php?shopId=' + shopId
        );
    }

    getProductsfrombasedb(shopId): Observable<any> {
        return this._httpClient.get(
            '/api/products/getProductsfrombasedb.php?shopId=' + shopId
        );
    }

    getBaseProductById(
        temp_str_config_id: string,
        shopId
    ): Observable<InventoryProduct> {
        return this._httpClient.get<InventoryProduct>(
            '/api/products/getStoreProductsById.php?temp_str_config_id=' +
            temp_str_config_id +
            '&shopId=' +
            shopId
        );
    }

    getCategories(): Observable<any> {
        return this._httpClient.get('/api/mobileAPI/getCategory.php');
    }
}
