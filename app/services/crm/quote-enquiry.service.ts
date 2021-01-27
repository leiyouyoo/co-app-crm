import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMQuoteEnquiryDto,CRMPagedResultDto1,CRMQuoteEnquiryListForCRMOutput,CRMQuoteEnquiryListForCRMInput,CRMListResultDto1,CRMCustomerListModel,CRMGetRelatedQuoteForCRMOutput,CRMGetListByRouteForCRMOutput,CRMQuoteEnquiryListForCSPInput,CRMQuoteEnquiryListForCSPOutput } from './crm.types';

@BaseUrl('/CRM/QuoteEnquiry')
@Injectable({ providedIn: 'root' })
export class CRMQuoteEnquiryService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/QuoteEnquiry/GetForCRM
     * CRM获取详情页（询报价均有返回）
     */

    @GET('GetForCRM')
    getForCRM(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMQuoteEnquiryDto> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetAllForCRM
     * CRM获取询价列表
     */

    @GET('GetAllForCRM')
    getAllForCRM(
        @Payload
        _req: {status?:number,tradeTypes?:string,quoteNo?:string,historyDataType?:number,userId?:number,customerId?:string,name?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMQuoteEnquiryListForCRMOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetAllForES
     * CRM获取询价列表(针对ES查询)
     */

    @POST('GetAllForES')
    getAllForES(
        @Payload
        _req:CRMQuoteEnquiryListForCRMInput

    ): Observable<CRMPagedResultDto1<CRMQuoteEnquiryListForCRMOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetCRMCustomerAndUserHistorys
     * CRM获取所有客户用户历史数据(条件检索)
     */

    @GET('GetCRMCustomerAndUserHistorys')
    getCRMCustomerAndUserHistorys(
        @Payload
        _req: {} 

    ): Observable<CRMListResultDto1<CRMQuoteEnquiryListForCRMInput>> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetCRMCustomerBindUserHistorys
     * CRM获取客户最近5条数据联动用户
     */

    @GET('GetCRMCustomerBindUserHistorys')
    getCRMCustomerBindUserHistorys(
        @Payload
        _req: {} 

    ): Observable<CRMListResultDto1<CRMCustomerListModel>> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetRelatedQuoteForCRM
     * CRM获取相关的报价（询价路线和订舱路线全匹配），用来选择报价（只有沟通中、已接受的）
     */

    @GET('GetRelatedQuoteForCRM')
    getRelatedQuoteForCRM(
        @Payload
        _req: {originPortId?:string,originAddressId?:string,destinationPortId?:string,destinationAddressId?:string,incotermsString?:string,shipperCustomerId?:string,consigneeCustomerId?:string} 

    ): Observable<CRMGetRelatedQuoteForCRMOutput> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetListByRouteForCRM
     * 根据路线匹配询价信息（用于复制价格）
     */

    @GET('GetListByRouteForCRM')
    getListByRouteForCRM(
        @Payload
        _req: {id?:string,destinationAddressId?:string,originAddressId?:string,destinationPortId?:string,originPortId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMGetListByRouteForCRMOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetAll
     * 获取列表
     */

    @POST('GetAll')
    getAll(
        @Payload
        _req:CRMQuoteEnquiryListForCSPInput

    ): Observable<CRMPagedResultDto1<CRMQuoteEnquiryDto>> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/Create
     * CSP创建询价 / CRM创建询报价
     */

    @POST('Create')
    create(
        @Payload
        _req:CRMQuoteEnquiryDto

    ): Observable<CRMQuoteEnquiryDto> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetTeamUser
     * 根据询价Id获取拥有者和绑定销售
     */

    @GET('GetTeamUser')
    getTeamUser(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetListByIds
     * 根据多个QuoteEnquiryId获取对应详情
     */

    @POST('GetListByIds')
    getListByIds(
        @Payload
        _req: {} 

    ): Observable<CRMListResultDto1<CRMQuoteEnquiryDto>> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetForCSP
     * CSP获取详情页（询报价均有返回）
     */

    @GET('GetForCSP')
    getForCSP(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMQuoteEnquiryDto> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetAllForCSP
     * CSP获取询价列表
     */

    @POST('GetAllForCSP')
    getAllForCSP(
        @Payload
        _req:CRMQuoteEnquiryListForCSPInput

    ): Observable<CRMPagedResultDto1<CRMQuoteEnquiryListForCSPOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/GetHistorys
     * CSP获取历史包括（港口、地址、FBA地址等）
     */

    @GET('GetHistorys')
    getHistorys(
        @Payload
        _req: {historyDataType?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<any>> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/Get
     * 暂无备注
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMQuoteEnquiryDto> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/Update
     * 暂无备注
     */

    @PUT('Update')
    update(
        @Payload
        _req:CRMQuoteEnquiryDto

    ): Observable<CRMQuoteEnquiryDto> {
        return null as any
    }


    /**
     * @param url /CRM/QuoteEnquiry/Delete
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
