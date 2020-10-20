import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMContactDto,CRMListResultDto,CRMContactListDto,CRMPagedResultDto,CRMCheckContactEmailInput,CRMCheckContactEmailOutput,CRMCheckMainContact,CRMCommonResponse,CRMCreateOrUpdateContactInput,CRMCreateOrUpdateContactOutput,CRMCoEntityDto,CRMResetUserPasswordInput, } from './crm.types';

@BaseUrl('/crm/Contact')
@Injectable({ providedIn: 'root' })
export class CRMContactService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/Contact/Get
     * 获取联系人详情
     */

    @GET('get')
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

    @GET('getByIds')
    getByIds(
        @Payload
        _req: {ids?:any[]} 

    ): Observable<CRMListResultDto<CRMContactDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetAllByCustomer
     * 客户或合作伙伴的所有联系人(仅限业务员自己创建的)
     */

    @GET('getAllByCustomer')
    getAllByCustomer(
        @Payload
        _req: {partnerId?:string,customerId?:string,isRegistered?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMListResultDto<CRMContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetByCustomerOrPartner
     * 分页获取客户或合作伙伴的联系人
     */

    @GET('getByCustomerOrPartner')
    getByCustomerOrPartner(
        @Payload
        _req: {partnerId?:string,customerId?:string,isRegistered?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto<CRMContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetAllCustomerAndPartnerContacts
     * 分页获取客户跟合作伙伴的联系人
     */

    @GET('getAllCustomerAndPartnerContacts')
    getAllCustomerAndPartnerContacts(
        @Payload
        _req: {searchText?:string,isRegistered?:boolean,ids?:any[],sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto<CRMContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetByLocationId
     * 获取地点下的联系人
     */

    @GET('getByLocationId')
    getByLocationId(
        @Payload
        _req: {locationId?:string} 

    ): Observable<CRMListResultDto<CRMContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/GetByNameOrTel
     * 根据联系人名称或电话搜索
     */

    @GET('getByNameOrTel')
    getByNameOrTel(
        @Payload
        _req: {searchText?:string,type?:number} 

    ): Observable<CRMListResultDto<CRMContactListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/CheckEmailRepeat
     * 验证email是否注册过
     */

    @POST('checkEmailRepeat')
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

    @POST('checkHasMainContact')
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

    @POST('createForCustomer')
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

    @POST('createForPartner')
    createForPartner(
        @Payload
        _req:CRMCreateOrUpdateContactInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/Update
     * 更新联系人
     */

    @PUT('update')
    update(
        @Payload
        _req:CRMCreateOrUpdateContactInput

    ): Observable<CRMCreateOrUpdateContactOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Contact/Delete
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
     * @param url /CRM/Contact/UnbindOrDeleteUser
     * 解绑/删除用户
     */

    @POST('unbindOrDeleteUser')
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

    @POST('resetUserPassword')
    resetUserPassword(
        @Payload
        _req:CRMResetUserPasswordInput

    ): Observable<any> {
        return null as any
    }



  }
