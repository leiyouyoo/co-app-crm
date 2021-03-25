import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMQueryCrmEnquiryInput,CRMPagedResultDto1,CRMCrmEnquiryModel,CRMEsPageQueryInput,CRMCrmCustomerModel,CRMGetAllForUiPickerInput,CRMCustomerListDto,CRMCrmCustomerExamineModel,CRMEntityDto1,CRMCrmCustomerChangeEventDto,CRMCrmCustomerExamineChangeEventDto,CRMCrmEsPageQueryInput } from './crm.types';

@BaseUrl('/CRM/EsQuery')
@Injectable({ providedIn: 'root' })
export class CRMEsQueryService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/EsQuery/GetAllForES
     * ES获取客户询报价
     */

    @POST('GetAllForES')
    getAllForES(
        @Payload
        _req:CRMQueryCrmEnquiryInput

    ): Observable<CRMPagedResultDto1<CRMCrmEnquiryModel>> {
        return null as any
    }


    /**
     * @param url /CRM/EsQuery/GetAllCustomerForES
     * ES获取客户信息
     */

    @POST('GetAllCustomerForES')
    getAllCustomerForES(
        @Payload
        _req:CRMEsPageQueryInput

    ): Observable<CRMPagedResultDto1<CRMCrmCustomerModel>> {
        return null as any
    }


    /**
     * @param url /CRM/EsQuery/GetAllForUiPickerForES
     * ES获取客户列表，用于前端客户选择器
     */

    @POST('GetAllForUiPickerForES')
    getAllForUiPickerForES(
        @Payload
        _req:CRMGetAllForUiPickerInput

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/EsQuery/GetAllCustomerExamineForES
     * ES获取客户审批信息
     */

    @POST('GetAllCustomerExamineForES')
    getAllCustomerExamineForES(
        @Payload
        _req:CRMEsPageQueryInput

    ): Observable<CRMPagedResultDto1<CRMCrmCustomerExamineModel>> {
        return null as any
    }


    /**
     * @param url /CRM/EsQuery/SyncCrmEnquiry
     * 同步询价数据，仅测试时使用
     */

    @POST('SyncCrmEnquiry')
    syncCrmEnquiry(
        @Payload
        _req:CRMEntityDto1<any>

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/EsQuery/SyncCrmCustomers
     * 同步客户数据
     */

    @POST('SyncCrmCustomers')
    syncCrmCustomers(
        @Payload
        _req:CRMCrmCustomerChangeEventDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/EsQuery/SyncCrmCustomerExamines
     * 同步客户审批数据
     */

    @POST('SyncCrmCustomerExamines')
    syncCrmCustomerExamines(
        @Payload
        _req:CRMCrmCustomerExamineChangeEventDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/EsQuery/RebuildIndex
     * 重置索引，可选删除文件
     */

    @GET('RebuildIndex')
    rebuildIndex(
        @Payload
        _req: {deleteIndex?:boolean} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/EsQuery/QueryCustomers
     * 查询用户数据
     */

    @POST('QueryCustomers')
    queryCustomers(
        @Payload
        _req:CRMCrmEsPageQueryInput

    ): Observable<CRMPagedResultDto1<CRMCrmCustomerModel>> {
        return null as any
    }



  }
