import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { VERSION as VERSION_ZORRO } from 'ng-zorro-antd/version';
import { filter } from 'rxjs/operators';
import { GlobalEventDispatcher } from '@co/cms';
import { I18NService } from './core/i18n/i18n.service';

//TODO:子应用代码-应用组件选择器命名保持与配置文件一致
/**
 * 应用入口组件
 */
@Component({
  selector: 'crm-root',
  template: ` <router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  activeAppNames: string[] = [];

  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private modalSrv: NzModalService,
    public i18n: I18NService,
    private globalEventDispatcher: GlobalEventDispatcher,
  ) {
    renderer.setAttribute(el.nativeElement, 'ng-zorro-version', VERSION_ZORRO.full);

    this.globalEventDispatcher.register('change-lang').subscribe((lang: string) => {
      i18n.use(lang);
    });
  }

  ngOnInit() {
    this.router.events.pipe(filter((evt) => evt instanceof NavigationEnd)).subscribe(() => {
      this.modalSrv.closeAll();
    });
  }
}
