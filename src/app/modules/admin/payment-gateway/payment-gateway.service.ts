import { Injectable } from '@angular/core';
import { Payment } from '../../../Model/payment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PaymentGatewayService {
    constructor(private http: HttpClient) {}

    savePaymentIntegration(payment: Payment): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            '/api/savePaymentIntegration.php',
            payment
        );
    }
}
