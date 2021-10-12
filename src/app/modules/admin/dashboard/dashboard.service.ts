import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
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
}
