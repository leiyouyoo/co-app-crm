import { registerLocaleData } from '@angular/common';
import ngEn from '@angular/common/locales/en';
import ngZh from '@angular/common/locales/zh';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US as zorroEnUS, NzI18nService, zh_CN as zorroZhCN, zh_TW as zorroZhTW } from 'ng-zorro-antd/i18n';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { enUS as dfEn, zhCN as dfZhCn } from 'date-fns/locale';

import { CoI18NService } from '@co/core';
import { CoLocaleService, en_US as delonEnUS, SettingsService, zh_CN as coZhCn } from '@co/common';

interface LangData {
  text: string;
  ng: any;
  zorro: any;
  date: any;
  co: any;
  abbr: string;
}

const DEFAULT = 'zh-CN';
const LANGS: { [key: string]: LangData } = {
  'zh-CN': {
    text: '简体中文',
    ng: ngZh,
    zorro: zorroZhCN,
    date: dfZhCn,
    co: coZhCn,
    abbr: '🇨🇳',
  },
  'en-US': {
    text: 'English',
    ng: ngEn,
    zorro: zorroEnUS,
    date: dfEn,
    co: delonEnUS,
    abbr: '🇬🇧',
  },
};

/**
 * 多语言服务
 */
@Injectable({ providedIn: 'root' })
export class I18NService implements CoI18NService {
  public static serviceName: string = 'I18NService';

  private _default = DEFAULT;
  private change$ = new BehaviorSubject<string | null>(null);
  private _langs = Object.keys(LANGS).map((code) => {
    const item = LANGS[code];
    return { code, text: item.text, abbr: item.abbr };
  });

  constructor(
    private settings: SettingsService,
    private nzI18nService: NzI18nService,
    private coLocaleService: CoLocaleService,
    private translate: TranslateService,
  ) {
    // `@ngx-translate/core` 预先知道支持哪些语言
    const lans = this._langs.map((item) => item.code);
    translate.addLangs(lans);

    const defaultLan = this.getDefaultLang();
    if (lans.includes(defaultLan)) {
      this._default = defaultLan;
    }

    this.updateLangData(this._default);
  }

  private getDefaultLang(): string | undefined {
    if (this.settings.layout.lang) {
      return this.settings.layout.lang;
    }
    return (navigator.languages ? navigator.languages[0] : null) || navigator.language;
  }

  private updateLangData(lang: string) {
    const item = LANGS[lang];
    registerLocaleData(item.ng);
    this.nzI18nService.setLocale(item.zorro);
    this.nzI18nService.setDateLocale(item.date);
    this.coLocaleService.setLocale(item.co);
  }

  get change(): Observable<string> {
    return this.change$.asObservable().pipe(filter((w) => w != null)) as Observable<string>;
  }

  /**
   * 切换语言
   * @param lang 语言
   */
  use(lang: string): void {
    lang = lang || this.translate.getDefaultLang();
    if (this.currentLang === lang) {
      return;
    }
    this.updateLangData(lang);
    this.translate.use(lang).subscribe(() => this.change$.next(lang));
  }

  /**
   * 获取语言列表
   */
  getLangs() {
    return this._langs;
  }

  /**
   * 翻译
   */
  fanyi(key: string, interpolateParams?: {}) {
    return this.translate.instant(key, interpolateParams);
  }

  /**
   * 默认语言
   */
  get defaultLang() {
    return this._default;
  }

  /**
   * 当前语言
   */
  get currentLang() {
    return this.translate.currentLang || this.translate.getDefaultLang() || this._default;
  }
}
