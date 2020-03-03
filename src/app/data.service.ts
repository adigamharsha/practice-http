import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { AppError } from 'src/common/apperror';
import { throwError } from 'rxjs';
// import 'rxjs/observable/throw';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private apiEndPoint: string, private http: HttpClient) { }

    getAll() {
        return this.http.get(this.apiEndPoint).pipe(map(response => response));
    }

    post(data) {
        return this.http.post(this.apiEndPoint, JSON.stringify(data)).pipe(map(response => response));
    }

    Update(post: HTMLInputElement) {
        return this.http.put(this.apiEndPoint + '/' + post.id, JSON.stringify(post)).pipe(map(response => response));
    }

    Delete(post: HTMLInputElement) {
        // return throwError(new AppError());
         return this.http.delete(this.apiEndPoint + '/' + post.id).pipe(map(response => response));
    }
}
