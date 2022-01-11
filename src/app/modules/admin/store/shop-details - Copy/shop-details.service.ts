import { Injectable } from '@angular/core';
import { Data } from '../../../../Model/data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ShopDetailsService {
    constructor(private http: HttpClient) {}

    getShopDetailsById(
        shopId: string,
        user_id: string
    ): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/getShopDetailsById.php?shopId=' +
                shopId +
                '&user_id=' +
                user_id
        );
    }

    getStrPaymentData(
        shopId: string,
        user_id: string
    ): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/getStrPaymentData.php?shopId=' +
                shopId +
                '&user_id=' +
                user_id
        );
    }

    saveDefaultPayment(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/saveDefaultPayment.php', user);
    }

    updateUser(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/updateShop.php', user);
    }

    updateAdditionalSetting(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            '/api/updateAdditionalSetting.php',
            user
        );
    }
}
