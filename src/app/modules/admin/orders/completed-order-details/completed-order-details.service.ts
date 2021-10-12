import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../../Model/api-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CompletedOrderDetailsService {
    constructor(private _http: HttpClient) {}

    getCompletedOrderById(order_code: string): Observable<ApiResponse> {
        return this._http.get<ApiResponse>(
            '/api/orderDetailsById.php?order_code=' + order_code
        );
    }

    getCompletedOrderDetails(order_code: string): Observable<ApiResponse> {
        return this._http.get<ApiResponse>(
            '/api/orderDetails.php?order_code=' + order_code
        );
    }
}
