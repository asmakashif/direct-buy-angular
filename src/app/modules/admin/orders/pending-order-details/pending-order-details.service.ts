import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../../Model/api-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PendingOrderDetailsService {
    constructor(private _http: HttpClient) {}

    getPendingOrderById(order_code: string): Observable<ApiResponse> {
        return this._http.get<ApiResponse>(
            '/api/orders/orderDetailsById.php?order_code=' + order_code
        );
    }

    getPendingOrderDetails(
        order_code: string,
        shopId: string
    ): Observable<ApiResponse> {
        return this._http.get<ApiResponse>(
            '/api/orders/orderDetails.php?order_code=' +
                order_code +
                '&shopId=' +
                shopId
        );
    }

    updateOrderStatus(
        order_code: string,
        shopId: string
    ): Observable<ApiResponse> {
        return this._http.get<ApiResponse>(
            '/api/orders/updateOrderStatus.php?order_code=' +
                order_code +
                '&shopId=' +
                shopId
        );
    }
}
