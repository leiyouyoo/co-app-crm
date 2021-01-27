import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { crmContactDto,crmListResultDto1,crmContactListDto,crmPagedResultDto1,crmCheckContactEmailInput,crmCheckContactEmailOutput,crmCheckMainContact,crmCommonResponse,crmCreateOrUpdateContactInput,crmCreateOrUpdateContactOutput,crmCoEntityDto,crmResetUserPasswordInput } from './crm.types';

@BaseUrl('/crm/Contact')
@Injectable({ providedIn: 'root' })
export class crmContactService extends BaseApi {
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

    ): Observable<crmContactDto> {
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

    ): Observable<crmListResultDto1<crmContactDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetAllByCustomer
     * 客户或合作伙伴的所有联系人(仅限业务员自己创建的)
     */

    @GET('GetAllByCustomer')
    getAllByCustomer(
        @Payload
        _req: {partnerId?:string,customerId?:string,isRegistered?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmListResultDto1<crmContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetByCustomerOrPartner
     * 分页获取客户或合作伙伴的联系人
     */

    @GET('GetByCustomerOrPartner')
    getByCustomerOrPartner(
        @Payload
        _req: {partnerId?:string,customerId?:string,isRegistered?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmPagedResultDto1<crmContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetAllCustomerAndPartnerContacts
     * 分页获取客户跟合作伙伴的联系人
     */

    @GET('GetAllCustomerAndPartnerContacts')
    getAllCustomerAndPartnerContacts(
        @Payload
        _req: {searchText?:string,isRegistered?:boolean,ids?:any[],sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmPagedResultDto1<crmContactListDto>> {
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

    ): Observable<crmListResultDto1<crmContactListDto>> {
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

    ): Observable<crmListResultDto1<crmContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/CheckEmailRepeat
     * 验证email是否注册过
     */

    @POST('CheckEmailRepeat')
    checkEmailRepeat(
        @Payload
        _req:crmCheckContactEmailInput

    ): Observable<crmCheckContactEmailOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/CheckHasMainContact
     * 验证是否已有主联系人
     */

    @POST('CheckHasMainContact')
    checkHasMainContact(
        @Payload
        _req:crmCheckMainContact

    ): Observable<crmCommonResponse> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/CreateForCustomer
     * 创建客户联系人(可选同步开通租户账号)
     */

    @POST('CreateForCustomer')
    createForCustomer(
        @Payload
        _req:crmCreateOrUpdateContactInput

    ): Observable<crmCreateOrUpdateContactOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/CreateForPartner
     * 创建合作伙伴联系人
     */

    @POST('CreateForPartner')
    createForPartner(
        @Payload
        _req:crmCreateOrUpdateContactInput

    ): Observable<crmCreateOrUpdateContactOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/Update
     * 更新联系人
     */

    @PUT('Update')
    update(
        @Payload
        _req:crmCreateOrUpdateContactInput

    ): Observable<crmCreateOrUpdateContactOutput> {
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
        _req:crmCoEntityDto

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
        _req:crmResetUserPasswordInput

    ): Observable<any> {
        return null as any
    }



  }
