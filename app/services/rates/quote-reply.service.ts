import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesCreateTruckQuoteReplyInput,RatesCreateOceanQuoteReplyInput, } from './rates.types';

@BaseUrl('/rates/QuoteReply')
@Injectable({ providedIn: 'root' })
export class RatesQuoteReplyService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/QuoteReply/GetForUpdate
     * 获取报价用于编辑\新增
     */

    @GET('getForUpdate')
    getForUpdate(
        @Payload
        _req: {quoteEnquiryId?:string} 

    ): Observable<RatesCreateTruckQuoteReplyInput> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteReply/CreateTruckReply
     * 创建拖车报价
     */

    @POST('createTruckReply')
    createTruckReply(
        @Payload
        _req:RatesCreateTruckQuoteReplyInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteReply/CreateOceanReply
     * 创建海运报价
     */

    @POST('createOceanReply')
    createOceanReply(
        @Payload
        _req:RatesCreateOceanQuoteReplyInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteReply/AutomaticExpiredQuoteReply
     * 任务调度-自动更新过期报价
     */

    @POST('automaticExpiredQuoteReply')
    automaticExpiredQuoteReply(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
