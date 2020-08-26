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
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  {
    path: '',
    component: CustomerComponent,
    data: {
      keep: true,
      key: 'customer',
    },
  },
  {
    path: 'customerdetails/:id',
    component: CustomerDetailsComponent,
    data: {
      breadcrumb: 'Cooperation customer detail',
      titleI18n: 'crm:customer',
      reuse: true,
    },
  },
  {
    path: 'nodealdetial/:id',
    component: NodealDetailComponent,
    data: {
      breadcrumb: 'Potential customer detail',
      titleI18n: 'crm:nodealdetial',
      reuse: true,
    },
  },
  {
    path: 'unowndetial/:id',
    component: UnownedDetailComponent,
    data: {
      breadcrumb: 'Unowned customers detail',
      titleI18n: 'crm:unowndetial',
      reuse: true,
    },
  },
  {
    path: 'shareddetial/:id',
    component: ShareDetailsComponent,
    data: {
      breadcrumb: 'Share customers detail',
      titleI18n: 'crm:shareddetial',
      reuse: true,
    },
  },
  {
    path: 'location/:id',
    component: LocationListComponent,
    data: {
      breadcrumb: 'Location detail',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
