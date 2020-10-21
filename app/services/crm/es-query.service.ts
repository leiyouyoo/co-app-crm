import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMEsPageQueryInput,CRMCrmEnquiryModel,CRMPagedResultDto, } from './crm.types';

@BaseUrl('/crm/EsQuery')
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



  }
