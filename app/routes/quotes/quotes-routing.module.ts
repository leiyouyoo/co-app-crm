import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquiryComponent } from './component/inquiry/inquiry.component';
import { InquirydetailComponent } from './component/inquirydetail/inquirydetail.component';
import { QuotesIndexComponent } from './quotes-index.component';

const routes: Routes = [
  {
    path: '',
    component: InquiryComponent,
    data: {
      titleI18n: 'crm:quoteslist',
      reuse: true,
    },
  },
  {
    path: 'quotesDetail/:id',
    component: InquirydetailComponent,
    data: {
      titleI18n: 'crm:Inquiry list',
      reuse: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotesRoutingModule {}
