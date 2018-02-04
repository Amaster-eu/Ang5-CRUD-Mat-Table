import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { GithubModel } from '../models/github.model';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'app-item-view',
  templateUrl: './item-view.component.html',
  styles: [
    '.mat-card-avatar { height: 80px; width: 80px; margin-bottom: 12px; }',
    'img { width: 100%; border-radius: 50%; }'
  ]
})
export class ItemViewComponent implements OnInit {
  public item: GithubModel;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private githubService: GithubService) {
  }

  ngOnInit() {
    // TODO: Reading the parameters on the command line
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        console.log('item-view.component.ts:27 getItem', params.id);
        this.getData(params.id);
      }
    );
  }

  getData(id) {
    this.githubService.getItem(id).subscribe(
      (resp) => {
        this.item = resp;
      },
      (err) => {
        // TODO: add message
        console.log('item-view.component.ts:40 viewError', err);
      }
    );
  }

  handleCancel() {
    this.router.navigate(['']);
  }
}
