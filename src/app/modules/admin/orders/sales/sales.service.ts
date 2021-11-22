import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'app/Model/api-response';

@Injectable({
    providedIn: 'root',
})
export class SalesService {
    constructor(private _http: HttpClient) {}

    getAllOrdersByStore(shopId: string): Observable<ApiResponse> {
        return this._http.get<ApiResponse>(
            '/api/orders/getAllOrdersByStore.php?shopId=' + shopId
        );
    }
}
