import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { crmGetAccessAllowsByCustomerInput,crmListResultDto1,crmCustomerAccessAllowOutput,crmPagedResultDto1 } from './crm.types';

@BaseUrl('/crm/CustomerAccessAllow')
@Injectable({ providedIn: 'root' })
export class crmCustomerAccessAllowService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/CustomerAccessAllow/GetByCustomer
     * 根据客户获取所有业务员
     */

    @POST('GetByCustomer')
    getByCustomer(
        @Payload
        _req:crmGetAccessAllowsByCustomerInput

    ): Observable<crmListResultDto1<crmCustomerAccessAllowOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerAccessAllow/GetAll
     * 客户访问权限列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {customerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmPagedResultDto1<crmCustomerAccessAllowOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerAccessAllow/Create
     * 添加客户访问权限
     */

    @POST('Create')
    create(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
