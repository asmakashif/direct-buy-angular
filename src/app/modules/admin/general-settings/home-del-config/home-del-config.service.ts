import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiResponse } from 'app/Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HomeDelConfigService {
    constructor(private http: HttpClient) {}

    getTimeSlotsByUSer(user_id:any){
        let params1 = new HttpParams().set('user_id',user_id);
        return this.http.get<ApiResponse>(
            'api/store_setting/getTimeSlotsByUSer.php',
           {params:params1}
        );
    }
    getTimeSlotsByShop(shop_id:any){
        let params1 = new HttpParams().set('shop_id',shop_id);
        return this.http.get<ApiResponse>(
            'api/store_setting/getTimeSlotsByShop.php',
           {params:params1}
        );
    }
    saveTimeSlotsByShop(data:any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            'api/store_setting/saveTimeSlotsByShop.php',
            data
        );
    }
    deleteTimeSlots(id:any){
        let params1 = new HttpParams().set('id',id);
        return this.http.get<ApiResponse>(
            'api/store_setting/deleteTimeSlots.php',
           {params:params1}
        );
    }
}