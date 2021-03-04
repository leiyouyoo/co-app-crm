import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomersInfoComponent } from './component/customers-info/customers-info.component';
import { PotentailcustomerInfoComponent } from './component/potentailcustomer-info/potentailcustomer-info.component';

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
export class CustomerRoutingModule {}
