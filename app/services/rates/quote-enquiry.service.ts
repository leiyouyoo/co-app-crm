import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { RatesQuoteEnquiryBaseDto,RatesPagedResultDto,RatesQuoteEnquiryFromDto,RatesQuoteEnquiryToDto,RatesQuoteCustomerContactDto,RatesCreateQuoteEnquiryInput,RatesCreateTruckQuoteInput,RatesCoEntityDto,RatesRejectQuoteEnquiryInput, } from './rates.types';

@BaseUrl('/rates/QuoteEnquiry')
@Injectable({ providedIn: 'root' })
export class RatesQuoteEnquiryService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Rates/QuoteEnquiry/Get
     * 获取询报价详情
     */

    @GET('get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<RatesQuoteEnquiryBaseDto> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/GetAll
     * 分页获取询报价列表
     */

    @GET('getAll')
    getAll(
        @Payload
        _req: {customerId?:string,contactId?:string,id?:string,status?:any[],isGetAll?:boolean,freightMethodType?:any[],validStartDate?:string,validEndDate?:string,fromId?:string,fromType?:number,toId?:string,toType?:number,searchText?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<RatesPagedResultDto<RatesQuoteEnquiryBaseDto>> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/GetFromInfo
     * 分页获取from地点港口
     */

    @GET('getFromInfo')
    getFromInfo(
        @Payload
        _req: {searchText?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<RatesPagedResultDto<RatesQuoteEnquiryFromDto>> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/GetToInfo
     * 分页获取to地点港口
     */

    @GET('getToInfo')
    getToInfo(
        @Payload
        _req: {searchText?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<RatesPagedResultDto<RatesQuoteEnquiryToDto>> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/GetQuoteCustomerContactInfo
     * 搜索获取询价客户、联系人、询报价编号等信息
     */

    @GET('getQuoteCustomerContactInfo')
    getQuoteCustomerContactInfo(
        @Payload
        _req: {searchText?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<RatesPagedResultDto<RatesQuoteCustomerContactDto>> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/Create
     * 创建询价
     */

    @POST('create')
    create(
        @Payload
        _req:RatesCreateQuoteEnquiryInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/UpdateForRejectAsync
     * 编辑询价（驳回的可编辑）
     */

    @PUT('updateForRejectAsync')
    updateForRejectAsync(
        @Payload
        _req:RatesCreateQuoteEnquiryInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/CreateTruckQuoteAndReply
     * 创建拖车询报价
     */

    @POST('createTruckQuoteAndReply')
    createTruckQuoteAndReply(
        @Payload
        _req:RatesCreateTruckQuoteInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/CancelAsync
     * 作废(商务新增的拖车询报价才可以)
     */

    @POST('cancelAsync')
    cancelAsync(
        @Payload
        _req:RatesCoEntityDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/RecoverAsync
     * 恢复(商务新增的拖车询报价才可以)
     */

    @POST('recoverAsync')
    recoverAsync(
        @Payload
        _req:RatesCoEntityDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/DeleteAsync
     * 删除(商务新增的拖车询报价才可以)
     */

    @DELETE('deleteAsync')
    deleteAsync(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/Reject
     * （未报过价的）商务可驳回
     */

    @POST('reject')
    reject(
        @Payload
        _req:RatesRejectQuoteEnquiryInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Rates/QuoteEnquiry/GetQuoteNo
     * 模糊匹配询价单号
     */

    @GET('getQuoteNo')
    getQuoteNo(
        @Payload
        _req: {searchText?:string} 

    ): Observable<any> {
        return null as any
    }



  }
