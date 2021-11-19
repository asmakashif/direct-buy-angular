import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryProduct } from 'app/Model/inventory.types';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InventoryService {
    constructor(private _httpClient: HttpClient) {}

    getProductsByStr(): Observable<any> {
        return this._httpClient.get('/api/products/getStoreProducts.php');
    }

    getProductById(temp_str_config_id: string): Observable<InventoryProduct> {
        return this._httpClient.get<InventoryProduct>(
            '/api/products/getStoreProductsById.php?temp_str_config_id=' +
                temp_str_config_id
        );
    }
}
