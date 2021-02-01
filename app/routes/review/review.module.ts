import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list/review-list.component';
import { ReviewRoutingModule } from './review-routing.module';
import { SharedModule } from '../../shared';

@NgModule({
  declarations: [ReviewListComponent],
  imports: [ReviewRoutingModule, CommonModule, SharedModule],
})
export class ReviewModule {}
