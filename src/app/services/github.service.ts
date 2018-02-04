import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { GithubModel, GithubModelFake } from '../models/github.model';

@Injectable()
export class GithubService {
  public API_URL = '';
  public ITEMS_URL = '';

  // Get/Set Methods
  // https://stackoverflow.com/questions/12827266/get-and-set-in-typescript
  private _paginate: number;
  public get paginate(): number {
    return this._paginate;
  }

  public set paginate(value: number) {
    this._paginate = value;
  }

  constructor(private http: HttpClient) {
  }

  // Server Fake -- GitHub API service
  // start server =========================== also see home.component.ts:94
  // public getItems(filter: string, sort: string, order: string, page: number, limit: number): Observable<any> {
  //   this.API_URL = 'https://api.github.com/search/repositories';
  //   this.ITEMS_URL = '';
  //   // {
  //   // "total_count": 1000,
  //   //   "incomplete_results": false,
  //   //   "items": [
  //   //      {
  //   //        "id": 1,
  //   //        ...
  //   const params: string = [
  //     `q=repo:+language:` + filter,
  //     `sort=` + sort,
  //     `order=` + order,
  //     `page=` + (page + 1),
  //     `per_page=` + limit
  //   ].join('&');

    // Server Real -- Localhost DB: ./src/assets/db/github.json
    // start server ===========================
    public getItems(filter: string, sort: string, order: string, page: number, limit: number): Observable<GithubModel[]> {
      this.API_URL = 'http://localhost:3000';
    this.ITEMS_URL = '/items';
    // {
    //   "items": [
    //      {
    //        "id": 1,
    //        ...
    const params: string = [].join('&');

    // end server ============================

    let requestUrl = `${this.API_URL}${this.ITEMS_URL}`;
    if (params) {
      requestUrl += `?${params}`;
    }
    return this.http.get(requestUrl)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  public getItem(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}${this.ITEMS_URL}/${id}`);
  }

  public addItem(item: GithubModel): Observable<any> {
    return this.http.post(`${this.API_URL}${this.ITEMS_URL}`, item);
  }

  public editItem(item: GithubModel): Observable<any> {
    return this.http.post(`${this.API_URL}${this.ITEMS_URL}`, item);
  }

  public deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}${this.ITEMS_URL}/${id}`);
  }
}




