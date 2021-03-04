import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDetailsComponent } from './component-old/customer-details/customer-details.component';
import { ContactsListComponent } from './component-old/contact/contacts-list/contacts-list.component';
import { CustomerPartnerComponent } from './component/customer-partner/customer-partner.component';
import { PartnerBindCustomerComponent } from './component/partner-bind-customer/partner-bind-customer.component';
import { PartnerDetailsComponent } from './component-old/partner-details/partner-details.component';
import { CustomerLifeCyclePipe } from './pipe/customer-life-cycle.pipe';
import { CustomerSourceComponent } from './component-old/customer-source/customer-source.component';
import { RelationPositionComponent } from './component-old/relation-position/relation-position.component';
import { CreateContactsComponent } from './component-old/contact/create-contacts/create-contacts.component';
import { RelationContactComponent } from './component-old/relation-contact/relation-contact.component';
import { ShareDetailsComponent } from './component-old/shared-details/shared-details.component';
import { UnownedDetailComponent } from './component-old/unowned-detial/unowned-detial.component';
import { NodealDetailComponent } from './component-old/nodeal-detail/nodeal-detail.component';
import { CustomerIndexComponent } from './customer-index.component';
import { CustomerAuthComponent } from './component-old/customer-auth/customer-auth.component';
import { CustomerRecordComponent } from './component-old/customer-record/customer-record.component';
import { ShowImageComponent } from './component-old/customer-record/show-image/show-image.component';
import { CustomerMergeComponent } from './component-old/customer-merge/customer-merge.component';
import { LegalEntityComponent } from './component-old/legal-entity/legal-entity.component';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
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
const COMPONENTS = [
  CustomerDetailsComponent,
  ContactsListComponent,
  LocationListComponent,
  CustomerAuthComponent,
  CustomerRecordComponent,
  CustomerPartnerComponent,
  PartnerBindCustomerComponent,
  CreateContactsComponent,
  ShareDetailsComponent,
  UnownedDetailComponent,
  NodealDetailComponent,
  RelationContactComponent,
  CustomerMergeComponent,

  // RecordEditComponent,
  ShowImageComponent,

  LegalEntityComponent,
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
const COMPONENTS_NOROUNT = [
  LegalEntityComponent,
  CreatePotentialCustomerComponent,
  DistributionCustomerComponent,
  ApplyCodeComponent,
  MergeCustomerComponent,
  UpdateCustomerNameComponent,
  TransferTocustomerComponent,
];

@NgModule({
  imports: [SharedModule, NzResizableModule, CustomerRoutingModule, CoCascaderModule, NzAnchorModule],
  declarations: [
    // ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    ...NEWCOMPONENTS,
    ...COMPONENTS,
    PartnerDetailsComponent,
    TransferTocustomerComponent,
    CustomerLifeCyclePipe,
    CustomerSourceComponent,
    RelationPositionComponent,
    CustomerIndexComponent,
    HighlightPipe,
    HighSeasPondCustomerComponent,
    CspAccountConfigComponent,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class CustomerModule {}
