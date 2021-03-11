import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerPartnerComponent } from './component/customer-partner/customer-partner.component';
import { PartnerBindCustomerComponent } from './component/customer-partner/partner-bind-customer/partner-bind-customer.component';
import { CustomerLifeCyclePipe } from './pipe/customer-life-cycle.pipe';
import { CustomerIndexComponent } from './customer-index.component';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { TransactedCustomersComponent } from './component/customer-list/transacted-customers/transacted-customers.component';
import { PotentialCustomersComponent } from './component/customer-list/potential-customers/potential-customers.component';
import { CustomersInfoComponent } from './component/customers-info/customers-info.component';
import { ContactListComponent } from './component/contact/contact-list/contact-list.component';
import { LocationListComponent } from './component/location/location-list/location-list.component';
import { CustomerDetailComponent } from './component/customers-info/customer-detail/customer-detail.component';
import { ContactDetailComponent } from './component/contact/contact-detail/contact-detail.component';
import { LocationDetailComponent } from './component/location/location-detail/location-detail.component';
import { CreatePotentialCustomerComponent } from './component/customer-list/potential-customers/create-potential-customer/create-potential-customer.component';
import { HighlightPipe } from './pipe/heightLight';
import { CoCascaderModule } from '@co/cbc';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { HighSeasPondCustomerComponent } from './component/customer-list/high-seas-pond-customer/high-seas-pond-customer.component';
import { PotentailcustomerInfoComponent } from './component/potentailcustomer-info/potentailcustomer-info.component';
import { PotentailcustomerDetailComponent } from './component/potentailcustomer-info/potentailcustomer-detail/potentailcustomer-detail.component';
import { DistributionCustomerComponent } from './component/distribution-customer/distribution-customer.component';
import { TransferTocustomerComponent } from './component/transfer-tocustomer/transfer-tocustomer.component';

import { CreateTransactedCustomersComponent } from './component/customer-list/transacted-customers/create-transacted-customers/create-transacted-customers.component';
import { ApplyCodeComponent } from './component/apply-code/apply-code.component';
import { MergeCustomerComponent } from './component/merge-customer/merge-customer.component';
import { UpdateCustomerNameComponent } from './component/update-customer-name/update-customer-name.component';
import { CspAccountConfigComponent } from './component/csp-account-config/csp-account-config.component';
import { BindLocationComponent } from './component/contact/bind-location/bind-location.component';
import { BindContactsComponent } from './component/location/bind-contacts/bind-contacts.component';
import { FollowUpRecordComponent } from './component/follow-up-record/follow-up-record.component';
const COMPONENTS = [
  LocationListComponent,
  CustomerPartnerComponent,
  PartnerBindCustomerComponent,
];

const NEWCOMPONENTS = [
  CustomerListComponent,
  TransactedCustomersComponent,
  PotentialCustomersComponent,
  CustomersInfoComponent,
  ContactListComponent,
  LocationListComponent,
  CustomerDetailComponent,
  ContactDetailComponent,
  LocationDetailComponent,
  PotentailcustomerInfoComponent,
  PotentailcustomerDetailComponent,
  CreateTransactedCustomersComponent,
  BindLocationComponent,
  BindContactsComponent,
];

const COMPONENTS_NOROUNT = [CreatePotentialCustomerComponent,
  DistributionCustomerComponent, ApplyCodeComponent, MergeCustomerComponent, UpdateCustomerNameComponent,TransferTocustomerComponent];

@NgModule({
  imports: [SharedModule,NzDividerModule, NzResizableModule, CustomerRoutingModule, CoCascaderModule, NzAnchorModule,NzNoAnimationModule],
  declarations: [
    // ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    ...NEWCOMPONENTS,
    ...COMPONENTS,
    TransferTocustomerComponent,
    CustomerLifeCyclePipe,
    CustomerIndexComponent,
    HighlightPipe,
    HighSeasPondCustomerComponent,
    CspAccountConfigComponent,
    FollowUpRecordComponent,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class CustomerModule {}
