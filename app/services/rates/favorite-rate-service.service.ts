import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesFavoriteInput, } from './rates.types';

@BaseUrl('/rates/FavoriteRateService')
@Injectable({ providedIn: 'root' })
export class RatesFavoriteRateServiceService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/FavoriteRateService/BindFollow
     * 选择是否收藏关系
     */

    @POST('bindFollow')
    bindFollow(
        @Payload
        _req:RatesFavoriteInput

    ): Observable<any> {
        return null as any
    }



  }
