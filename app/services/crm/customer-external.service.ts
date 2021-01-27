import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { crmCustomerDto,crmCustomerBindCoUserDto,crmListResultDto1,crmPagedResultDto1,crmUserDetailInfo,crmGetByCustomerIdsOutput,crmGetCustomerAndPartnerOutput,crmCustomerAndContactDto,crmCustomerListDto,crmGetCustomerByNamesInput,crmShortCustomerDto,crmCompanyCustomerOutput,crmBecomeCooperationInput } from './crm.types';

@BaseUrl('/crm/CustomerExternal')
@Injectable({ providedIn: 'root' })
export class crmCustomerExternalService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/CustomerExternal/Get
     * 客户详情
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<crmCustomerDto> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExternal/GetCoUserByCustomer
     * 根据当前登录客户获取客户所属业务员、以及业务员所属的组织机构客户
     */

    @GET('GetCoUserByCustomer')
    getCoUserByCustomer(
        @Payload
        _req: {customerId?:string,includeOrganization?:boolean,searchText?:string} 

    ): Observable<crmCustomerBindCoUserDto> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExternal/GetSaleUsersByCustomer
     * 根据当前登录客户获取客户所属业务员集合
     */

    @GET('GetSaleUsersByCustomer')
    getSaleUsersByCustomer(
        @Payload
        _req: {customerId?:string,includeOrganization?:boolean,searchText?:string} 

    ): Observable<crmListResultDto1<crmCustomerBindCoUserDto>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExternal/GetInternalUsersByCustomer
     * 根据当前登录客户获取客户所属业务员集合
     */

    @GET('GetInternalUsersByCustomer')
    getInternalUsersByCustomer(
        @Payload
        _req: {customerId?:string,includeOrganization?:boolean,searchText?:string,isOwnDepartment?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmPagedResultDto1<crmUserDetailInfo>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExternal/GetByCustomerIds
     * 根据客户id集合返回客户集合
     */

    @POST('GetByCustomerIds')
    getByCustomerIds(
        @Payload
        _req: {} 

    ): Observable<crmListResultDto1<crmGetByCustomerIdsOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExternal/GetCustomerAndPartner
     * 获取当前客户所有的合作伙伴（包含客户自己的信息）
     */

    @GET('GetCustomerAndPartner')
    getCustomerAndPartner(
        @Payload
        _req: {customerId?:string,isRegistered?:boolean} 

    ): Observable<crmListResultDto1<crmGetCustomerAndPartnerOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExternal/GetCustomerAndContact
     * 搜索获取客户、联系人 (Rate询价列表可用)
     */

    @GET('GetCustomerAndContact')
    getCustomerAndContact(
        @Payload
        _req: {searchText?:string} 

    ): Observable<crmListResultDto1<crmCustomerAndContactDto>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExternal/GetAgentCustomers
     * 获取代理商客户
     */

    @GET('GetAgentCustomers')
    getAgentCustomers(
        @Payload
        _req: {ids?:any[],name?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmPagedResultDto1<crmCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExternal/GetByNames
     * 根据名称集合找对应的客户
     */

    @POST('GetByNames')
    getByNames(
        @Payload
        _req:crmGetCustomerByNamesInput

    ): Observable<crmListResultDto1<crmShortCustomerDto>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExternal/GetCompanyCustomers
     * 获取公司客户
     */

    @GET('GetCompanyCustomers')
    getCompanyCustomers(
        @Payload
        _req: {lang?:string,isActive?:boolean,isMarkDefault?:boolean,placeId?:string} 

    ): Observable<crmListResultDto1<crmCompanyCustomerOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerExternal/BecomeCooperation
     * 转成合作客户
     */

    @POST('BecomeCooperation')
    becomeCooperation(
        @Payload
        _req:crmBecomeCooperationInput

    ): Observable<any> {
        return null as any
    }



  }
