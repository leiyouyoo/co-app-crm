import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingComponent } from './component/booking/booking.component';
import { BookingIndexComponent } from './booking-index.component';
import { BookingdetailComponent } from './component/bookingdetail/bookingdetail.component';
import { CreateBookingComponent } from '../../shared/compoents/booking/create-booking/create-booking.component';
import { CanDeactivateGuard } from './route-guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'bookinglist', pathMatch: 'full' },
  {
    path: 'bookinglist',
    component: BookingIndexComponent,
    data: {
      breadcrumb: 'Booking',
    },

    children: [
      {
        path: '',
        component: BookingComponent,
      },
      {
        path: 'bookingDetail/:id',
        component: BookingdetailComponent,
        data: {
          breadcrumb: 'Booking detial',
        },
      },
    ],
  },
  {
    path: 'createBooking',
    component: CreateBookingComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
