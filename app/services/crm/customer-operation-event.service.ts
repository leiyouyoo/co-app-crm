import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMGetAllInput,CRMPagedResultDto1,CRMCustomerOperationEventDto,CRMCreateInput } from './crm.types';

@BaseUrl('/CRM/CustomerOperationEvent')
@Injectable({ providedIn: 'root' })
export class CRMCustomerOperationEventService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/CustomerOperationEvent/GetAll
     * 获取操作事件列表
     */

    @POST('GetAll')
    getAll(
        @Payload
        _req:CRMGetAllInput

    ): Observable<CRMPagedResultDto1<CRMCustomerOperationEventDto>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerOperationEvent/Create
     * 创建操作事件
     */

    @POST('Create')
    create(
        @Payload
        _req:CRMCreateInput

    ): Observable<any> {
        return null as any
    }



  }
