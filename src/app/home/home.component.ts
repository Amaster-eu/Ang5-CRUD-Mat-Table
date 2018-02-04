import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material';

import { GithubService } from '../services/github.service';
import { DialogDeleteComponent } from './dialog.delete.component';

@Component({
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // Mat-Table
  displayedColumns = ['id', 'title', 'user.login', 'user.url', 'created_at', 'actions'];
  dataSource = new MatTableDataSource();
  data: Object;
  // State Mat-Table
  isLoading = true;
  isRateLimit = false;
  resultsLength = 0;
  // Modal: Delete
  showDeleteModal = false;
  deleteId = 0;

  editMode = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private githubService: GithubService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    if (!this.paginator.pageSize) {
      this.paginator.pageSize = 5;
    }

    // TODO: Get Items
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoading = true;
          return this.githubService.getItems(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize
          );
        }),
        map(resp => {
          // Pagination on Side Client: Table
          this.dataSource.paginator = this.paginator;

          // Pagination on Side Server
          // this.resultsLength = resp.total_count;

          // Flip flag to show that loading has finished.
          this.isLoading = false;
          this.isRateLimit = false;
          // console.log('home.component.ts 41:loadData', resp);
          return resp;
        }),
        catchError(() => {
          this.isLoading = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimit = true;
          return observableOf([]);
        })
        // For Real Server
      ).subscribe(resp => this.dataSource.data = resp);
    // For Fake Server
    // ).subscribe(resp => this.dataSource.data = resp.items);
  }

  handleView(id: number) {
    this.router.navigate(['/view', id]);
  }

  handleAdd() {
    // const mode = new Mode();
    // mode.editMode = false;   // works set-method
    // this.editMode = false;

    this.router.navigate(['/add']);
  }


  handleEdit(id: number) {
    // const mode = new Mode();
    // mode.editMode = true;   // works set-method
    // console.log(mode.editMode);  // works get-method
    // this.editMode = true;

    this.router.navigate(['/edit', id]);
  }

  handleDelete(id: number): void {
    // this.showDeleteModal = true;
    this.deleteId = id;
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {deleteId: id}
    });
  }


//

//
// reset() {
//   this.loading = true;
//   this.currentPageSize = Number.parseInt(this.options.pageSize);
//   if (this.currentPageSize === 0) {
//     this.currentPageSize = this.totalRecords;
//   }
//
//   if (!this.options.server) {
//     this.optionsLatency = 0;
//   } else {
//     this.optionsLatency = Number.parseInt(this.options.latency);
//     this.items = [];
//   }
//
//   // Timeout hack to make sure we completely reset the DataGrid
//   setTimeout(() => {
//     // this.getAllItems(1, this.currentPageSize);
//     this.getAllItems();
//     this.paginate(this.currentPage);
//     this.loading = false;
//   }, this.optionsLatency);
// }
//
// handleConfirmDelete() {
//
// }
//
// handleCancelDelete() {
//
// }
}

// Get/Set Methods
class Mode {
  private _editMode?: boolean;

  public get editMode(): boolean {
    return this._editMode;
  }

  public set editMode(value: boolean) {
    this._editMode = value;
  }
}


// public set editMode(value: boolean) {
//   this._editMode = value;
// }
// set editMode(value) {
//   this._editMode = false;
// }

// get editMode() {
//   return this._editMode;
// }

