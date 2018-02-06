import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* Material UI */
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
  MatDatepickerModule,
  MatSnackBarModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { GithubService } from './services/github.service';

import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { ItemModule } from './item/item.module';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
  ],
  entryComponents: [],
  imports: [
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
    MatDatepickerModule,
    MatSnackBarModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    ItemModule,
  ],
  providers: [
    GithubService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
