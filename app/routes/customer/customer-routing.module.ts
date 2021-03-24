import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomersInfoComponent } from './component/customers-info/customers-info.component';
import { PotentailcustomerInfoComponent } from './component/potentailcustomer-info/potentailcustomer-info.component';
import { FollowUpRecordListComponent } from './component/follow-up-record-list/follow-up-record-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    data: {
      titleI18n: 'crm:customerlist',
      reuse: true,
    },
  },
  {
    path: 'customerdetails/:id',
    component: CustomersInfoComponent,
    data: {
      titleI18n: 'crm:customerdetails',
      reuse: true,
    },
  },
  {
    path: 'followuprecord/:id',
    component: FollowUpRecordListComponent,
    data: {
      titleI18n: 'crm:Follow up record',
      reuse: true,
    },
  },
  {
    path: 'potentailcustomerdetails/:id',
    component: PotentailcustomerInfoComponent,
    data: {
      titleI18n: 'crm:customerdetails',
      reuse: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {
}
