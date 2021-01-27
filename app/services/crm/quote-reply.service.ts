import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMListResultDto1,CRMQuoteReplyDto,CRMCoEntityDto,CRMPagedResultDto1 } from './crm.types';

@BaseUrl('/CRM/QuoteReply')
@Injectable({ providedIn: 'root' })
export class CRMQuoteReplyService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/QuoteReply/GetAllForCRM
     * 获取报价列表
     */

    @GET('GetAllForCRM')
    getAllForCRM(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMListResultDto1<CRMQuoteReplyDto>> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteReply/Create
     * CRM创建报价
     */

    @POST('Create')
    create(
        @Payload
        _req:CRMQuoteReplyDto

    ): Observable<CRMQuoteReplyDto> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteReply/GetLastForCRM
     * 根据询价Id获取最新报价
     */

    @GET('GetLastForCRM')
    getLastForCRM(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMQuoteReplyDto> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteReply/CheckExpiredReply
     * 检查过期报价
     */

    @POST('CheckExpiredReply')
    checkExpiredReply(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteReply/AcceptReply
     * 接受报价
     */

    @POST('AcceptReply')
    acceptReply(
        @Payload
        _req:CRMCoEntityDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteReply/ReplyBooking
     * 预定订舱（提供csp操作时，系统自动调用）
     */

    @POST('ReplyBooking')
    replyBooking(
        @Payload
        _req:CRMCoEntityDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteReply/RejectReply
     * 拒绝报价
     */

    @POST('RejectReply')
    rejectReply(
        @Payload
        _req:CRMCoEntityDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteReply/RequestNewReply
     * 再一次请求报价
     */

    @POST('RequestNewReply')
    requestNewReply(
        @Payload
        _req:CRMCoEntityDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteReply/Get
     * 暂无备注
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMQuoteReplyDto> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteReply/GetAll
     * 暂无备注
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {replyNo?:string,carrierId?:string,transitTime?:string,sailSchedule?:string,validStartDate?:string,validEndDate?:string,creationTime?:string,status?:number,quoteEnquiryId?:string,quoteReplyItems?:any[],carrierName?:string,onlyOceanTotalCharge?:string,totalCharge?:string,unifiedTotalCharge?:number,replyUserName?:string,id?:string} 

    ): Observable<CRMPagedResultDto1<CRMQuoteReplyDto>> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteReply/Update
     * 暂无备注
     */

    @PUT('Update')
    update(
        @Payload
        _req:CRMQuoteReplyDto

    ): Observable<CRMQuoteReplyDto> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteReply/Delete
     * 暂无备注
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
