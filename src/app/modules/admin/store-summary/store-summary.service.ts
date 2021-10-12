import { Injectable } from '@angular/core';
import { Payment } from '../../../Model/payment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StoreSummaryService {
    constructor(private http: HttpClient) {}

    getShopDetailsById(shopId: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/getShopDetailsById.php?shopId=' + shopId
        );
    }

    countStrProducts(shopId: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/countStrProducts.php?shopId=' + shopId
        );
    }

    saveProductUpdate(user: Payment): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/saveProductUpdate.php', user);
    }
}
