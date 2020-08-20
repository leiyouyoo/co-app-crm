import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedLibraryModule } from '../../shared-library.module';
import { PackingListComponent } from './packing-list/packing-list.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NetworkSharedModule } from '../network/network-shared.module';

@NgModule({
  declarations: [CreateBookingComponent, PackingListComponent],
  imports: [CommonModule, FormsModule, NgZorroAntdModule, TranslateModule, SharedLibraryModule, NetworkSharedModule],
  exports: [CreateBookingComponent, PackingListComponent],
})
export class BookingSharedModule {}

export * from './create-booking/create-booking.component';
export * from './packing-list/packing-list.component';
