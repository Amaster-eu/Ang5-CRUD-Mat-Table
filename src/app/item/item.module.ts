import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatDialogModule,
  MatInputModule,
  MatDatepickerModule,
} from '@angular/material/';

import { ItemComponent } from './item.component';
import { ItemFormComponent } from './item-form.component';
import { ItemViewComponent } from './item-view.component';

import { ItemRoutingModule } from './item-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ItemRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  declarations: [
    ItemComponent,
    ItemFormComponent,
    ItemViewComponent,
  ]
})
export class ItemModule {
}
