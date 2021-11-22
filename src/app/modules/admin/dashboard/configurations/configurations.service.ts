import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ApiResponse } from 'app/Model/api-response';
import { InventoryProduct } from '../../../../Model/inventory.types';
import { Data } from 'app/Model/data';

@Injectable({
    providedIn: 'root',
})
export class ConfigurationsService {
    constructor(private _httpClient: HttpClient) {}

    getStrPaymentCount(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/store_setting/getStrPaymentCount.php?shopId=' + shopId
        );
    }

    getTotalMinOrderVal(user_id): Observable<any> {
        return this._httpClient.get(
            '/api/store_setting/getTotalMinOrderVal.php?userId=' + user_id
        );
    }
    getTotalHomeDel(shop_id): Observable<any> {
        return this._httpClient.get(
            '/api/store_setting/getTotalHomeDel.php?shop_id=' + shop_id
        );
    }
    getTotalHomeDelByUser(user_id): Observable<any> {
        return this._httpClient.get(
            '/api/store_setting/getTotalHomeDelByUser.php?user_id=' + user_id
        );
    }
}
