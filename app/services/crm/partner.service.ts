import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMPartnerDto,CRMPagedResultDto1,CRMPartnerListDto,CRMCreateOrUpdatePartnerDto,CRMPartnerBindCustomerInput,CRMUnBindCustomerInput } from './crm.types';

@BaseUrl('/CRM/Partner')
@Injectable({ providedIn: 'root' })
export class CRMPartnerService extends BaseApi {
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

    ): Observable<CRMPartnerDto> {
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

    ): Observable<CRMPagedResultDto1<CRMPartnerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Partner/Create
     * 创建客户并创建合作伙伴(转为客户也可用)
     */

    @POST('Create')
    create(
        @Payload
        _req:CRMCreateOrUpdatePartnerDto

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
        _req:CRMPartnerBindCustomerInput

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
        _req:CRMUnBindCustomerInput

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
