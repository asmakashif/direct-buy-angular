import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/Model/api-response';

@Injectable({
    providedIn: 'root',
})
export class CompletedOrdersService {
    constructor(private _http: HttpClient) {}

    getCompletedOrdersByStore(shopId: string): Observable<ApiResponse> {
        return this._http.get<ApiResponse>(
            '/api/orders/completedOrdersByStr.php?shopId=' + shopId
        );
    }
}
