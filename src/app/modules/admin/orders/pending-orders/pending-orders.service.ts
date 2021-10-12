import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PendingOrdersService {
    constructor(private http: HttpClient) {}

    getPendingOrders(): Observable<any> {
        return this.http.get('/api/pendingOrders.php');
    }
}
