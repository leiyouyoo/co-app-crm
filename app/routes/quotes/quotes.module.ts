import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesRoutingModule } from './quotes-routing.module';
import { SharedModule } from '../../shared';
import { InquiryComponent } from './component/inquiry/inquiry.component';
import { initiativeCreatequotesComponent } from './component/initiativecreatequotes/initiativecreatequotes.component';
import { CreatequotesComponent } from './component/createquotes/createquotes.component';
import { QuotesrecordComponent } from './component/quotesrecord/quotesrecord.component';
import { InquirydetailComponent } from './component/inquirydetail/inquirydetail.component';
// import { ImModule } from '../im/im.module';
import { QuotesIndexComponent } from './quotes-index.component';
import { QuoteCommmonModule } from './quote-commmon.module';
import { HandlequotesComponent } from './component/handlequotes/handlequotes.component';
import { HandlequotesOfCreateComponent } from './component/handlequotes-of-create/handlequotes-of-create.component';

const COMPONENTS = [
  InquiryComponent,
  initiativeCreatequotesComponent,
  CreatequotesComponent,
  QuotesrecordComponent,
  InquirydetailComponent,
  QuotesIndexComponent,
  HandlequotesComponent,
  HandlequotesOfCreateComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  // imports: [QuotesRoutingModule, SharedModule, QuotesRoutingModule, QuoteCommmonModule, ImModule],
  imports: [QuotesRoutingModule, QuoteCommmonModule, QuoteCommmonModule, SharedModule],
  exports: [...COMPONENTS],
})
export class QuotesModule {}
