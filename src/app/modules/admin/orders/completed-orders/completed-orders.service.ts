import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/Model/api-response';

@Injectable({
    providedIn: 'root',
})
export class CompletedOrdersService {
    constructor(private _httpClient: HttpClient) {}

    getShops(user_id: string): Observable<any> {
        return this._httpClient.get('/api/getShops.php?user_id=' + user_id);
    }

    getShopDetailsById(
        shopId: string,
        user_id: string
    ): Observable<ApiResponse> {
        return this._httpClient.get<ApiResponse>(
            '/api/getShopDetailsById.php?shopId=' +
                shopId +
                '&user_id=' +
                user_id
        );
    }

    getAllOrdersByStore(shopId: string): Observable<ApiResponse> {
        return this._httpClient.get<ApiResponse>(
            '/api/orders/getAllOrdersByStore.php?shopId=' + shopId
        );
    }

    getPendingOrdersByStore(shopId: string): Observable<ApiResponse> {
        return this._httpClient.get<ApiResponse>(
            '/api/orders/pendingOrdersByStr.php?shopId=' + shopId
        );
    }

    getCompletedOrdersByStore(shopId: string): Observable<ApiResponse> {
        return this._httpClient.get<ApiResponse>(
            '/api/orders/completedOrdersByStr.php?shopId=' + shopId
        );
    }
}
