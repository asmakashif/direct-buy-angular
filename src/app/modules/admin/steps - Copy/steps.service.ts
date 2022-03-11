import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StepsService {
    constructor(private _httpClient: HttpClient) { }

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

    skipProductSetup(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/products/skipProductSetup.php?shopId=' + shopId
        );
    }
}
