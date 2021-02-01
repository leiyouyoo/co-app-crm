import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewListComponent } from './review-list/review-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ReviewListComponent,
    data: {
      titleI18n: 'crm:reviewList',
      reuse: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewRoutingModule {}
