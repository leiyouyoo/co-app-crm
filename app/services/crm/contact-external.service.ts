import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMContactDto,CRMListResultDto1,CRMCustomerBindCoUserDto,CRMExternalContactListDto,CRMGetByCustomerIdsInput,CRMPagedResultDto1,CRMExternalCustomerContactInput,CRMSSOUser,CRMContactAndSaleOutput } from './crm.types';

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

    @GET('Get')
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

    @GET('GetByUserId')
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

    @GET('GetByUserIds')
    getByUserIds(
        @Payload
        _req: {userIds?:any[]} 

    ): Observable<CRMListResultDto1<CRMContactDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetUserInfoByUserIds
     * 获取SSO用户信息并带上用户所属客户信息
     */

    @GET('GetUserInfoByUserIds')
    getUserInfoByUserIds(
        @Payload
        _req: {userIds?:any[]} 

    ): Observable<CRMListResultDto1<CRMCustomerBindCoUserDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetAllPartnerContacts
     * 获取当前客户下所有合作伙伴的所有联系人
     */

    @GET('GetAllPartnerContacts')
    getAllPartnerContacts(
        @Payload
        _req: {isRegistered?:boolean} 

    ): Observable<CRMListResultDto1<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetRegisteredContactsByPartnerId
     * 获取合作伙伴下已开通账号的联系人
     */

    @GET('GetRegisteredContactsByPartnerId')
    getRegisteredContactsByPartnerId(
        @Payload
        _req: {partnerId?:string} 

    ): Observable<CRMListResultDto1<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetByCustomerOrPartner
     * 获取客户或合作伙伴的联系人
     */

    @GET('GetByCustomerOrPartner')
    getByCustomerOrPartner(
        @Payload
        _req: {partnerId?:string,customerId?:string,isRegistered?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMListResultDto1<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetByCustomerIds
     * 根据客户id集合获取下面所有的联系人(不包含合作伙伴)
     */

    @POST('GetByCustomerIds')
    getByCustomerIds(
        @Payload
        _req:CRMGetByCustomerIdsInput

    ): Observable<CRMListResultDto1<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetByCustomerAndPartner
     * 获取客户及合作伙伴的联系人
     */

    @GET('GetByCustomerAndPartner')
    getByCustomerAndPartner(
        @Payload
        _req: {searchText?:string,customerId?:string,isRegistered?:boolean} 

    ): Observable<CRMListResultDto1<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetSharedList
     * 分页获取共享联系人（客户以及合作伙伴、别人分享的地点下的联系人）
     */

    @GET('GetSharedList')
    getSharedList(
        @Payload
        _req: {customerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetByLocationId
     * 获取地点下的联系人
     */

    @GET('GetByLocationId')
    getByLocationId(
        @Payload
        _req: {locationId?:string} 

    ): Observable<CRMListResultDto1<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/AddUsersToLocation
     * 创建客户联系人（用户）并赋值到地点
     */

    @POST('AddUsersToLocation')
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

    @POST('CreateForCustomer')
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

    @POST('CreateForPartner')
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

    @PUT('Update')
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

    @DELETE('Delete')
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

    @GET('GetBySellerIdAsync')
    getBySellerIdAsync(
        @Payload
        _req: {sellerUserId?:number} 

    ): Observable<CRMListResultDto1<CRMExternalContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/ContactExternal/GetContactAndSaleByCustomerId
     * 获取客户下的联系人（包含合作伙伴的）,以及客户绑定的业务员
     */

    @GET('GetContactAndSaleByCustomerId')
    getContactAndSaleByCustomerId(
        @Payload
        _req: {customerId?:string} 

    ): Observable<CRMListResultDto1<CRMContactAndSaleOutput>> {
        return null as any
    }



  }
