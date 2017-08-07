import { Component } from "@angular/core";
import { CommentModel } from '../../../models/comment.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CarsService } from '../../../services/cars.service';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from '../../../services/common/toastr.service';
@Component({
  templateUrl: './create.comment.component.html'
})

export class CommentComponent {
  comment: Comment
  paramId: string;
  paramPage: string;
  constructor(
    private carService: CarsService,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute) {
      this.paramId = this.route.snapshot.paramMap.get('id');
      this.paramPage = this.route.snapshot.paramMap.get('page');
    }
  createComment(formValues: FormData) {
    const author = this.authService.getUser().name;
    formValues['author'] = author;
    this.carService
      .createComment(formValues, this.paramId)
      .then(response => {
        this.toastrService.success(response['message']);
        this.router.navigate([`cars/details/${this.paramPage}/${this.paramId}`]);
      })
      .catch(err=> {
          console.log(err)
        this.toastrService.error(err || 'Sorry but unknown failure occured!');
        if (err === 'Unauthorized') {
          this.router.navigate(['users/login']);
        }
      })
  }
}