import { NgModule } from '@angular/core';
// import { SharedModule } from '@shared';
import { InquiryRoutingModule } from './inquiry-routing.module';
import { InquiryListComponent } from './inquiry-list/inquiry-list.component';
import { InquiryDetialComponent } from './inquiry-detial/inquiry-detial.component';

import { InquiryIndexComponent } from './inquiry-index.component';

import { InquiryBasicInfomationComponent } from './inquiry-list/inquiry-basic-information/inquiry-basic-information.component';
import { InquiryListOceanComponent } from './inquiry-ocean/inquiry-ocean.component';
import { InquiryTrackComponent } from './inquiry-track/inquiry-track.component';
import { TrackDetialComponent } from './track-detial/track-detial.component';
import { SharedModule } from '../../shared';
import { TruckingFromToComponent } from './share/component/trucking-from-to/trucking-from-to.component';
import { ShareOceanComponent } from './inquiry-ocean/share-ocean/share-ocean.component';
import { CurvedRouteComponent } from './share/component/curved-route/curved-route.component';
import { SailingSchedulesContentComponent } from './share/component/sailing-schedules-content/sailing-schedules-content.component';
import { LoadingComponent } from './share/component/loading/loading.component';
import { ArrayJoinPipe } from './share/pipe/array-join.pipe';
import { ClipboardModule } from 'ngx-clipboard';
import { CopyDomToImageDirective } from './share/directives/copy-dom-to-image.directive';
const COMPONENTS = [
  InquiryListComponent,
  InquiryDetialComponent,
  InquiryIndexComponent,
  TrackDetialComponent,
  InquiryBasicInfomationComponent,
  InquiryListOceanComponent,
  InquiryTrackComponent,
  TruckingFromToComponent,
  ShareOceanComponent,
  CurvedRouteComponent,
  LoadingComponent,
  SailingSchedulesContentComponent,
  CopyDomToImageDirective,
  ArrayJoinPipe
];
const COMPONENTS_NOROUNT = [
  TrackDetialComponent,
  InquiryDetialComponent,
  InquiryBasicInfomationComponent,
  InquiryListOceanComponent,
  InquiryTrackComponent,
];

@NgModule({
  imports: [SharedModule, ClipboardModule, InquiryRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class InquiryModule { }
