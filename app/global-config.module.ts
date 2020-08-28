import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';

import { CoMockModule } from '@co/mock';
import { CO_CONFIG, CoConfig, CoConfigManager } from '@co/core';
import { SimpleInterceptor } from '@co/auth';
import { CoACLModule } from '@co/acl';
import { ReuseTabMatchMode, ReuseTabService, ReuseTabStrategy } from '@co/cms';

import { throwIfAlreadyLoaded } from './core';

// #region  全局配置
const coConfig: CoConfig = {
  st: {
    modal: { size: 'lg' },
    size: 'small',
    page: {
      front: false,
      zeroIndexed: false,
      position: 'bottom',
      placement: 'right',
      show: true,
      showSize: true,
      pageSizes: [10, 15, 30, 45, 60, 100],
      showQuickJumper: false,
      total: true,
      toTop: true,
      toTopOffset: 100,
    },
    virtualItemSize: 39,
  },
  auth: { login_url: '/passport/login' },
  common: {
    httpClient: {
      SERVER_URL: CoConfigManager.getValue('serverUrl'),
      LOGIN_URL: CoConfigManager.getValue('loginUrl'),
    },
  },
};

const coModules = [CoACLModule.forRoot(), CoMockModule.forRoot()];
const coProvides = [
  { provide: CO_CONFIG, useValue: coConfig },
  { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
];

// #endregion

// #region  路由复用配置
coProvides.push({
  provide: RouteReuseStrategy,
  useClass: ReuseTabStrategy,
  deps: [ReuseTabService],
} as any);

// #endregion

// #region NG-ZORRO 配置
const ngZorroConfig: NzConfig = {};
const zorroProvides = [{ provide: NZ_CONFIG, useValue: ngZorroConfig }];

// #endregion

/**
 * 全局配置模块
 */
@NgModule({
  imports: [...coModules],
})
export class GlobalConfigModule {
  constructor(@Optional() @SkipSelf() parentModule: GlobalConfigModule, reuseTabService: ReuseTabService) {
    throwIfAlreadyLoaded(parentModule, 'GlobalConfigModule');
    reuseTabService.mode = ReuseTabMatchMode.MenuForce;
    reuseTabService.init();
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GlobalConfigModule,
      providers: [...coProvides, ...zorroProvides],
    };
  }
}
