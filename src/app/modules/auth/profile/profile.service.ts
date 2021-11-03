import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../../../Model/data';
import { ApiResponse } from '../../../Model/api-response';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private http: HttpClient) {}

    getRetailerDetailsById(user_id): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(
            '/api/getRetailerDetailsById.php?user_id=' + user_id
        );
    }

    updateRetailerDetails(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(
            '/api/updateRetailerDetails.php',
            user
        );
    }
}
