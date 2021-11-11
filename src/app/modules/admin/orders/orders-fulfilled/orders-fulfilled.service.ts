import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'app/Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrdersFulfilledService {
    constructor(private _http: HttpClient) {}

    getPrevMonthOrdersFulfilled(shopId: string): Observable<ApiResponse> {
        return this._http.get<ApiResponse>(
            '/api/orders/getPrevMonthOrderFulfilled.php?shopId=' + shopId
        );
    }
}
