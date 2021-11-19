import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiResponse } from 'app/Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MinOrderConfigService {
    constructor(private http: HttpClient) {}

    getMinimumOrderValue(shop_id:any){
        let params1 = new HttpParams().set('shop_id',shop_id);
        return this.http.get<ApiResponse>(
            'api/customers/getMinimumOrderValue.php',
           {params:params1}
        );
    }
    getMinimumOrderValueForUser(user_id:any){
        let params1 = new HttpParams().set('user_id',user_id);
        return this.http.get<ApiResponse>(
            'api/customers/getMinimumOrderValueForUser.php',
           {params:params1}
        );
    }
    saveMinimumOrderValue(data:any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            'api/customers/saveMinimumOrderValue.php',
            data
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
    getWorkingDays(userId:any){
        let params1 = new HttpParams().set('userId',userId);
        return this.http.get<ApiResponse>(
            'api/customers/getWorkingDays.php', {params:params1}
           
        );
    }
    getTimeSlots(){
        
        return this.http.get<ApiResponse>(
            'api/customers/getTimeSlots.php'
           
        );
    }
    getWorkingTime(data:any): Observable<ApiResponse>{
        // let params1 = new HttpParams().set('userId',userId);
        // let params2 = new HttpParams().set('day',day);
        return this.http.post<ApiResponse>(
            'api/customers/getWorkingTime.php',data
           
        );
    }
    getTimeSlotsByUser(userId:any)
    {
        let params1 = new HttpParams().set('userId',userId);
        return this.http.get<ApiResponse>(
            'api/customers/getTimeSlotsByUser.php', {params:params1}
           
        );
    }
    saveTimeSlots(slots:any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            'api/customers/saveTimeSlots.php',
            slots
        );
    }
}
