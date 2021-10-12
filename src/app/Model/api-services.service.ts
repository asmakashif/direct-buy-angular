import { Injectable } from '@angular/core';
import { Data } from './data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from './api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiServicesService {
    constructor(private _httpClient: HttpClient) {}

    getShops(): Observable<any> {
        return this._httpClient.get('/api/getShops.php');
    }

    getShopCopletedOrderCount(): Observable<any> {
        return this._httpClient.get('/api/countCompletedOrders.php');
    }

    getNoOfShops(): Observable<any> {
        return this._httpClient.get('/api/countShops.php');
    }

    getShopTypes(): Observable<any> {
        return this._httpClient.get('/api/getShopTypes.php');
    }

    getStoreTypes(): Observable<any> {
        return this._httpClient.get('/api/getStoreTypes.php');
    }

    createUser(user: Data): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>('/api/createShop.php', user);
    }

    getBaseProducts(): Observable<any> {
        return this._httpClient.get('/api/getBaseProducts.php');
    }
}
