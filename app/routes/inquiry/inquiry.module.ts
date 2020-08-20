import { NgModule } from '@angular/core';
// import { SharedModule } from '@shared';
import { InquiryRoutingModule } from './inquiry-routing.module';
import { InquiryListComponent } from './inquiry-list/inquiry-list.component';
import { InquiryDetialComponent } from './inquiry-detial/inquiry-detial.component';

import { InquiryIndexComponent } from './inquiry-index.component';

import { InquiryBasicInfomationComponent } from './inquiry-list/inquiry-basic-information/inquiry-basic-information.component';
// import { InquiryListOceanComponent } from './inquiry-ocean/inquiry-ocean.component';
import { InquiryTrackComponent } from './inquiry-track/inquiry-track.component';
import { TrackDetialComponent } from './track-detial/track-detial.component';
// import { ShareOceanComponent } from './inquiry-ocean/share-ocean/share-ocean.component';
// import { ClipboardModule } from 'ngx-clipboard';
const COMPONENTS = [
  InquiryListComponent,
  InquiryDetialComponent,
  InquiryIndexComponent,
  TrackDetialComponent,
  InquiryBasicInfomationComponent,
  // InquiryListOceanComponent,
  InquiryTrackComponent,
  // ShareOceanComponent,
];
const COMPONENTS_NOROUNT = [
  TrackDetialComponent,
  InquiryDetialComponent,
  InquiryBasicInfomationComponent,
  // InquiryListOceanComponent,
  InquiryTrackComponent,
];

@NgModule({
  // imports: [SharedModule, ClipboardModule, InquiryRoutingModule],
  imports: [InquiryRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class InquiryModule { }
