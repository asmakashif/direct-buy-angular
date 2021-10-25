import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductInfoService {
    constructor(private http: HttpClient) {}

    getTempStrProducts(shopId: string): Observable<any> {
        return this.http.get('/api/getTempStrProducts.php?shopId=' + shopId);
    }
}
