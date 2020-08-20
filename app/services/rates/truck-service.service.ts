import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesTruckOuput,RatesPagedResultDto,RatesCrmTruckOuput,RatesTruckDropDownListOutput,RatesTruckRateDto,RatesCreateListTruckInput, } from './rates.types';

@BaseUrl('/rates/TruckService')
@Injectable({ providedIn: 'root' })
export class RatesTruckServiceService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/TruckService/GetAll
     * 拖车列表
     */

    @GET('getAll')
    getAll(
        @Payload
        _req: {from?:string,to?:string,carrier?:string,shipline?:string,status?:number,durationStart?:string,durationEnd?:string,updateBy?:number,isPublish?:number,updateByDate?:string,zIPCode?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<RatesPagedResultDto<RatesTruckOuput>> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/GetCrmGetAll
     * crm 拖车列表
     */

    @GET('getCrmGetAll')
    getCrmGetAll(
        @Payload
        _req: {isFollow?:boolean,from?:string,to?:string,carrier?:string,status?:number,durationStart?:string,durationEnd?:string,updateBy?:number,no?:string,zIPCode?:string,id?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<RatesPagedResultDto<RatesCrmTruckOuput>> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/GetAddressForTruckingFee
     * 
     */

    @GET('getAddressForTruckingFee')
    getAddressForTruckingFee(
        @Payload
        _req: {searchText?:string,type?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<RatesPagedResultDto<RatesTruckDropDownListOutput>> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/Update
     * 更新拖车
     */

    @PUT('update')
    update(
        @Payload
        _req:RatesTruckRateDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/BulkDataValidation
     * 导入拖车价格验证
     */

    @POST('bulkDataValidation')
    bulkDataValidation(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/DataValid
     * 校驗是否有效
     */

    @POST('dataValid')
    dataValid(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/BulkDelete
     * 单条删除或批量删除拖车
     */

    @POST('bulkDelete')
    bulkDelete(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/BulkAddOrUpdate
     * 批量导入拖车
     */

    @POST('bulkAddOrUpdate')
    bulkAddOrUpdate(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/BulkInset
     * 批量新增多条拖车数据
     */

    @POST('bulkInset')
    bulkInset(
        @Payload
        _req:RatesCreateListTruckInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/IsSignUpdate
     * 是否标记
     */

    @POST('isSignUpdate')
    isSignUpdate(
        @Payload
        _req: {id?:string,isSign?:boolean} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/GetAddress
     * 
     */

    @GET('getAddress')
    getAddress(
        @Payload
        _req: {searchText?:string,type?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<RatesPagedResultDto<RatesTruckDropDownListOutput>> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/GetCarriers
     * 拖车行下拉数据
     */

    @GET('getCarriers')
    getCarriers(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/BulkUpdateValid
     * 定时任务定时调用更改拖车有效期
     */

    @POST('bulkUpdateValid')
    bulkUpdateValid(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/AddOrUpdateTruckRate
     * 
     */

    @POST('addOrUpdateTruckRate')
    addOrUpdateTruckRate(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/TruckService/Test
     * 
     */

    @POST('test')
    test(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
