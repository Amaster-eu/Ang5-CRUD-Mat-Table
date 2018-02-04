import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatGridListModule,
} from '@angular/material';

import { HomeComponent } from './home.component';
import { DialogDeleteComponent } from './dialog.delete.component';

@NgModule({
  declarations: [
    HomeComponent,
    DialogDeleteComponent,
  ],
  entryComponents: [
    DialogDeleteComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatGridListModule,
  ]
})
export class HomeModule {
}
