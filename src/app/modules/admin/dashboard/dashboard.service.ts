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
export class DashboardService {
    private _products: BehaviorSubject<InventoryProduct[] | null> =
        new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) {}

    /**
     * Getter for products
     */
    get products$(): Observable<InventoryProduct[]> {
        return this._products.asObservable();
    }

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

    getProductsByStr(): Observable<any> {
        return this._httpClient.get('/api/products/getStoreProducts.php');
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
    // createProduct(): Observable<InventoryProduct> {
    //     return this.products$.pipe(
    //         take(1),
    //         switchMap((products) =>
    //             this._httpClient
    //                 .post<InventoryProduct>(
    //                     'api/apps/ecommerce/inventory/product',
    //                     {}
    //                 )
    //                 .pipe(
    //                     map((newProduct) => {
    //                         // Update the products with the new product
    //                         this._products.next([newProduct, ...products]);

    //                         // Return the new product
    //                         return newProduct;
    //                     })
    //                 )
    //         )
    //     );
    //     // return this._httpClient
    //     //     .post<InventoryProduct>('api/apps/ecommerce/inventory/product', {})
    //     //     .pipe(
    //     //         map((newProduct) => {
    //     //             // Update the products with the new product
    //     //             this._products.next([newProduct]);

    //     //             // Return the new product
    //     //             return newProduct;
    //     //         })
    //     //     );
    // }

    updateProduct(product: InventoryProduct): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(
            '/api/products/updateProduct.php',
            product
        );
    }

    deleteProduct(temp_str_config_id: string): Observable<InventoryProduct> {
        return this._httpClient.get<InventoryProduct>(
            '/api/products/deleteProduct.php?temp_str_config_id=' +
                temp_str_config_id
        );
    }

    updateRetailerDetails(user: Data): Observable<ApiResponse> {
        return this._httpClient.post<ApiResponse>(
            '/api/updateRetailerDetails.php',
            user
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
}
