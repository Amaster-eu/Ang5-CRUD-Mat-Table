import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemComponent } from './item.component';
import { ItemFormComponent } from './item-form.component';
import { ItemViewComponent } from './item-view.component';

const routes: Routes = [
  {path: '', component: ItemComponent, pathMatch: 'full'},
  // {path: 'paginate/:p', component: ItemComponent, pathMatch: 'full'},
  {path: 'add', component: ItemFormComponent, pathMatch: 'full'},
  {path: 'edit/:id', component: ItemFormComponent, pathMatch: 'full'},
  {path: 'view/:id', component: ItemViewComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule {
}
