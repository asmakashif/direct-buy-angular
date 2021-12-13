import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { InventoryProduct } from '../../../../Model/inventory.types';
import { ApiResponse } from 'app/Model/api-response';

@Injectable({
    providedIn: 'root',
})
export class AddProductService {
    private _products: BehaviorSubject<InventoryProduct[] | null> =
        new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) {}

    /**
     * Create product
     */
    addProduct(product: InventoryProduct): Observable<any> {
        return this._httpClient.post<any>(
            '/api/products/addProduct.php',
            product
        );
    }

    getCategories(): Observable<any> {
        return this._httpClient.get('/api/mobileAPI/getCategory.php');
    }
}
