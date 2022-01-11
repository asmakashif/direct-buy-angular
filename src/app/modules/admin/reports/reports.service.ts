import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiResponse } from 'app/Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ReportsService {
    constructor(private _httpClient: HttpClient) {}

   
    getOrderReports(user_id): Observable<any> {
        return this._httpClient.get(
            '/api/store_setting/getOrderReports.php?user_id=' + user_id
        );
    }
}