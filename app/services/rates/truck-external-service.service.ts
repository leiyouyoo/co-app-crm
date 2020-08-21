import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesCspTruckListInput,RatesCspTruckOutput,RatesPagedResultDto, } from './rates.types';

@BaseUrl('/rates/TruckExternalService')
@Injectable({ providedIn: 'root' })
export class RatesTruckExternalServiceService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/TruckExternalService/GetQuoteTruckRates
     * 
     */

    @POST('getQuoteTruckRates')
    getQuoteTruckRates(
        @Payload
        _req:RatesCspTruckListInput

    ): Observable<RatesPagedResultDto<RatesCspTruckOutput>> {
        return null as any
    }



  }
