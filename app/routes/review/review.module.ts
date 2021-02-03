import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewRoutingModule } from './review-routing.module';
import { SharedModule } from '../../shared';
import { AnswerModalComponent } from './answer-modal/answer-modal.component';

@NgModule({
  declarations: [ReviewListComponent, AnswerModalComponent],
  imports: [ReviewRoutingModule, CommonModule, SharedModule],
})
export class ReviewModule { }
