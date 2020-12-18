import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquiryListComponent } from './inquiry-list/inquiry-list.component';
import { InquiryListOceanComponent } from './inquiry-ocean/inquiry-ocean.component';
import { InquiryTrackComponent } from './inquiry-track/inquiry-track.component';
const routes: Routes = [
  {
    path: '',
    component: InquiryListComponent,
    data: {
      titleI18n: 'crm:inquirylist',
      reuse: true,
    },
  },
  {
    path: 'oceanlist',
    component: InquiryListOceanComponent,
    data: {
      titleI18n: 'crm:oceanlist',
      reuse: true,
    },
  },
  {
    path: 'oceanlist/:id',
    component: InquiryListOceanComponent,
    data: {
      titleI18n: 'crm:oceanlist',
      reuse: true,
    },
  },
  {
    path: 'tracklist',
    component: InquiryTrackComponent,
    data: {
      titleI18n: 'crm:tracklist',
      reuse: true,
    },
  },
  {
    path: 'tracklist/:id',
    component: InquiryTrackComponent,
    data: {
      titleI18n: 'crm:tracklist',
      reuse: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquiryRoutingModule {}
