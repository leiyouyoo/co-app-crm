import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailsComponent } from './component/customer-details/customer-details.component';
import { LocationListComponent } from './component/location/location-list/location-list.component';
import { ShareDetailsComponent } from './component/shared-details/shared-details.component';
import { NodealDetailComponent } from './component/nodeal-detail/nodeal-detail.component';
import { CustomerIndexComponent } from './customer-index.component';
import { UnownedDetailComponent } from './component/unowned-detial/unowned-detial.component';
import { CustomerComponent } from './customer-list/customer.component';
const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    data: {
      titleI18n: 'crm:customerlist',
      reuse: true,
    },
  },
  {
    path: 'customerdetails/:id',
    component: CustomerDetailsComponent,
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
  {
    path: 'location/:id',
    component: LocationListComponent,
    data: {
      titleI18n: 'crm:location',
      reuse: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
