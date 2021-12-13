import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AttachPaymentService {
    constructor(private _httpClient: HttpClient) {}

    getShopsPaymentData(
        payment_name: string,
        user_id: string
    ): Observable<any> {
        return this._httpClient.get(
            '/api/payments/getShopsPaymentData.php?payment_name=' +
                payment_name +
                '&user_id=' +
                user_id
        );
    }

    saveStrPayments(data): Observable<any> {
        return this._httpClient.post<any>('/api/saveStrPayments.php', data);
    }

    deleteStrPaymentByShopId(data): Observable<any> {
        return this._httpClient.post<any>(
            '/api/payments/deleteStrPaymentByShopId.php',
            data
        );
    }
}
