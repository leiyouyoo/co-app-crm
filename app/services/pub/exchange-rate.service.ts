import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { PUBExchangeRateDto,PUBPagedResultDto1,PUBEntityDto1 } from './pub.types';

@BaseUrl('/PUB/ExchangeRate')
@Injectable({ providedIn: 'root' })
export class PUBExchangeRateService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /PUB/ExchangeRate/Get
     * 获取汇率明细
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<PUBExchangeRateDto> {
        return null as any
    }


    /**
     * @param url /PUB/ExchangeRate/GetAll
     * 获取汇率列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {type?:number,sourceCurrency?:string,targetCurrency?:string,fromDate?:string,toDate?:string,isValid?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<PUBPagedResultDto1<PUBExchangeRateDto>> {
        return null as any
    }


    /**
     * @param url /PUB/ExchangeRate/CreateOrUpdate
     * 保存汇率
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:PUBExchangeRateDto

    ): Observable<PUBExchangeRateDto> {
        return null as any
    }


    /**
     * @param url /PUB/ExchangeRate/SetValid
     * 设置是否有效
     */

    @POST('SetValid')
    setValid(
        @Payload
        _req:PUBEntityDto1<any>

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /PUB/ExchangeRate/Delete
     * 删除汇率
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
