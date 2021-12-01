import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ManagePaymentService {
    constructor(private _httpClient: HttpClient) {}

    getPaymentDataId(payment_id: string, user_id: string): Observable<any> {
        return this._httpClient.get<any>(
            '/api/payments/getPaymentDataId.php?payment_id=' +
                payment_id +
                '&user_id=' +
                user_id
        );
    }

    /**
     * Update product
     */
    updatePayment(payment): Observable<any> {
        return this._httpClient.post<any>(
            '/api/payments/updatePayment.php',
            payment
        );
    }

    /**
     * Delete product
     */
    deletePayment(payment_id: string): Observable<any> {
        return this._httpClient.get<any>(
            '/api/payments/deletePayment.php?payment_id=' + payment_id
        );
    }
}
