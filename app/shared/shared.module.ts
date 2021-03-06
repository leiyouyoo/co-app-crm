import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoACLModule } from '@co/acl';
import { CoConfigManager } from '@co/core';
import { CoCommonModule } from '@co/common';
import { CoFormModule } from '@co/form';

import { SHARED_CO_MODULES } from './shared-co.module';
import { SHARED_ZORRO_MODULES } from './shared-zorro.module';

// #region 第三方库
import { CountdownModule } from 'ngx-countdown';
import { DragulaModule } from 'ng2-dragula';

const THIRDMODULES = [CountdownModule, DragDropModule];
// #endregion

// #region 自定义组件和指令
import { environment } from '../../environments/environment';
import { debounceInputDirective } from './directives/debounce-Input.directive';
import { EnterKeydownDirective } from './directives/enter-keydown.directive';
import { NzOptionExtraChangeDirective } from './directives/nz-option-extra-change.directive';
import { OptionsGroupValueDirective } from './directives/options-group-value.directive';
import { ApplyCusCodeComponent } from './compoents/customer/apply-cus-code/apply-cus-code.component';
import { CreateCustomerComponent } from './compoents/customer/create-customer/create-customer.component';
import { NzOptionExtraDirective } from './directives/nz-option-extra.directive';
import { MouseMoveDirective } from './directives/mouse-move.directive';

import { CalcNzTableBodyScrollDirective } from './directives/calc-nz-table-body-scroll.directive';
import { RecordEditComponent } from './compoents/customer/record-edit/record-edit.component';
import { RouteTimeLineComponent } from './compoents/route-time-line/route-time-line.component';
import { CusCodeItemComponent } from './compoents/customer/cus-code-item/cus-code-item.component';

environment.SERVER_URL = CoConfigManager.getValue('serverUrl');

import { DocumentLayoutComponent } from '../shared/compoents/document-list/layout/layout.component';
import { DocumentListPanelComponent } from '../shared/compoents/document-list/list-panel/list-panel.component';
import { DocumentToolbarComponent } from '../shared/compoents/document-list/toolbar/toolbar.component';
import { FormvalidationComponent } from './compoents/formvalidation/formvalidation.component';
import { SharequotesComponent } from './compoents/sharequotes/sharequotes.component';
import { TicketDividerComponent } from './compoents/ticket-divider/ticket-divider.component';
import { CurvedRouteComponent } from './compoents/curved-route/curved-route.component';
import { WrapChildrenHeightDirective } from './directives/wrap-children-height.directive';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { HiddensharequotesComponent } from './compoents/hiddensharequotes/hiddensharequotes.component';
import { CopyDomToImageDirective } from './directives/copy-dom-to-image.directive';
import { AddressDetailModalComponent } from './compoents/new-packing-list/address-detail-modal/address-detail-modal.component';
import { NewPackingListComponent } from './compoents/new-packing-list/new-packing-list.component';
import { SearchByExtraKeyDirective } from './directives/search-by-extra-key.directive';
import { ModelWithGroupChangeDirective } from './directives/model-with-group-change.directive';
environment.SERVER_URL = CoConfigManager.getValue('serverUrl');

const COMPONENTS_ENTRY = [
  NewPackingListComponent,
  AddressDetailModalComponent,
  ApplyCusCodeComponent,
  CreateCustomerComponent,
  RecordEditComponent,
  CusCodeItemComponent,
  DocumentLayoutComponent,
  DocumentListPanelComponent,
  DocumentToolbarComponent,
];
const COMPONENTS = [
  ...COMPONENTS_ENTRY,
  RouteTimeLineComponent,
  FormvalidationComponent,
  SharequotesComponent,
  TicketDividerComponent,
  CurvedRouteComponent,
  HiddensharequotesComponent,
];
const DIRECTIVES = [
  debounceInputDirective,
  EnterKeydownDirective,
  NzOptionExtraChangeDirective,
  CalcNzTableBodyScrollDirective,
  OptionsGroupValueDirective,
  NzOptionExtraDirective,
  WrapChildrenHeightDirective,
  MouseMoveDirective,
  CopyDomToImageDirective,
  SearchByExtraKeyDirective,
  ModelWithGroupChangeDirective
];
// #endregion

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    OverlayModule,
    NzResizableModule,
    RouterModule,
    ReactiveFormsModule,
    CoACLModule,
    CoFormModule.forRoot(),
    CoCommonModule.forRoot({ environment }),
    DragulaModule.forRoot(),
    ...SHARED_CO_MODULES,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  entryComponents: COMPONENTS_ENTRY,
  exports: [
    CommonModule,
    FormsModule,
    OverlayModule,
    ReactiveFormsModule,
    RouterModule,
    CoACLModule,
    CoFormModule,
    CoCommonModule,
    // i18n
    TranslateModule,
    ...SHARED_CO_MODULES,
    ...SHARED_ZORRO_MODULES,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {}
