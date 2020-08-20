import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesLocalBaseRateOutput,RatesPagedResultDto,RatesLocalDetailOutput,RatesLocalBaseRateDto,RatesLocalPortRateDto, } from './rates.types';

@BaseUrl('/rates/LocalBaseRateService')
@Injectable({ providedIn: 'root' })
export class RatesLocalBaseRateServiceService extends BaseApi {
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
        _req: {carrierId?:string,shiplineId?:string,areaId?:string,provinceId?:string,portId?:string,updatebyId?:number,chargingCodeId?:string,updateDateStart?:string,updateDateEnd?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

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
     * @param url /Rates/LocalBaseRateService/BulkAddOrUpdate
     * 批量新增编辑单条和多条
     */

    @POST('bulkAddOrUpdate')
    bulkAddOrUpdate(
        @Payload
        _req:RatesLocalBaseRateDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/BulkDelete
     * 单条删除或批量删除本地费
     */

    @POST('bulkDelete')
    bulkDelete(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/UpdateLocalPortItem
     * 对某个港口的费用编辑需要传Id
     */

    @PUT('updateLocalPortItem')
    updateLocalPortItem(
        @Payload
        _req:RatesLocalPortRateDto

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


    /**
     * @param url /Rates/LocalBaseRateService/IsUpdateLocalItemRate
     * 编辑的时候判断是否可以编辑费用
     */

    @POST('isUpdateLocalItemRate')
    isUpdateLocalItemRate(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/GetPortByIdItemRate
     * 根据某个港口统计 费用箱型的总额
     */

    @GET('getPortByIdItemRate')
    getPortByIdItemRate(
        @Payload
        _req: {portId?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/DeleteLocalPortRate
     * 
     */

    @DELETE('deleteLocalPortRate')
    deleteLocalPortRate(
        @Payload
        _req: {localPortRateId?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/BatchUpdateLocalRate
     * 
     */

    @POST('batchUpdateLocalRate')
    batchUpdateLocalRate(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/LocalBaseRateService/BatchUpdate
     * 
     */

    @POST('batchUpdate')
    batchUpdate(
        @Payload
        _req:RatesLocalBaseRateDto

    ): Observable<any> {
        return null as any
    }



  }
