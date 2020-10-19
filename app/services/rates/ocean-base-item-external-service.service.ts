import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesGetCrmFreightRateAndQuoteInput,RatesCrmSaveFreightAndQuoteInput,RatesSaveSendCustomerInput, } from './rates.types';

@BaseUrl('/rates/OceanBaseItemExternalService')
@Injectable({ providedIn: 'root' })
export class RatesOceanBaseItemExternalService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/OceanBaseItemExternalService/GetQuoteFreightRates
     * 根据报价的搜索返回需要的运价
     */

    @GET('getQuoteFreightRates')
    getQuoteFreightRates(
        @Payload
        _req: {originLocationId?:string,deliveryLocationId?:string,originPortId?:any[],deliveryPortId?:any[],carrierId?:string,customerId?:string,filter?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBaseItemExternalService/GetCrmFreightAndQuoteRates
     * 分享运价获取要分享的数据
     */

    @POST('getCrmFreightAndQuoteRates')
    getCrmFreightAndQuoteRates(
        @Payload
        _req:RatesGetCrmFreightRateAndQuoteInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBaseItemExternalService/SaveFreightAndQuoteRates
     * 保存Crm分享运价数据
     */

    @POST('saveFreightAndQuoteRates')
    saveFreightAndQuoteRates(
        @Payload
        _req:RatesCrmSaveFreightAndQuoteInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBaseItemExternalService/GetCrmCacheFreightAndQuoteRates
     * 获取Crm分享运价数据
     */

    @GET('getCrmCacheFreightAndQuoteRates')
    getCrmCacheFreightAndQuoteRates(
        @Payload
        _req: {cacheKey?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/OceanBaseItemExternalService/SaveSendCustomer
     * 发送给客户
     */

    @POST('saveSendCustomer')
    saveSendCustomer(
        @Payload
        _req:RatesSaveSendCustomerInput

    ): Observable<any> {
        return null as any
    }



  }
