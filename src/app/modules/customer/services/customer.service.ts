import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../Model/api-response';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  baseUrl = 'http://localhost/api/';
  paramMap: any;
  id:any;
  constructor(private http: HttpClient) { }
  getCustAddress(id:any)
  {
    let params1 = new HttpParams().set('id',id);
    return this.http.get<ApiResponse>(this.baseUrl + 'custAddress.php',{params:params1});
  }
  updateAddres(id:any): Observable<ApiResponse>
  {
    let params1 = new HttpParams().set('id',id);
    return this.http.get<ApiResponse>(this.baseUrl + 'updateAddress.php',{params:params1});
  }
  getCustDetails(id:any)
  {
    let params1 = new HttpParams().set('id',id);
    return this.http.get<ApiResponse>(this.baseUrl + 'custdetails.php',{params:params1});
  }
 
  getDeleteAddress(id:any)
  {
    let params1 = new HttpParams().set('id',id);
    return this.http.delete<ApiResponse>(this.baseUrl + 'deleteAddress.php',{params:params1});
  }
  addAddress(logindata:any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'addAddress.php', logindata);
}
updatepswrd(pswrd:any): Observable<ApiResponse> 
{
  return this.http.post<ApiResponse>(this.baseUrl + 'updatePswrd.php', pswrd);

}
}
