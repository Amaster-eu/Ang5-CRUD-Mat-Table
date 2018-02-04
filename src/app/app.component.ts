import { Component, OnInit } from '@angular/core';

import {HomeComponent} from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Angular 5 CRUD Clarity UI';

  // homeComponent = HomeComponent();

  refresh() {
    console.log('app.component.ts:17 refresh');
    // this.homeComponent.getData();
  }
}
