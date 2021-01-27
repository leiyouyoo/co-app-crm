import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMExternalPartnerDto,CRMPagedResultDto1,CRMExternalPartnerListDto,CRMListResultDto1,CRMExternalPartnerAndCustomerDto } from './crm.types';

@BaseUrl('/CRM/PartnerExternal')
@Injectable({ providedIn: 'root' })
export class CRMPartnerExternalService extends BaseApi {
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

    ): Observable<CRMExternalPartnerDto> {
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

    ): Observable<CRMPagedResultDto1<CRMExternalPartnerListDto>> {
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

    ): Observable<CRMListResultDto1<CRMExternalPartnerAndCustomerDto>> {
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

    ): Observable<CRMListResultDto1<CRMExternalPartnerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/PartnerExternal/Create
     * 创建客户下的合作伙伴
     */

    @POST('Create')
    create(
        @Payload
        _req:CRMExternalPartnerDto

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
        _req:CRMExternalPartnerDto

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
