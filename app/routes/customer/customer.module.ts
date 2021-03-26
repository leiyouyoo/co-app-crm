import { NgModule } from '@angular/core';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { SharedModule } from '../../shared';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { CustomerPartnerComponent } from './component/customer-partner/customer-partner.component';
import { PartnerBindCustomerComponent } from './component/customer-partner/partner-bind-customer/partner-bind-customer.component';
import { CustomerIndexComponent } from './customer-index.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerLifeCyclePipe } from './pipe/customer-life-cycle.pipe';

// tslint:disable-next-line:import-blacklist
import { CoCascaderModule, NetworkSharedModule } from '@co/cbc';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { ContactDetailComponent } from './component/contact/contact-detail/contact-detail.component';
import { ContactListComponent } from './component/contact/contact-list/contact-list.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { HighSeasPondCustomerComponent } from './component/customer-list/high-seas-pond-customer/high-seas-pond-customer.component';
import { CreatePotentialCustomerComponent } from './component/customer-list/potential-customers/create-potential-customer/create-potential-customer.component';
import { PotentialCustomersComponent } from './component/customer-list/potential-customers/potential-customers.component';
import { TransactedCustomersComponent } from './component/customer-list/transacted-customers/transacted-customers.component';
import { CustomerDetailComponent } from './component/customers-info/customer-detail/customer-detail.component';
import { CustomersInfoComponent } from './component/customers-info/customers-info.component';
import { DistributionCustomerComponent } from './component/distribution-customer/distribution-customer.component';
import { LocationDetailComponent } from './component/location/location-detail/location-detail.component';
import { LocationListComponent } from './component/location/location-list/location-list.component';
import { PotentailcustomerDetailComponent } from './component/potentailcustomer-info/potentailcustomer-detail/potentailcustomer-detail.component';
import { PotentailcustomerInfoComponent } from './component/potentailcustomer-info/potentailcustomer-info.component';
import { TransferTocustomerComponent } from './component/transfer-tocustomer/transfer-tocustomer.component';
import { HighlightPipe } from './pipe/heightLight';

import { ApplyChangePhoneComponent } from './component/apply-change-phone/apply-change-phone.component';
import { ApplyCodeComponent } from './component/apply-code/apply-code.component';
import { AttachmentListComponent } from './component/attachment-list/attachment-list.component';
import { AttachmentTypeComponent } from './component/attachment-list/attachment-type/attachment-type.component';
import { BindLocationComponent } from './component/contact/bind-location/bind-location.component';
import { CspAccountConfigComponent } from './component/csp-account-config/csp-account-config.component';
import { CreateTransactedCustomersComponent } from './component/customer-list/transacted-customers/create-transacted-customers/create-transacted-customers.component';
import { FollowUpRecordListComponent } from './component/follow-up-record-list/follow-up-record-list.component';
import { FollowUpRecordComponent } from './component/follow-up-record/follow-up-record.component';
import { InvoiceDetailComponent } from './component/invoice/invoice-detail/invoice-detail.component';
import { InvoiceListComponent } from './component/invoice/invoice-list/invoice-list.component';
import { BindContactsComponent } from './component/location/bind-contacts/bind-contacts.component';
import { MergeCustomerComponent } from './component/merge-customer/merge-customer.component';
import { OrganizationListComponent } from './component/organization/organization-list/organization-list.component';
import { ScheduleListComponent } from './component/schedule/schedule-list/schedule-list.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { UpdateCustomerNameComponent } from './component/update-customer-name/update-customer-name.component';

const COMPONENTS = [LocationListComponent, CustomerPartnerComponent, PartnerBindCustomerComponent];

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
  InvoiceListComponent,
  InvoiceDetailComponent,
  AttachmentListComponent,
  ScheduleComponent,
  ScheduleListComponent,
  OrganizationListComponent
];

const COMPONENTS_NOROUNT = [
  CreatePotentialCustomerComponent,
  DistributionCustomerComponent,
  ApplyCodeComponent,
  MergeCustomerComponent,
  UpdateCustomerNameComponent,
  TransferTocustomerComponent,
  AttachmentTypeComponent,
];

@NgModule({
  imports: [
    SharedModule,
    NzResizableModule,
    CustomerRoutingModule,
    NzDividerModule,
    CoCascaderModule,
    NzAnchorModule,
    NzNoAnimationModule,
    NetworkSharedModule,
    NzEmptyModule
  ],
  declarations: [
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
    FollowUpRecordListComponent,
    ApplyChangePhoneComponent,
    ScheduleComponent,
    ScheduleListComponent,
  ],
  entryComponents: COMPONENTS_NOROUNT,
})
// @ts-ignore
export class CustomerModule {
}
