import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackingListComponent } from './booking/packing-list/packing-list.component';
import { CreateBookingComponent } from './booking/create-booking/create-booking.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NetworkSharedModule, CoNzSelectExtraModule, CoDatetimeRangePickerModule } from '@co/cbc';

@NgModule({
  declarations: [CreateBookingComponent, PackingListComponent],
  imports: [CommonModule, FormsModule, NgZorroAntdModule, TranslateModule, NetworkSharedModule, CoNzSelectExtraModule, CoDatetimeRangePickerModule],
  exports: [CreateBookingComponent, PackingListComponent, CoDatetimeRangePickerModule],
})
export class BookingSharedModule {}

export * from './booking/create-booking/create-booking.component';
export * from './booking/packing-list/packing-list.component';
