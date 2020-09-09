import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';

@BaseUrl('/cityOceanService')
@Injectable({ providedIn: 'root' })
export class CSPCityOceanService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * @param url /cityOceanService/TransportFoundationService/getVoyagesList
   * 获取船名航次
   */

  @GET('TransportFoundationService/getVoyagesList')
  getVoyagesList(
    @Payload
    _req: {
      VesselName?: string;
      IsOneMonth?: boolean;
    },
  ): Observable<any> {
    return null as any;
  }
}
