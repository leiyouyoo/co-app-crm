import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { defineApplication, PlanetPortalApplication, ReuseTabService } from '@co/cms';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//TODO:子应用代码-定义子应用
defineApplication(
  'crm',
  (portalApp: PlanetPortalApplication) => {
    return platformBrowserDynamic([
      {
        provide: PlanetPortalApplication,
        useValue: portalApp,
      },
      {
        provide: ReuseTabService,
        useValue: portalApp.data.data,
      },
    ])
      .bootstrapModule(AppModule)
      .then((appModule) => {
        return appModule;
      })
      .catch((error) => {
        return null;
      });
  },
  { version: process.env.APP_VERSION, releaseDate: new Date(process.env.APP_RELEASEDATE) },
);
