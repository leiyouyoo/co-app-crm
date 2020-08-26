import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InquiryListComponent } from './inquiry-list/inquiry-list.component';
import { InquiryListOceanComponent } from './inquiry-ocean/inquiry-ocean.component';
import { InquiryTrackComponent } from './inquiry-track/inquiry-track.component';
const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: InquiryListComponent,
    data: {
      titleI18n: 'frm:Inquiry list',
      reuse: true,
    },
  },
  {
    path: 'oceanlist',
    component: InquiryListOceanComponent,
    data: {
      breadcrumb: 'Ocean list',
    },
  },
  {
    path: 'tracklist',
    component: InquiryTrackComponent,
    data: {
      breadcrumb: 'Track list',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InquiryRoutingModule {}
