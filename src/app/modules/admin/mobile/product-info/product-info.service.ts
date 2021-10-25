import { Injectable } from '@angular/core';
import { BaseProduct } from '../../../../Model/base-product';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductInfoService {
    constructor(private http: HttpClient) {}

    getTempStrProducts(shopId: string): Observable<any> {
        return this.http.get('/api/getTempStrProducts.php?shopId=' + shopId);
    }

    updateStrTempData(data: BaseProduct): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            '/api/mobileAPI/updateStrTempData.php',
            data
        );
    }
}
