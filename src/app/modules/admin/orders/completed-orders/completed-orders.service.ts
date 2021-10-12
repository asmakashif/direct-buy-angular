import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CompletedOrdersService {
    constructor(private http: HttpClient) {}

    getCompletedOrders(): Observable<any> {
        return this.http.get('/api/completedOrders.php');
    }
}
