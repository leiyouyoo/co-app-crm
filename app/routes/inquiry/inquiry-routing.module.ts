import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquiryListComponent } from './inquiry-list/inquiry-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: InquiryListComponent,
    data: {
      breadcrumb: 'Inquiry list',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquiryRoutingModule {}
