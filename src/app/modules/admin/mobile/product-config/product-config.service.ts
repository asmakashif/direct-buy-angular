import { Injectable } from '@angular/core';
import { FilterData } from '../../../../Model/filter-data';
import { Data } from '../../../../Model/data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../../Model/api-response';
import { Observable } from 'rxjs';

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

    getTempStrProducts(shopId: string): Observable<any> {
        return this.http.get('/api/getTempStrProducts.php?shopId=' + shopId);
    }

    updateProductStatus(shopId: string): Observable<any> {
        return this.http.post('/api/updateProductStatus.php', shopId);
    }

    countStrProducts(shopId: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/countStrProducts.php?shopId=' + shopId
        );
    }
}
