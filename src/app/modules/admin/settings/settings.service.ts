import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ApiResponse } from 'app/Model/api-response';
import { InventoryProduct } from '../../../Model/inventory.types';
import { Data } from 'app/Model/data';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    private _products: BehaviorSubject<InventoryProduct[] | null> =
        new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) {}

    getShops(user_id: string): Observable<any> {
        return this._httpClient.get('/api/getShops.php?user_id=' + user_id);
    }

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

    updateShopDetails(user: Data): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>('/api/updateShop.php', user);
    }

    updateAdditionalSetting(user: Data): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(
            '/api/updateAdditionalSetting.php',
            user
        );
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

    getAllOrderCount(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/orders/getAllOrderCount.php?shopId=' + shopId
        );
    }

    // getNewRegisteredCustomers(shopId: string): Observable<any> {
    //     return this._httpClient.get(
    //         '/api/store_setting/getNewRegisteredCustomers.php?shopId=' + shopId
    //     );
    // }

    // getRegisteredCustomers(shopId: string): Observable<any> {
    //     return this._httpClient.get(
    //         '/api/store_setting/getRegisteredCustomers.php?shopId=' + shopId
    //     );
    // }

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

    getProductsByStr(shopId): Observable<any> {
        return this._httpClient.get(
            '/api/products/getStoreProducts.php?shopId=' + shopId
        );
    }

    getProductById(temp_str_config_id: string): Observable<InventoryProduct> {
        return this._httpClient.get<InventoryProduct>(
            '/api/products/getStoreProductsById.php?temp_str_config_id=' +
                temp_str_config_id
        );
    }

    /**
     * Create product
     */
    createProduct(shopId: string, user_id): Observable<InventoryProduct> {
        return this._httpClient.get<InventoryProduct>(
            '/api/products/addProduct.php?shopId=' +
                shopId +
                '&user_id=' +
                user_id
        );
    }

    /**
     * Update product
     */
    updateProduct(product: InventoryProduct): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(
            '/api/products/updateProduct.php',
            product
        );
    }

    /**
     * Delete product
     */
    deleteProduct(temp_str_config_id: string): Observable<InventoryProduct> {
        return this._httpClient.get<InventoryProduct>(
            '/api/products/deleteProduct.php?temp_str_config_id=' +
                temp_str_config_id
        );
    }

    /**
     * Update RetailerDetails
     */
    updateRetailerDetails(user: Data): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(
            '/api/updateRetailerDetails.php',
            user
        );
    }

    getStrPaymentCount(shopId: string): Observable<any> {
        return this._httpClient.get(
            '/api/store_setting/getStrPaymentCount.php?shopId=' + shopId
        );
    }

    getTotalMinOrderVal(user_id): Observable<any> {
        return this._httpClient.get(
            '/api/store_setting/getTotalMinOrderVal.php?user_id=' + user_id
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

    deleteShop(shopId): Observable<InventoryProduct> {
        return this._httpClient.get<InventoryProduct>(
            '/api/store_setting/deleteShop.php?shopId=' + shopId
        );
    }

    deactivateShop(shopId): Observable<InventoryProduct> {
        return this._httpClient.get<InventoryProduct>(
            '/api/store_setting/deactivateShop.php?shopId=' + shopId
        );
    }
}
