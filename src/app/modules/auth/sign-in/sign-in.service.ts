import { Injectable } from '@angular/core';
import { Logindata } from '../../../Model/logindata';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../../Model/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SignInService {
    constructor(private http: HttpClient) {}

    signIn(loginData: Logindata): Observable<ApiResponse> {
        return this.http.post<ApiResponse>('/api/sign-in.php', loginData);
    }
}
