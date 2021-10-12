import { Injectable } from '@angular/core';
import { Data } from '../../../Model/data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StorePaymentService {
    constructor(private http: HttpClient) {}

    getPaymentData(shopId: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/getPaymentData.php?shopId=' + shopId
        );
    }

    saveStrPayments(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/saveStrPayments.php', user);
    }
}
