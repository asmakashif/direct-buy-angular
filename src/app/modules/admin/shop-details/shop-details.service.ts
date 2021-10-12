import { Injectable } from '@angular/core';
import { Data } from '../../../Model/data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ShopDetailsService {
    constructor(private http: HttpClient) {}

    getShopDetailsById(shopId: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/getShopDetailsById.php?shopId=' + shopId
        );
    }

    getStrPaymentData(shopId: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/getStrPaymentData.php?shopId=' + shopId
        );
    }

    saveDefaultPayment(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/saveDefaultPayment.php', user);
    }

    updateUser(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/updateShop.php', user);
    }
}
