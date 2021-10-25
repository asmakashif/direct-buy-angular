import { Injectable } from '@angular/core';
import { Data } from '../../../../Model/data';
import { ApiResponse } from '../../../../Model/api-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

function _window(): any {
    // return the global native browser window object
    return window;
}

@Injectable({
    providedIn: 'root',
})
export class StoreActivationService {
    constructor(private http: HttpClient) {}
    baseUrl: string = '/api/updateTrialStatus.php';
    get nativeWindow(): any {
        return _window();
    }

    getShopDetailsById(shopId: string, user_id): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/getShopDetailsById.php?shopId=' +
                shopId +
                '&user_id=' +
                user_id
        );
    }

    updateUser(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/updateShopPayment.php', user);
    }

    updateTrialStatus(shopId: string): Observable<ApiResponse> {
        // return this.http.post<ApiResponse>(
        //     '/api/updateTrialStatus.php',
        //     shopId
        // );
        return this.http.get<ApiResponse>(
            '/api/updateTrialStatus.php?shopId=' + shopId
        );
    }
}
