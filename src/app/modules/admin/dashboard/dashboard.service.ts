import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiResponse } from 'app/Model/api-response';
import { Data } from 'app/Model/data';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    constructor(private _httpClient: HttpClient) {}

    getShops(user_id: string): Observable<any> {
        return this._httpClient.get('/api/getShops.php?user_id=' + user_id);
    }

    getPaymentGateway(user_id: string): Observable<any> {
        return this._httpClient.get(
            '/api/payments/getPaymentGateway.php?user_id=' + user_id
        );
    }

    getNoOfShops(user_id: string): Observable<any> {
        return this._httpClient.get('/api/countShops.php?user_id=' + user_id);
    }

    getNoOfPayment(user_id: string): Observable<any> {
        return this._httpClient.get(
            '/api/payments/countPayment.php?user_id=' + user_id
        );
    }

    getPrevMonthOrderCount(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/orders/getPrevMonthOrderCount.php?shopId=' + shopId
        );
    }

    getCurrentMonthOrderCount(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/orders/getCurrentMonthOrderCount.php?shopId=' + shopId
        );
    }

    getYestOpenOrderCount(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/orders/getYestOpenOrderCount.php?shopId=' + shopId
        );
    }

    getOpenOrderCount(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/orders/getOpenOrderCount.php?shopId=' + shopId
        );
    }

    getCurFulfilledOrderCount(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/orders/getCurFulfilledOrderCount.php?shopId=' + shopId
        );
    }

    getNewRegisteredCustomers(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/customers/getNewRegisteredCustomers.php?shopId=' + shopId
        );
    }

    getRegisteredCustomers(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/customers/getRegisteredCustomers.php?shopId=' + shopId
        );
    }

    getRetailerDetailsById(user_id): Observable<ApiResponse> {
        return this._httpClient.get<ApiResponse>(
            '/api/getRetailerDetailsById.php?user_id=' + user_id
        );
    }

    updateRetailerDetails(user: Data): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(
            '/api/updateRetailerDetails.php',
            user
        );
    }
}
