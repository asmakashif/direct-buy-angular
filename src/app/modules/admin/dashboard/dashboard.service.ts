import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

    getPrevMonthOrders(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/orders/getPrevMonthOrders.php?shopId=' + shopId
        );
    }

    getCurrentMonthOrders(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/orders/getCurrentMonthOrders.php?shopId=' + shopId
        );
    }

    getYestOpenOrders(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/orders/getYestOpenOrders.php?shopId=' + shopId
        );
    }

    getOpenOrders(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/orders/getOpenOrders.php?shopId=' + shopId
        );
    }

    getCurFulfilledOrders(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/orders/getCurFulfilledOrders.php?shopId=' + shopId
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
}
