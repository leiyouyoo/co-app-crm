import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ConfigComponent } from './config.component';
import { ConfigRoutingModule } from './config-routing.module';
import { CustomerInspectionComponent } from './components/customer-inspection.component';

const COMPONENTS = [
  ConfigComponent
];
const COMPONENTS_NO_ROUTE = [
  CustomerInspectionComponent
];

@NgModule({
  imports: [SharedModule,ConfigRoutingModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NO_ROUTE
  ],
  entryComponents: COMPONENTS_NO_ROUTE,
})
export class ConfigModule {}
