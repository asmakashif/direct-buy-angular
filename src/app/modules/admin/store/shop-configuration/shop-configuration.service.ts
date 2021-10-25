import { Injectable } from '@angular/core';
import { Data } from '../../../Model/data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ShopConfigurationService {
    constructor(private http: HttpClient) {}

    getShopDetailsById(shopId: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/getShopDetailsById.php?shopId=' + shopId
        );
    }

    getShopTypes(): Observable<any> {
        return this.http.get('/api/getShopTypes.php');
    }
}
