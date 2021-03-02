import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './component-old/customer-details/customer-details.component';
import { ShareDetailsComponent } from './component-old/shared-details/shared-details.component';
import { NodealDetailComponent } from './component-old/nodeal-detail/nodeal-detail.component';
import { UnownedDetailComponent } from './component-old/unowned-detial/unowned-detial.component';
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
  {
    path: 'nodealdetial/:id',
    component: NodealDetailComponent,
    data: {
      titleI18n: 'crm:nodealdetial',
      reuse: true,
    },
  },
  {
    path: 'unowndetial/:id',
    component: UnownedDetailComponent,
    data: {
      titleI18n: 'crm:unowndetial',
      reuse: true,
    },
  },
  {
    path: 'shareddetial/:id',
    component: ShareDetailsComponent,
    data: {
      titleI18n: 'crm:shareddetial',
      reuse: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
