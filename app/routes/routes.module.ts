import { NgModule } from '@angular/core';
import { RouterModule as NgRouterModule, Routes } from '@angular/router';

import { EmptyComponent } from '@co/cms';

import { SharedModule } from '../shared';
import { DefaultLayoutComponent } from '../layout';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

//TODO:子应用代码-路由按子应用规范配置
export const routers: Routes = [
  {
    path: 'crm',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'customers',
        pathMatch: 'full',
      },
      {
        path: 'customers',
        loadChildren: () => import(/* webpackChunkName: "crm-customers" */ './customer/customer.module').then((mod) => mod.CustomerModule),
        data: {
          reuse: true,
          titleI18n: 'Customer',
        },
      },
      {
        path: 'quotes',
        loadChildren: () => import(/* webpackChunkName: "crm-quotes" */ './quotes/quotes.module').then((mod) => mod.QuotesModule),
        data: {
          reuse: true,
          titleI18n: 'Quotes',
        },
      },
      {
        path: 'inquiries',
        loadChildren: () => import(/* webpackChunkName: "crm-inquiry" */ './inquiry/inquiry.module').then((mod) => mod.InquiryModule),
        data: {
          reuse: true,
          titleI18n: 'Inquiry',
        },
      },
      {
        path: 'bookings',
        loadChildren: () => import(/* webpackChunkName: "crm-bookings" */ './booking/booking.module').then((mod) => mod.BookingModule),
        data: {
          reuse: true,
          titleI18n: 'Booking',
        },
      },
      {
        path: '**',
        component: EmptyComponent,
      },
    ],
  },
  {
    path: '**',
    component: EmptyComponent,
  },
];

/**
 * 平台管理路由模块
 */
@NgModule({
  imports: [
    SharedModule,
    NgRouterModule.forRoot(routers, {
      useHash: true,
      paramsInheritanceStrategy: 'always',
    }),
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
