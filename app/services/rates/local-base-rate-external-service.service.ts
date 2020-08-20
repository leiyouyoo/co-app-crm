import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { Rates,RatesTuple, } from './rates.types';

@BaseUrl('/rates/LocalBaseRateExternalService')
@Injectable({ providedIn: 'root' })
export class RatesLocalBaseRateExternalServiceService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/LocalBaseRateExternalService/GetLocalRateByPort
     * 
     */

    @GET('getLocalRateByPort')
    getLocalRateByPort(
        @Payload
        _req: {id?:string} 

    ): Observable<RatesTuple<any>> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateExternalService/GetOriginalAndDestinationLocalRates
     * 
     */

    @GET('getOriginalAndDestinationLocalRates')
    getOriginalAndDestinationLocalRates(
        @Payload
        _req: {carrierId?:string,polId?:string,podId?:string} 

    ): Observable<RatesTuple<any>> {
        return null as any
    }



  }
