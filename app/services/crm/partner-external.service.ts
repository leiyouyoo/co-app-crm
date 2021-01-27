import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { crmExternalPartnerDto,crmPagedResultDto1,crmExternalPartnerListDto,crmListResultDto1,crmExternalPartnerAndCustomerDto } from './crm.types';

@BaseUrl('/crm/PartnerExternal')
@Injectable({ providedIn: 'root' })
export class crmPartnerExternalService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/PartnerExternal/Get
     * 根据合作伙伴id获取合作伙伴
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<crmExternalPartnerDto> {
        return null as any
    }


    /**
     * @param url /CRM/PartnerExternal/GetAll
     * 分页获取客户下的合作伙伴
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmPagedResultDto1<crmExternalPartnerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/PartnerExternal/GetMyCustomerAndPartners
     * 获取我的所属客户及绑定了客户的合作伙伴
     */

    @GET('GetMyCustomerAndPartners')
    getMyCustomerAndPartners(
        @Payload
        _req: {lang?:string,customerId?:string,includeLocations?:boolean} 

    ): Observable<crmListResultDto1<crmExternalPartnerAndCustomerDto>> {
        return null as any
    }


    /**
     * @param url /CRM/PartnerExternal/GetRegisteredPartners
     * 获取客户下开通了主账号的合作伙伴
     */

    @GET('GetRegisteredPartners')
    getRegisteredPartners(
        @Payload
        _req: {} 

    ): Observable<crmListResultDto1<crmExternalPartnerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/PartnerExternal/Create
     * 创建客户下的合作伙伴
     */

    @POST('Create')
    create(
        @Payload
        _req:crmExternalPartnerDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/PartnerExternal/Update
     * 更新合作伙伴
     */

    @PUT('Update')
    update(
        @Payload
        _req:crmExternalPartnerDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/PartnerExternal/Delete
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
