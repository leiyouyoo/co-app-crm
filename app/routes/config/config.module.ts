import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ConfigComponent } from './config.component';
import { ConfigRoutingModule } from './config-routing.module';
import { CustomerInspectionComponent } from './components/customer-inspection.component';
import { RecycleConfigComponent } from './recycle/recycle-config/recycle-config.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';

const COMPONENTS = [
  ConfigComponent,
];
const COMPONENTS_NO_ROUTE = [
  CustomerInspectionComponent,
  RecycleConfigComponent,
];

@NgModule({
  imports: [SharedModule, ConfigRoutingModule, NzDividerModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NO_ROUTE,
  ],
  entryComponents: COMPONENTS_NO_ROUTE,
})
export class ConfigModule {
}
