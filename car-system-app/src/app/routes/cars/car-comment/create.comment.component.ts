import { Component } from "@angular/core";
import { CommentModel } from '../../../models/comment.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CarActions } from '../../../actions/cars.actions';

@Component({
  templateUrl: './create.comment.component.html'
})

export class CommentComponent {
  paramId: string;
  paramPage: string;
  constructor(
    private carActions: CarActions,
    private route: ActivatedRoute) {
      this.paramId = this.route.snapshot.paramMap.get('id');
      this.paramPage = this.route.snapshot.paramMap.get('page');
    }
  addComment(formValues: FormData) {
    this.carActions.addComment(formValues, this.paramId, this.paramPage)
  }
}