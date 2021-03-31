import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMContactDto,CRMListResultDto1,CRMContactListDto,CRMPagedResultDto1,CRMGetAllSalesAndContactsOutput,CRMCheckContactEmailInput,CRMCheckContactEmailOutput,CRMCheckMainContact,CRMCommonResponse,CRMCreateOrUpdateContactInput,CRMCreateOrUpdateContactOutput,CRMCoEntityDto,CRMResetUserPasswordInput } from './crm.types';

@BaseUrl('/CRM/Contact')
@Injectable({ providedIn: 'root' })
export class CRMContactService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/Contact/Get
     * 获取联系人详情
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMContactDto> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetByIds
     * 根据联系人id集合获取联系人集合
     */

    @GET('GetByIds')
    getByIds(
        @Payload
        _req: {ids?:any[]} 

    ): Observable<CRMListResultDto1<CRMContactDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetAllByCustomer
     * 客户或合作伙伴的所有联系人(仅限业务员自己创建的)
     */

    @GET('GetAllByCustomer')
    getAllByCustomer(
        @Payload
        _req: {partnerId?:string,customerId?:string,isRegistered?:boolean,bindLocationId?:string,isAll?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMListResultDto1<CRMContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetByCustomerOrPartner
     * 分页获取客户或合作伙伴的联系人
     */

    @GET('GetByCustomerOrPartner')
    getByCustomerOrPartner(
        @Payload
        _req: {partnerId?:string,customerId?:string,isRegistered?:boolean,bindLocationId?:string,isAll?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetAllCustomerAndPartnerContacts
     * 分页获取客户跟合作伙伴的联系人
     */

    @GET('GetAllCustomerAndPartnerContacts')
    getAllCustomerAndPartnerContacts(
        @Payload
        _req: {searchText?:string,isRegistered?:boolean,ids?:any[],isAll?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetByLocationId
     * 获取地点下的联系人
     */

    @GET('GetByLocationId')
    getByLocationId(
        @Payload
        _req: {locationId?:string} 

    ): Observable<CRMListResultDto1<CRMContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetByNameOrTel
     * 根据联系人名称或电话搜索
     */

    @GET('GetByNameOrTel')
    getByNameOrTel(
        @Payload
        _req: {searchText?:string,type?:number} 

    ): Observable<CRMListResultDto1<CRMContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetAllSalesAndContacts
     * 获取业务员和联系人列表
     */

    @GET('GetAllSalesAndContacts')
    getAllSalesAndContacts(
        @Payload
        _req: {customerId?:string,searchText?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMGetAllSalesAndContactsOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/CheckEmailRepeat
     * 验证email是否注册过
     */

    @POST('CheckEmailRepeat')
    checkEmailRepeat(
        @Payload
        _req:CRMCheckContactEmailInput

    ): Observable<CRMCheckContactEmailOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/CheckHasMainContact
     * 验证是否已有主联系人
     */

    @POST('CheckHasMainContact')
    checkHasMainContact(
        @Payload
        _req:CRMCheckMainContact

    ): Observable<CRMCommonResponse> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/CreateForCustomer
     * 创建客户联系人(可选同步开通租户账号)
     */

    @POST('CreateForCustomer')
    createForCustomer(
        @Payload
        _req:CRMCreateOrUpdateContactInput

    ): Observable<CRMCreateOrUpdateContactOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/CreateForPartner
     * 创建合作伙伴联系人
     */

    @POST('CreateForPartner')
    createForPartner(
        @Payload
        _req:CRMCreateOrUpdateContactInput

    ): Observable<CRMCreateOrUpdateContactOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/Update
     * 更新联系人
     */

    @PUT('Update')
    update(
        @Payload
        _req:CRMCreateOrUpdateContactInput

    ): Observable<CRMCreateOrUpdateContactOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/EnableAsync
     * 启用联系人
     */

    @POST('EnableAsync')
    enableAsync(
        @Payload
        _req:CRMCoEntityDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/Delete
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
     * @param url /CRM/Contact/UnbindOrDeleteUser
     * 解绑/删除用户
     */

    @POST('UnbindOrDeleteUser')
    unbindOrDeleteUser(
        @Payload
        _req:CRMCoEntityDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/ResetUserPassword
     * 重置密码
     */

    @POST('ResetUserPassword')
    resetUserPassword(
        @Payload
        _req:CRMResetUserPasswordInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetAllForFam
     * FAM-分页获取客户或合作伙伴的联系人
     */

    @GET('GetAllForFam')
    getAllForFam(
        @Payload
        _req: {partnerId?:string,customerId?:string,isRegistered?:boolean,bindLocationId?:string,isAll?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMContactListDto>> {
        return null as any
    }



  }
