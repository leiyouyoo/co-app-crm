import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMGetAccessAllowsByCustomerInput,CRMCustomerAccessAllowOutput,CRMListResultDto,CRMPagedResultDto, } from './crm.types';

@BaseUrl('/crm/CustomerAccessAllow')
@Injectable({ providedIn: 'root' })
export class CRMCustomerAccessAllowService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/CustomerAccessAllow/GetByCustomer
     * 根据客户获取所有业务员
     */

    @POST('getByCustomer')
    getByCustomer(
        @Payload
        _req:CRMGetAccessAllowsByCustomerInput

    ): Observable<CRMListResultDto<CRMCustomerAccessAllowOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerAccessAllow/GetAll
     * 客户访问权限列表
     */

    @GET('getAll')
    getAll(
        @Payload
        _req: {customerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto<CRMCustomerAccessAllowOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerAccessAllow/Create
     * 添加客户访问权限
     */

    @POST('create')
    create(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
