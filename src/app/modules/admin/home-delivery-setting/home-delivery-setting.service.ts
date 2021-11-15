import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiResponse } from 'app/Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HomeDeliverySettingService {
    constructor(private http: HttpClient) {}

    saveWorkingDays(days:any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            'api/customers/saveWorkingDays.php',
            days
        );
    }
    getMinimumOrderValue(shop_id:any){
        let params1 = new HttpParams().set('shop_id',shop_id);
        return this.http.get<ApiResponse>(
            'api/customers/getMinimumOrderValue.php',
           {params:params1}
        );
    }
    saveWorkingTime(time:any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            'api/customers/saveWorkingTime.php',
            time
        );
    }
    uncheckWorkingDays(days:any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            'api/customers/uncheckWorkingDays.php',
            days
        );
    }
}
