import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';

import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatDialog,
} from '@angular/material';

import { GithubService } from '../services/github.service';
import { DialogDeleteComponent } from './dialog.delete.component';
import { environment } from '../../environments/environment';

@Component({
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  // Mat-Table
  displayedColumns = ['id', 'name', 'description', 'html_url', 'language', 'actions'];
  dataSource = new MatTableDataSource();
  data: Object;
  dataFilter = '';
  // State Mat-Table
  isLoading = true;
  isRateLimit = false;
  resultsLength = 0;
  // Modal: Delete
  deleteId = 0;
  /* Select: Filter 2 */
  selectedValue = '';
  selects = [
    {viewValue: 'None'},
    {value: 'HTML', viewValue: 'HTML'},
    {value: 'JavaScript', viewValue: 'JavaScript'},
    {value: 'CSS', viewValue: 'CSS'}
  ];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private githubService: GithubService,
              private router: Router,
              public dialog: MatDialog) {
  }

  filter() {
    this.dataFilter = this.selectedValue;
    this.getData();
  }

  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    if (!this.paginator.pageSize) {
      this.paginator.pageSize = 5;
    }
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.getData();
      this.paginator.pageIndex = this.githubService.paginate; // calls the getter
    }, 50);
  }

  getData() {
    // TODO: Get Items
    if (environment.useMockApi) {
      // Server Fake -- GitHub API service
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoading = true;
            return this.githubService.getItems(
              this.dataFilter,
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginator.pageSize
            );
          }),
          map(resp => {
            // Pagination Server-Side
            this.resultsLength = resp.total_count;
            // Flip flag to show that loading has finished.
            this.isLoading = false;
            this.isRateLimit = false;
            return resp.items;
          }),
          catchError(() => {
            this.isLoading = false;
            // Catch if the GitHub API has reached its rate limit. Return empty data.
            this.isRateLimit = true;
            return observableOf([]);
          })
        ).subscribe(resp => this.dataSource.data = resp);
    } else {
      // Server Real -- Localhost
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoading = true;
            return this.githubService.getItems(
              this.dataFilter,
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginator.pageSize);
          }),
          map(resp => {
            // Pagination Client-Side: Table
            this.dataSource.paginator = this.paginator;
            // Flip flag to show that loading has finished.
            this.isLoading = false;
            this.isRateLimit = false;
            return resp;
          }),
          catchError(() => {
            this.isLoading = false;
            // Catch if the GitHub API has reached its rate limit. Return empty data.
            this.isRateLimit = true;
            return observableOf([]);
          })
        ).subscribe(resp => this.dataSource.data = resp);
    }
  }

  handleView(id: number) {
    this.router.navigate(['/view', id]);
    // Move to current pagination page
    this.githubService.paginate = this.paginator.pageIndex; // calls the setter
  }

  handleAdd() {
    this.router.navigate(['/add']);
    if (!environment.useMockApi) {
      // Move to last pagination page
      this.githubService.paginate = Math.ceil(this.paginator.length / this.paginator.pageSize); // calls the setter
    }
  }

  handleEdit(id: number) {
    this.router.navigate(['/edit', id]);
    // Move to current pagination page
    // this.githubService.paginate = this.paginator.pageIndex; // calls the setter
  }

  handleDelete(id: number): void {
    this.deleteId = id;
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {deleteId: id}
    });
    // Move to current pagination page
    this.githubService.paginate = this.paginator.pageIndex; // calls the setter
  }

  refresh() {
    this.applyFilter('');
    this.selectedValue = '';
    this.dataFilter = '';
    this.ngAfterViewInit();
  }
}
