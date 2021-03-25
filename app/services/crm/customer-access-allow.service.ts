import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMGetAccessAllowsByCustomerInput,CRMListResultDto1,CRMCustomerAccessAllowOutput,CRMPagedResultDto1 } from './crm.types';

@BaseUrl('/CRM/CustomerAccessAllow')
@Injectable({ providedIn: 'root' })
export class CRMCustomerAccessAllowService extends BaseApi {
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
        _req:CRMGetAccessAllowsByCustomerInput

    ): Observable<CRMListResultDto1<CRMCustomerAccessAllowOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerAccessAllow/GetAll
     * 客户访问权限列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {customerId?:string,isAll?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerAccessAllowOutput>> {
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


    /**
     * @param url /CRM/CustomerAccessAllow/Delete
     * 删除客户访问权限
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {customerId?:string,accessAllowUserId?:number,accessAllowType?:number,id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
