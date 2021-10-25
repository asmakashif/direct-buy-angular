import { Injectable } from '@angular/core';
import { Data } from '../../../Model/data';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CreateService {
    constructor(private http: HttpClient) {}

    getStoreTypes(): Observable<any> {
        return this.http.get('/api/getStoreTypes.php');
    }
}
