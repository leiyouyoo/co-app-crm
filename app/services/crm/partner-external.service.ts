import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMExternalPartnerDto,CRMExternalPartnerListDto,CRMPagedResultDto,CRMExternalPartnerAndCustomerDto,CRMListResultDto, } from './crm.types';

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

    @GET('get')
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

    @GET('getAll')
    getAll(
        @Payload
        _req: {sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto<CRMExternalPartnerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/PartnerExternal/GetMyCustomerAndPartners
     * 获取我的所属客户及绑定了客户的合作伙伴
     */

    @GET('getMyCustomerAndPartners')
    getMyCustomerAndPartners(
        @Payload
        _req: {lang?:string,customerId?:string,includeLocations?:boolean} 

    ): Observable<CRMListResultDto<CRMExternalPartnerAndCustomerDto>> {
        return null as any
    }


    /**
     * @param url /CRM/PartnerExternal/GetRegisteredPartners
     * 获取客户下开通了主账号的合作伙伴
     */

    @GET('getRegisteredPartners')
    getRegisteredPartners(
        @Payload
        _req: {} 

    ): Observable<CRMListResultDto<CRMExternalPartnerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/PartnerExternal/Create
     * 创建客户下的合作伙伴
     */

    @POST('create')
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

    @PUT('update')
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

    @DELETE('delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
