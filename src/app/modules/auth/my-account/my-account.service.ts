import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MyAccountService {
    constructor(private _httpClient: HttpClient) {}

    getShops(user_id: string): Observable<any> {
        return this._httpClient.get('/api/getShops.php?user_id=' + user_id);
    }
}
