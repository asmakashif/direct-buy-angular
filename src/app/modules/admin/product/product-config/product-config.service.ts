import { Injectable } from '@angular/core';
import { Data } from '../../../../Model/data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../../Model/api-response';
import { Observable } from 'rxjs';
import { FilterData } from 'app/Model/filter-data';

@Injectable({
    providedIn: 'root',
})
export class ProductConfigService {
    constructor(private http: HttpClient) {}

    getBaseProducts(): Observable<any> {
        return this.http.get('/api/getBaseProducts.php');
    }

    getStoreTypes(): Observable<any> {
        return this.http.get('/api/getStoreTypes.php');
    }

    createUser(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/createShop.php', user);
    }

    getCategoryByShopType(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            '/api/getCategoryByShopType.php',
            user
        );
    }

    getSubCatbyCategory(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            '/api/getSubCatbyCategory.php',
            user
        );
    }

    getBrandBySubCat(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/getBrandBySubCat.php', user);
    }

    getProductsByBrand(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/getProductsByBrand.php', user);
    }

    saveFilteredData(data: FilterData): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            '/api/mobileAPI/saveFilteredData.php',
            data
        );
    }

    pushProductsTOStrDb(shopId: string): Observable<any> {
        return this.http.get('/api/mobileAPI/pushProductsTOStrDb.php?shopId=' + shopId);
    }

    skipProductSetup(shopId: string): Observable<any> {
        return this.http.get(
            '/api/products/skipProductSetup.php?shopId=' + shopId
        );
    }

    // getProductsByBrandGroup(user: Data): Observable<ApiResponse> {
    //     return this.http.post<ApiResponse>(
    //         '/api/getProductsByBrandGroup.php',
    //         user
    //     );
    // }

    getTempStrProducts(shopId: string): Observable<any> {
        return this.http.get('/api/getTempStrProducts.php?shopId=' + shopId);
    }

    updateProductStatus(shopId: string): Observable<any> {
        return this.http.post('/api/updateProductStatus.php', shopId);
    }
}
