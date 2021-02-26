import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDetailsComponent } from './component-old/customer-details/customer-details.component';
import { ContactsListComponent } from './component-old/contact/contacts-list/contacts-list.component';
import { CustomerPartnerComponent } from './component-old/customer-partner/customer-partner.component';
import { PartnerBindCustomerComponent } from './component-old/partner-bind-customer/partner-bind-customer.component';
import { PartnerDetailsComponent } from './component-old/partner-details/partner-details.component';
import { TransferTocustomerComponent } from './component-old/transfer-tocustomer/transfer-tocustomer.component';
import { CustomerLifeCyclePipe } from './pipe/customer-life-cycle.pipe';
import { CustomerSourceComponent } from './component-old/customer-source/customer-source.component';
import { RelationPositionComponent } from './component-old/relation-position/relation-position.component';
import { CreateContactsComponent } from './component-old/contact/create-contacts/create-contacts.component';
import { CreateLocationComponent } from './component-old/location/create-location/create-location.component';
import { RelationContactComponent } from './component-old/relation-contact/relation-contact.component';
import { ShareDetailsComponent } from './component-old/shared-details/shared-details.component';
import { UnownedDetailComponent } from './component-old/unowned-detial/unowned-detial.component';
import { NodealDetailComponent } from './component-old/nodeal-detail/nodeal-detail.component';
import { CustomerIndexComponent } from './customer-index.component';
import { CustomerAuthComponent } from './component-old/customer-auth/customer-auth.component';
import { CustomerRecordComponent } from './component-old/customer-record/customer-record.component';
import { ShowImageComponent } from './component-old/customer-record/show-image/show-image.component';
import { CustomerComponent } from './customer-list/customer.component';
import { NoDealCustomerComponent } from './customer-list/no-deal-customer/no-deal-customer.component';
import { UnownedClientComponent } from './customer-list/unowned-client/unowned-client.component';
import { SharedCustomersComponent } from './customer-list/shared-customers/shared-customers.component';
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
import { CreatePotentialCustomerComponent } from './component/customer-list/potential-customers/create-potential-customer/create-potential-customer.component';
import { HighlightPipe } from './pipe/heightLight';
import { CoCascaderModule } from '@co/cbc';
// const COMPONENTS = [
//   CustomerComponent,
//   NoDealCustomerComponent,
//   NoDealCustomerComponent,
//   CustomerDetailsComponent,
//   ContactsListComponent,
//   LocationListComponent,
//   CustomerAuthComponent,
//   CustomerRecordComponent,
//   CustomerPartnerComponent,
//   PartnerBindCustomerComponent,
//   CreateContactsComponent,
//   CreateLocationComponent,
//   ShareDetailsComponent,
//   UnownedDetailComponent,
//   NodealDetailComponent,
//   RelationContactComponent,
//   CustomerMergeComponent,

//   // RecordEditComponent,
//   ShowImageComponent,

//   LegalEntityComponent,
// ];

const NEWCOMPONENTS = [
  CustomerListComponent,
  TransactedCustomersComponent,
  PotentialCustomersComponent,
  CustomersInfoComponent,
  ContactListComponent,
  LocationListComponent,
  CustomerDetailComponent,
  ContactDetailComponent,
];
const COMPONENTS_NOROUNT = [LegalEntityComponent,CreatePotentialCustomerComponent];

@NgModule({
  imports: [SharedModule, NzResizableModule, CustomerRoutingModule,CoCascaderModule],
  declarations: [
    // ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    ...NEWCOMPONENTS,
    PartnerDetailsComponent,
    TransferTocustomerComponent,
    CustomerLifeCyclePipe,
    CustomerSourceComponent,
    RelationPositionComponent,
    UnownedClientComponent,
    SharedCustomersComponent,
    CustomerIndexComponent,
    HighlightPipe
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class CustomerModule {}
