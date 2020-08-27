import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './component/booking/booking.component';
import { BookingIndexComponent } from './booking-index.component';
import { BookingdetailComponent } from './component/bookingdetail/bookingdetail.component';
import { CreateBookingComponent } from '../../shared/compoents/booking/create-booking/create-booking.component';
import { CanDeactivateGuard } from './route-guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    data: { titleI18n: 'crm:bookinglist', reuse: true },
  },
  {
    path: 'bookingDetail/:id',
    component: BookingdetailComponent,
    data: {
      titleI18n: 'crm:bookingDetail',
      reuse: true,
    },
  },
  {
    path: 'createBooking/:id',
    component: CreateBookingComponent,
    data: { reuse: true, titleI18n: 'crm:createBooking' },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
