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
      },
      {
        path: 'quotes',
        loadChildren: () => import(/* webpackChunkName: "crm-quotes" */ './quotes/quotes.module').then((mod) => mod.QuotesModule),
      },
      {
        path: 'inquiries',
        loadChildren: () => import(/* webpackChunkName: "crm-inquiries" */ './inquiry/inquiry.module').then((mod) => mod.InquiryModule),
      },
      {
        path: 'bookings',
        loadChildren: () => import(/* webpackChunkName: "crm-bookings" */ './booking/booking.module').then((mod) => mod.BookingModule),
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
