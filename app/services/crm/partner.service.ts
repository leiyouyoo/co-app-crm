import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { crmPartnerDto,crmPagedResultDto1,crmPartnerListDto,crmCreateOrUpdatePartnerDto,crmPartnerBindCustomerInput,crmUnBindCustomerInput } from './crm.types';

@BaseUrl('/crm/Partner')
@Injectable({ providedIn: 'root' })
export class crmPartnerService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/Partner/Get
     * 根据合作伙伴id获取合作伙伴
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<crmPartnerDto> {
        return null as any
    }


    /**
     * @param url /CRM/Partner/GetAll
     * 分页获取客户下的合作伙伴
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {customerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmPagedResultDto1<crmPartnerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Partner/Create
     * 创建客户并创建合作伙伴(转为客户也可用)
     */

    @POST('Create')
    create(
        @Payload
        _req:crmCreateOrUpdatePartnerDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Partner/BindCustomer
     * 给合作伙伴绑定客户
     */

    @POST('BindCustomer')
    bindCustomer(
        @Payload
        _req:crmPartnerBindCustomerInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Partner/UnBindCustomer
     * 解除合作伙伴绑定的客户
     */

    @POST('UnBindCustomer')
    unBindCustomer(
        @Payload
        _req:crmUnBindCustomerInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Partner/Delete
     * 删除合作伙伴
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
