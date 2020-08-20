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
        redirectTo: 'inquiry',
        pathMatch: 'full',
      },
      // {
      //   path: 'home',
      //   loadChildren: () => import('./customer/customer.module').then((mod) => mod.CustomerModule),
      //   data: {
      //     breadcrumb: '',
      //   },
      // },
      // {
      //   path: 'quotes',
      //   loadChildren: () => import('./quotes/quotes.module').then((mod) => mod.QuotesModule),
      //   data: {
      //     breadcrumb: '',
      //   },
      // },
      {
        path: 'inquiry',
        loadChildren: () => import('./inquiry/inquiry.module').then((mod) => mod.InquiryModule),
        data: {
          breadcrumb: '',
        },
      },
      // {
      //   path: 'booking',
      //   loadChildren: () => import('./booking/booking.module').then((mod) => mod.BookingModule),
      //   data: {
      //     breadcrumb: '',
      //   },
      // },
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
export class RoutesModule { }
