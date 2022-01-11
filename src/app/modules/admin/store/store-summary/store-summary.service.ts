import { Injectable } from '@angular/core';
import { Payment } from '../../../../Model/payment';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StoreSummaryService {
    constructor(private http: HttpClient) {}

    getShopDetailsById(shopId: string, user_id): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/getShopDetailsById.php?shopId=' +
                shopId +
                '&user_id=' +
                user_id
        );
    }

    countStrProducts(shopId: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/countStrProducts.php?shopId=' + shopId
        );
    }

    saveProductUpdate(user: Payment): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/saveProductUpdate.php', user);
    }

    createDB(shopId: string, user_id): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/databaseCreation/create_database.php?shopId=' +
                shopId +
                '&user_id=' +
                user_id
        );
    }

    createtables(shopId: string, user_id): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/databaseCreation/create_table.php?shopId=' +
                shopId +
                '&user_id=' +
                user_id
        );
    }

    pushData(shopId: string, user_id): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/databaseCreation/pushData.php?shopId=' +
                shopId +
                '&user_id=' +
                user_id
        );
    }
}
