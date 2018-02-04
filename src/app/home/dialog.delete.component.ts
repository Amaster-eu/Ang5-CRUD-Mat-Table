import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material';

import { GithubService } from '../services/github.service';
import { GithubModel } from '../models/github.model';

@Component({
  selector: 'app-dialog.delete',
  templateUrl: './dialog.delete.component.html'
})
export class DialogDeleteComponent {
  public items: GithubModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public githubService: GithubService) {
  }

  deleteItem(id: number): void {
    // If Server Fake ===========================
    //   this.items.splice(id - 1, 1);

    // If Server Real ===========================
    this.githubService.deleteItem(id).subscribe(
      (resp) => {
      },
      (err) => {
        // TODO: add message
        console.log('dialog.delete.component.ts:33 deleteError', err);
      }
    );
  }
}
