import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquiryComponent } from './component/inquiry/inquiry.component';
import { InquirydetailComponent } from './component/inquirydetail/inquirydetail.component';
import { QuotesIndexComponent } from './quotes-index.component';
import { initiativeCreatequotesComponent } from './component/initiativecreatequotes/initiativecreatequotes.component';

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
    path: 'create-quote',
    component: initiativeCreatequotesComponent,
    data: {
      titleI18n: 'crm:Add Quotes',
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
