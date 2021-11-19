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
            'api/customers/saveMinimumOrderValueForUser.php',
            data
        );
    }
    getMinimumOrderValue(shop_id:any){
        let params1 = new HttpParams().set('shop_id',shop_id);
        return this.http.get<ApiResponse>(
            'api/customers/getMinimumOrderValue.php',
           {params:params1}
        );
    }
}
