import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMEsPageQueryInput,CRMCrmEnquiryModel,CRMPagedResultDto,CRMCrmCustomerChangeEventDto,CRMCrmEsPageQueryInput,CRMCrmCustomerModel, } from './crm.types';

@BaseUrl('/CRM/EsQuery')
@Injectable({ providedIn: 'root' })
export class CRMEsQueryService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/EsQuery/GetAllForES
     * 
     */

    @POST('getAllForES')
    getAllForES(
        @Payload
        _req:CRMEsPageQueryInput

    ): Observable<CRMPagedResultDto<CRMCrmEnquiryModel>> {
        return null as any
    }


    /**
     * @param url /CRM/EsQuery/SyncCrmEnquiry
     * 同步询价数据，仅测试时使用
     */

    @POST('syncCrmEnquiry')
    syncCrmEnquiry(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/EsQuery/SyncCrmCustomers
     * 
     */

    @POST('syncCrmCustomers')
    syncCrmCustomers(
        @Payload
        _req:CRMCrmCustomerChangeEventDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/EsQuery/RebuildIndex
     * 重置索引，可选删除文件
     */

    @GET('rebuildIndex')
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

    @POST('queryCustomers')
    queryCustomers(
        @Payload
        _req:CRMCrmEsPageQueryInput

    ): Observable<CRMPagedResultDto<CRMCrmCustomerModel>> {
        return null as any
    }



  }
