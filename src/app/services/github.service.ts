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

  constructor(private http: HttpClient) {
  }

  // Server Fake -- GitHub API service
  // start server ===========================
  // public getItems(sort: string, order: string, page: number, limit: number): Observable<any> {
  //   this.API_URL = 'https://api.github.com/search/issues';
  //   this.ITEMS_URL = '';
  //   // {
  //   // "total_count": 9747,
  //   //   "incomplete_results": false,
  //   //   "items": [
  //   //      {
  //   //        "id": 1,
  //   //        ...
  //   const params: string = [
  //     `q=repo:angular/material2`,
  //     `sort=` + '',
  //     `order=` + '',
  //     `page=` + (page + 1),
  //     `per_page=` + limit
  //   ].join('&');

  // Server Real -- Localhost DB: ./src/assets/db/github.json
  // start server ===========================
  public getItems(sort: string, order: string, page: number, limit: number): Observable<GithubModel[]> {
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



