import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDetailsComponent } from './component/customer-details/customer-details.component';
import { ContactsListComponent } from './component/contact/contacts-list/contacts-list.component';
import { LocationListComponent } from './component/location/location-list/location-list.component';
import { CustomerPartnerComponent } from './component/customer-partner/customer-partner.component';
import { PartnerBindCustomerComponent } from './component/partner-bind-customer/partner-bind-customer.component';
import { PartnerDetailsComponent } from './component/partner-details/partner-details.component';
import { TransferTocustomerComponent } from './component/transfer-tocustomer/transfer-tocustomer.component';
import { CustomerLifeCyclePipe } from './pipe/customer-life-cycle.pipe';
import { CustomerSourceComponent } from './component/customer-source/customer-source.component';
import { RelationPositionComponent } from './component/relation-position/relation-position.component';
import { CreateContactsComponent } from './component/contact/create-contacts/create-contacts.component';
import { CreateLocationComponent } from './component/location/create-location/create-location.component';
import { RelationContactComponent } from './component/relation-contact/relation-contact.component';
import { ShareDetailsComponent } from './component/shared-details/shared-details.component';
import { UnownedDetailComponent } from './component/unowned-detial/unowned-detial.component';
import { NodealDetailComponent } from './component/nodeal-detail/nodeal-detail.component';
import { CustomerIndexComponent } from './customer-index.component';
import { CustomerAuthComponent } from './component/customer-auth/customer-auth.component';
import { CustomerRecordComponent } from './component/customer-record/customer-record.component';
import { ShowImageComponent } from './component/customer-record/show-image/show-image.component';
import { CustomerComponent } from './customer-list/customer.component';
import { NoDealCustomerComponent } from './customer-list/no-deal-customer/no-deal-customer.component';
import { UnownedClientComponent } from './customer-list/unowned-client/unowned-client.component';
import { SharedCustomersComponent } from './customer-list/shared-customers/shared-customers.component';
import { CustomerMergeComponent } from './component/customer-merge/customer-merge.component';
import { LegalEntityComponent } from './component/legal-entity/legal-entity.component';
import { NzResizableModule } from 'ng-zorro-antd/resizable';

const COMPONENTS = [
  CustomerComponent,
  NoDealCustomerComponent,
  NoDealCustomerComponent,
  CustomerDetailsComponent,
  ContactsListComponent,
  LocationListComponent,
  CustomerAuthComponent,
  CustomerRecordComponent,
  CustomerPartnerComponent,
  PartnerBindCustomerComponent,
  CreateContactsComponent,
  CreateLocationComponent,
  ShareDetailsComponent,
  UnownedDetailComponent,
  NodealDetailComponent,
  RelationContactComponent,
  CustomerMergeComponent,

  // RecordEditComponent,
  ShowImageComponent,

  LegalEntityComponent,
];
const COMPONENTS_NOROUNT = [LegalEntityComponent];

@NgModule({
  imports: [SharedModule, NzResizableModule, CustomerRoutingModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    PartnerDetailsComponent,
    TransferTocustomerComponent,
    CustomerLifeCyclePipe,
    CustomerSourceComponent,
    RelationPositionComponent,
    UnownedClientComponent,
    SharedCustomersComponent,
    CustomerIndexComponent,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
export class CustomerModule {}
