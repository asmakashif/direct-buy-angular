import { Injectable } from '@angular/core';
import { Data } from '../../../Model/data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CreateShopService {
    constructor(private http: HttpClient) {}

    getShopTypes(): Observable<any> {
        return this.http.get('/api/getShopTypes.php');
    }

    getStoreTypes(): Observable<any> {
        return this.http.get('/api/getStoreTypes.php');
    }

    createUser(user: Data): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/createShop.php', user);
    }

    getBaseProducts(): Observable<any> {
        return this.http.get('/api/getBaseProducts.php');
    }
}
