import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { ApiResponse } from 'app/Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MinOrderValService {
    constructor(private http: HttpClient) {}

    saveMinimumOrderValue(data:any): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            'api/store_setting/saveMinimumOrderValueForUser.php',
            data
        );
    }
    getMinimumOrderValue(user_id:any){
        let params1 = new HttpParams().set('user_id',user_id);
        return this.http.get<ApiResponse>(
            'api/store_setting/getMinimumOrderValueForUser.php',
           {params:params1}
        );
    }
    deleteMinimumOrderValue(id:any){
        let params1 = new HttpParams().set('id',id);
        return this.http.get<ApiResponse>(
            'api/store_setting/deleteMinimumOrderValue.php',
           {params:params1}
        );
    }
}
