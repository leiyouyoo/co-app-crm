import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzIconService } from 'ng-zorro-antd/icon';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoConfigManager, CO_LOGGER_TOKEN, ILogger } from '@co/core';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
  constructor(
    private iconSrv: NzIconService,
    private translate: TranslateService,
    private httpClient: HttpClient,
    @Inject(CO_LOGGER_TOKEN) private logger: ILogger,
  ) {
    this.iconSrv.fetchFromIconfont({
      scriptUrl: CoConfigManager.getValue('iconSrv'),
    });
  }

  load(): Promise<any> {
    const lang = window.localStorage.getItem('language') || navigator.language;

    //TODO:子应用代码-加载指定子应用语言文件
    return new Promise((resolve) => {
      zip(this.httpClient.get(`./apps/crm/assets/i18n/${lang}.json`))
        .pipe(
          // 接收其他拦截器后产生的异常消息
          catchError((res) => {
            window.localStorage.removeItem('_token');
            this.logger.warn(`StartupService.load: Network request failed${res}`);
            resolve(null);
            return [];
          }),
        )
        .subscribe(
          ([langData]) => {
            // 设置语言
            this.translate.setTranslation(lang, langData);
            this.translate.use(lang);
            this.translate.setDefaultLang(lang);
          },
          () => {},
          () => {
            resolve(null);
          },
        );
    });
  }
}
