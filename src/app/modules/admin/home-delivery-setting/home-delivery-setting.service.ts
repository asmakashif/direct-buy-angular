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
            'api/store_setting/saveWorkingDays.php',
            days
        );
    }
    getMinimumOrderValue(shop_id:any){
        let params1 = new HttpParams().set('shop_id',shop_id);
        return this.http.get<ApiResponse>(
            'api/store_setting/getMinimumOrderValue.php',
           {params:params1}
        );
    }
    saveWorkingTime(time:any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            'api/store_setting/saveWorkingTime.php',
            time
        );
    }
    uncheckWorkingDays(days:any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            'api/store_setting/uncheckWorkingDays.php',
            days
        );
    }
    getWorkingDays(userId:any){
        let params1 = new HttpParams().set('userId',userId);
        return this.http.get<ApiResponse>(
            'api/store_setting/getWorkingDays.php', {params:params1}
           
        );
    }
    getTimeSlots(){
        
        return this.http.get<ApiResponse>(
            'api/store_setting/getTimeSlots.php'
           
        );
    }
    getWorkingTime(data:any): Observable<ApiResponse>{
      
        return this.http.post<ApiResponse>(
            'api/store_setting/getWorkingTime.php',data
           
        );
    }
    getTimeSlotsByUser(userId:any)
    {
        let params1 = new HttpParams().set('userId',userId);
        return this.http.get<ApiResponse>(
            'api/store_setting/getTimeSlotsByUser.php', {params:params1}
           
        );
    }
    saveTimeSlots(slots:any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            'api/store_setting/saveTimeSlots.php',
            slots
        );
    }
    deleteTimeSlots(id:any){
        let params1 = new HttpParams().set('id',id);
        return this.http.get<ApiResponse>(
            'api/store_setting/deleteTimeForUser.php',
           {params:params1}
        );
    }
    
}
