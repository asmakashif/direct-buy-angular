import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OpenOrdersService {
    constructor(private _http: HttpClient) {}

    getOpenOrders(shopId: string): Observable<ApiResponse> {
        return this._http.get<ApiResponse>(
            '/api/orders/getOpenOrders.php?shopId=' + shopId
        );
    }
}
