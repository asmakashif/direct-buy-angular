import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiResponse } from 'app/Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InvoiceService {
    constructor(private _httpClient: HttpClient) {}

    getOrderReportsByOrderCode(order_code): Observable<any> {
        return this._httpClient.get(
            '/api/store_setting/getOrderReportsByOrderCode.php?order_code=' +
                order_code
        );
    }
    getOrderItemsByOrderCode(order_code): Observable<any> {
        return this._httpClient.get(
            '/api/store_setting/getOrderItemsByOrderCode.php?order_code=' +
                order_code
        );
    }

    updateOrderStatus(
        order_code: string,
        shopId: string
    ): Observable<ApiResponse> {
        return this._httpClient.get<ApiResponse>(
            '/api/orders/updateOrderStatus.php?order_code=' +
                order_code +
                '&shopId=' +
                shopId
        );
    }
}
