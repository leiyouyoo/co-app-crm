import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './component/booking/booking.component';
import { BookingdetailComponent } from './component/bookingdetail/bookingdetail.component';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingIndexComponent } from './booking-index.component';
import { QuoteCommmonModule } from '../quotes/quote-commmon.module';
import { bookingCreatequotesComponent } from './component/createquotes/bookingcreatequotes.component';
import { QuoteRecorddetailComponent } from './component/quote-recorddetail/quote-recorddetail.component';
import { UpdatequotesComponent } from './component/updatequotes/updatequotes.component';
import { PackingListComponent } from './component/packing-list/packing-list.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared';

const component = [
  BookingComponent,
  BookingdetailComponent,
  BookingIndexComponent,
  bookingCreatequotesComponent,
  UpdatequotesComponent,
  QuoteRecorddetailComponent,
  PackingListComponent,
];

@NgModule({
  declarations: [...component],
  imports: [SharedModule, BookingRoutingModule, QuoteCommmonModule, CommonModule, FormsModule, TranslateModule],
  exports: [...component],
})
export class BookingModule {}
