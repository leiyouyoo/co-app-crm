import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesLocalBaseRateOutput,RatesPagedResultDto,RatesLocalDetailOutput,RatesLocalBaseRateDto,RatesBulkCommonInput,RatesPublishInput, } from './rates.types';

@BaseUrl('/rates/LocalBaseRateService')
@Injectable({ providedIn: 'root' })
export class RatesLocalBaseRateService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/LocalBaseRateService/GetAll
     * LocalFees列表查询
     */

    @GET('getAll')
    getAll(
        @Payload
        _req: {carrierIds?:string,shiplineIds?:string,provinceIds?:string,portIds?:string,updatebyId?:number,chargingCodeId?:string,updateDateStart?:string,updateDateEnd?:string,isPublish?:boolean,isNormalize?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<RatesPagedResultDto<RatesLocalBaseRateOutput>> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/GetLocalFeeDetails
     * LocaalFees详情
     */

    @GET('getLocalFeeDetails')
    getLocalFeeDetails(
        @Payload
        _req: {id?:string} 

    ): Observable<RatesLocalDetailOutput> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/CreateOrUpdate
     * 新增编辑本地费
     */

    @POST('createOrUpdate')
    createOrUpdate(
        @Payload
        _req:RatesLocalBaseRateDto

    ): Observable<RatesLocalBaseRateDto> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/Cancel
     * 取消发布
     */

    @POST('cancel')
    cancel(
        @Payload
        _req:RatesBulkCommonInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/Publish
     * 发布
     */

    @POST('publish')
    publish(
        @Payload
        _req:RatesPublishInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/Delete
     * 删除本地费
     */

    @DELETE('delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/GetMinistryOfCommerces
     * 获取商务部的用户
     */

    @GET('getMinistryOfCommerces')
    getMinistryOfCommerces(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
