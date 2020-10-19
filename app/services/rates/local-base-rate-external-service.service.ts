import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { Rates, RatesTuple } from './rates.types';

@BaseUrl('/rates/LocalBaseRateExternalService')
@Injectable({ providedIn: 'root' })
export class RatesLocalBaseRateExternalService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * @param url /Rates/LocalBaseRateExternalService/GetLocalRateByPort
   * 根据某条运价获取对应的本地费
   */

  @GET('getLocalRateByPort')
  getLocalRateByPort(
    @Payload
    _req: {
      id?: string;
    },
  ): Observable<any> {
    return null as any;
  }

  /**
   * @param url /Rates/LocalBaseRateExternalService/GetOriginalAndDestinationLocalRates
   * 根据出发港和到达港获取附近的本地费
   */

  @GET('getOriginalAndDestinationLocalRates')
  getOriginalAndDestinationLocalRates(
    @Payload
    _req: {
      carrierId?: string;
      polId?: string;
      podId?: string;
    },
  ): Observable<any> {
    return null as any;
  }
}
