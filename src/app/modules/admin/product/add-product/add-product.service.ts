import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { InventoryProduct } from '../../../../Model/inventory.types';
import { ApiResponse } from 'app/Model/api-response';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AddProductService {
    private _products: BehaviorSubject<InventoryProduct[] | null> =
        new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) {}

    /**
     * Create product
     */
    addProduct(product: InventoryProduct): Observable<any> {
        return this._httpClient.post<any>(
            '/api/products/addProduct.php',
            product
        );
    }

    // getCategories(): Observable<any> {
    //     return this._httpClient.get('/api/mobileAPI/getCategory.php');
    // }

    // getSubCategory(): Observable<any> {
    //     return this._httpClient.get('/api/mobileAPI/getSubCategory.php');
    // }

    getSubCategory(): any {
        return this._httpClient
            .get('/api/mobileAPI/getSubCategory.php')
            .pipe(catchError(this.handleError));
    }

    getCategories(): Observable<any> {
        return this._httpClient
            .get('/api/mobileAPI/getCategory.php')
            .pipe(catchError(this.handleError));
    }

    // getSubCategory(category: string) {
    //     return this._httpClient
    //         .get('/api/mobileAPI/getSubCategory.php?category=' + category)
    //         .pipe(catchError(this.handleError));
    // }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                    `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened. Please try again later.');
    }

    getBrand(): Observable<any> {
        return this._httpClient.get('/api/mobileAPI/getBrand.php');
    }

    getProductType(): Observable<any> {
        return this._httpClient.get('/api/mobileAPI/getProductType.php');
    }

    getProductSubType(): Observable<any> {
        return this._httpClient.get('/api/mobileAPI/getProductSubType.php');
    }

    /**
     * Create Category
     */
    addCategory(category): Observable<any> {
        return this._httpClient.post<any>(
            '/api/products/addCategory.php',
            category
        );
    }

    createBrand(brand): Observable<any> {
        return this._httpClient.post<any>('/api/products/addBrand.php', brand);
    }

    /**
     * Create Category
     */
    addProductType(productType): Observable<any> {
        return this._httpClient.post<any>(
            '/api/products/addProductType.php',
            productType
        );
    }
}
