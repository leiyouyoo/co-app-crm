import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquiryComponent } from './component/inquiry/inquiry.component';
import { InquirydetailComponent } from './component/inquirydetail/inquirydetail.component';
import { QuotesIndexComponent } from './quotes-index.component';

const routes: Routes = [
  { path: '', redirectTo: 'quoteslist', pathMatch: 'full' },
  {
    path: 'quoteslist',
    component: QuotesIndexComponent,
    data: {
      breadcrumb: 'Inquiry list',
      titleI18n: 'frm:Inquiry list',
      reuse: true,
    },
    children: [
      {
        path: '',
        component: InquiryComponent,
      },
      {
        path: 'quotesDetail/:id',
        component: InquirydetailComponent,
        data: {
          breadcrumb: 'Inquiry detial',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}
