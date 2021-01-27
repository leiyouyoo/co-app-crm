import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMContactDto,CRMListResultDto,CRMCustomerBindCoUserDto,CRMExternalContactListDto,CRMGetByCustomerIdsInput,CRMPagedResultDto,CRMExternalCustomerContactInput,CRMSSOUser,CRMContactAndSaleOutput, } from './crm.types';

@BaseUrl('/CRM/ContactExternal')
@Injectable({ providedIn: 'root' })
export class CRMContactExternalService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/ContactExternal/Get
     * 根据联系人id获取联系人
     */

    @GET('get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMContactDto> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetByUserId
     * 根据用户id获取联系人
     */

    @GET('getByUserId')
    getByUserId(
        @Payload
        _req: {userId?:number} 

    ): Observable<CRMContactDto> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetByUserIds
     * 根据用户id集合获取联系人
     */

    @GET('getByUserIds')
    getByUserIds(
        @Payload
        _req: {userIds?:any[]} 

    ): Observable<CRMListResultDto<CRMContactDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetUserInfoByUserIds
     * 获取SSO用户信息并带上用户所属客户信息
     */

    @GET('getUserInfoByUserIds')
    getUserInfoByUserIds(
        @Payload
        _req: {userIds?:any[]} 

    ): Observable<CRMListResultDto<CRMCustomerBindCoUserDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetAllPartnerContacts
     * 获取当前客户下所有合作伙伴的所有联系人
     */

    @GET('getAllPartnerContacts')
    getAllPartnerContacts(
        @Payload
        _req: {isRegistered?:boolean} 

    ): Observable<CRMListResultDto<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetRegisteredContactsByPartnerId
     * 获取合作伙伴下已开通账号的联系人
     */

    @GET('getRegisteredContactsByPartnerId')
    getRegisteredContactsByPartnerId(
        @Payload
        _req: {partnerId?:string} 

    ): Observable<CRMListResultDto<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetByCustomerOrPartner
     * 获取客户或合作伙伴的联系人
     */

    @GET('getByCustomerOrPartner')
    getByCustomerOrPartner(
        @Payload
        _req: {partnerId?:string,customerId?:string,isRegistered?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMListResultDto<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetByCustomerIds
     * 根据客户id集合获取下面所有的联系人(不包含合作伙伴)
     */

    @POST('getByCustomerIds')
    getByCustomerIds(
        @Payload
        _req:CRMGetByCustomerIdsInput

    ): Observable<CRMListResultDto<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetByCustomerAndPartner
     * 获取客户及合作伙伴的联系人
     */

    @GET('getByCustomerAndPartner')
    getByCustomerAndPartner(
        @Payload
        _req: {searchText?:string,customerId?:string,isRegistered?:boolean} 

    ): Observable<CRMListResultDto<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetSharedList
     * 分页获取共享联系人（客户以及合作伙伴、别人分享的地点下的联系人）
     */

    @GET('getSharedList')
    getSharedList(
        @Payload
        _req: {customerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetByLocationId
     * 获取地点下的联系人
     */

    @GET('getByLocationId')
    getByLocationId(
        @Payload
        _req: {locationId?:string} 

    ): Observable<CRMListResultDto<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/AddUsersToLocation
     * 创建客户联系人（用户）并赋值到地点
     */

    @POST('addUsersToLocation')
    addUsersToLocation(
        @Payload
        _req:CRMExternalCustomerContactInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/CreateForCustomer
     * 创建客户联系人
     */

    @POST('createForCustomer')
    createForCustomer(
        @Payload
        _req:CRMExternalCustomerContactInput

    ): Observable<CRMSSOUser> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/CreateForPartner
     * 创建合作伙伴联系人
     */

    @POST('createForPartner')
    createForPartner(
        @Payload
        _req:CRMExternalCustomerContactInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/Update
     * 更新合作伙伴联系人
     */

    @PUT('update')
    update(
        @Payload
        _req:CRMExternalCustomerContactInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/Delete
     * 删除联系人
     */

    @DELETE('delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetBySellerIdAsync
     * 根据销售员用户Id获取联系人
     */

    @GET('getBySellerIdAsync')
    getBySellerIdAsync(
        @Payload
        _req: {sellerUserId?:number} 

    ): Observable<CRMListResultDto<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetContactAndSaleByCustomerId
     * 获取客户下的联系人（包含合作伙伴的）,以及客户绑定的业务员
     */

    @GET('getContactAndSaleByCustomerId')
    getContactAndSaleByCustomerId(
        @Payload
        _req: {customerId?:string} 

    ): Observable<CRMListResultDto<CRMContactAndSaleOutput>> {
        return null as any
    }



  }
