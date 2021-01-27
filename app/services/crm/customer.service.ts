import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMCustomerDto,CRMPagedResultDto1,CRMCustomerListDto,CRMMergeCustomerListInput,CRMGetAllForUiPickerInput,CRMListResultDto1,CRMExternalPartnerAndCustomerDto,CRMOwnerLessPagedResultDto1,CRMSearchCustomerOutput,CRMCreateOrUpdateCustomerInput,CRMCustomerOutput,CRMGetCustomerByNameInput,CRMCheckDeleteOutput,CRMFollowCustomerInput,CRMAssignCustomerInput,CRMCustomerAndPartnerListDto,CRMShortCustomerDto,CRMCustomerAuthenticateDto,CRMAuditCustomerInput,CRMMergeCustomerInput,CRMCheckConfigure } from './crm.types';

@BaseUrl('/CRM/Customer')
@Injectable({ providedIn: 'root' })
export class CRMCustomerService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/Customer/Get
     * 客户详情
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMCustomerDto> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetAll
     * 分页获取我的客户
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {searchText?:string,customerOwnerIds?:any[],isCooperation?:boolean,includeTaxes?:boolean,includeContacts?:boolean,includeShareOwner?:boolean,loadUser?:boolean,isUserContact?:boolean,isOwn?:boolean,customerId?:string,isPassedAudit?:boolean,customerStatus?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetAllForMerge
     * 获取用于合并的客户
     */

    @POST('GetAllForMerge')
    getAllForMerge(
        @Payload
        _req:CRMMergeCustomerListInput

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetAllForUiPicker
     * 获取客户列表
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:CRMGetAllForUiPickerInput

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetMyCustomerAndPartners
     * 获取业务员的客户及合作伙伴
     */

    @GET('GetMyCustomerAndPartners')
    getMyCustomerAndPartners(
        @Payload
        _req: {includeLocations?:boolean} 

    ): Observable<CRMListResultDto1<CRMExternalPartnerAndCustomerDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetMyCustomerAndPartnersWithLocationsAndContacts
     * 获取业务员的客户及合作伙伴(包含联系人与地址)
     */

    @GET('GetMyCustomerAndPartnersWithLocationsAndContacts')
    getMyCustomerAndPartnersWithLocationsAndContacts(
        @Payload
        _req: {} 

    ): Observable<CRMListResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetShares
     * 分页获取共享客户
     */

    @GET('GetShares')
    getShares(
        @Payload
        _req: {searchText?:string,customerOwnerIds?:any[],isCooperation?:boolean,includeTaxes?:boolean,includeContacts?:boolean,includeShareOwner?:boolean,loadUser?:boolean,isUserContact?:boolean,isOwn?:boolean,customerId?:string,isPassedAudit?:boolean,customerStatus?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetShareSources
     * 分页获取共享资源库
     */

    @GET('GetShareSources')
    getShareSources(
        @Payload
        _req: {searchText?:string,customerOwnerIds?:any[],isCooperation?:boolean,includeTaxes?:boolean,includeContacts?:boolean,includeShareOwner?:boolean,loadUser?:boolean,isUserContact?:boolean,isOwn?:boolean,customerId?:string,isPassedAudit?:boolean,customerStatus?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetOwnerlessCustomer
     * 获取无主客户
     */

    @GET('GetOwnerlessCustomer')
    getOwnerlessCustomer(
        @Payload
        _req: {searchText?:string,customerOwnerIds?:any[],isCooperation?:boolean,includeTaxes?:boolean,includeContacts?:boolean,includeShareOwner?:boolean,loadUser?:boolean,isUserContact?:boolean,isOwn?:boolean,customerId?:string,isPassedAudit?:boolean,customerStatus?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMOwnerLessPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetOwnerCustomers
     * 获取当前业务员拥有的所有客户(开通租户的，包含联系人集合、地点集合)
     */

    @GET('GetOwnerCustomers')
    getOwnerCustomers(
        @Payload
        _req: {userId?:number} 

    ): Observable<CRMListResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetOwnerCustomersBySalesId
     * 获取当前业务员拥有的所有客户(开通账号的)
     */

    @GET('GetOwnerCustomersBySalesId')
    getOwnerCustomersBySalesId(
        @Payload
        _req: {userId?:number,isRegistered?:boolean} 

    ): Observable<CRMListResultDto1<CRMCustomerDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetAllBySearch
     * 分页搜索客户
     */

    @GET('GetAllBySearch')
    getAllBySearch(
        @Payload
        _req: {ids?:any[],name?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetPeerAndDirectClient
     * 分页搜索直客跟同行客户（Rate用）
     */

    @GET('GetPeerAndDirectClient')
    getPeerAndDirectClient(
        @Payload
        _req: {customerType?:number,ids?:any[],name?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetForwardingCompanies
     * 分页搜索同行客户
     */

    @GET('GetForwardingCompanies')
    getForwardingCompanies(
        @Payload
        _req: {searchText?:string,includeDefault?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMSearchCustomerOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetCustomerPartners
     * 获取客户的合作伙伴对应的客户集合
     */

    @GET('GetCustomerPartners')
    getCustomerPartners(
        @Payload
        _req: {customerId?:string} 

    ): Observable<CRMListResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetCustomerByName
     * 根据名称搜索客户（绑定合作伙伴搜索客户可用）
     */

    @GET('GetCustomerByName')
    getCustomerByName(
        @Payload
        _req: {name?:string,customerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetCustomerByNameOrCode
     * 根据名称或代码搜索客户
     */

    @GET('GetCustomerByNameOrCode')
    getCustomerByNameOrCode(
        @Payload
        _req: {searchText?:string,customerStatus?:number,isShared?:boolean,isOwnerLess?:boolean} 

    ): Observable<CRMListResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetForUpdate
     * 获取客户用于更新
     */

    @GET('GetForUpdate')
    getForUpdate(
        @Payload
        _req: {customerId?:string} 

    ): Observable<CRMCreateOrUpdateCustomerInput> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/Create
     * 创建客户
     */

    @POST('Create')
    create(
        @Payload
        _req:CRMCreateOrUpdateCustomerInput

    ): Observable<CRMCustomerOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/CheckDuplicateName
     * 校验客户重复名称
     */

    @POST('CheckDuplicateName')
    checkDuplicateName(
        @Payload
        _req:CRMGetCustomerByNameInput

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/Update
     * 更新客户
     */

    @PUT('Update')
    update(
        @Payload
        _req:CRMCreateOrUpdateCustomerInput

    ): Observable<CRMCustomerOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/CheckDelete
     * 验证删除
     */

    @POST('CheckDelete')
    checkDelete(
        @Payload
        _req: {customerId?:string} 

    ): Observable<CRMCheckDeleteOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/Delete
     * 删除客户
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/ClaimCustomer
     * 认领客户（认领无主客户）
     */

    @POST('ClaimCustomer')
    claimCustomer(
        @Payload
        _req:CRMFollowCustomerInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/FollowCustomer
     * 跟进客户（获取共享客户权限）
     */

    @POST('FollowCustomer')
    followCustomer(
        @Payload
        _req:CRMFollowCustomerInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/TransferCustomer
     * 转让客户/指派客户
     */

    @POST('TransferCustomer')
    transferCustomer(
        @Payload
        _req:CRMAssignCustomerInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetCustomerByType
     * 根据类型获取客户（船东、航空等类型）
     */

    @GET('GetCustomerByType')
    getCustomerByType(
        @Payload
        _req: {customerType:number,name?:string,customerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMListResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetPageCustomerByType
     * 根据类型获取客户（分页）
     */

    @GET('GetPageCustomerByType')
    getPageCustomerByType(
        @Payload
        _req: {customerType:number,name?:string,customerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetDepartmentCustomer
     * 获取部门所有人员的客户
     */

    @GET('GetDepartmentCustomer')
    getDepartmentCustomer(
        @Payload
        _req: {name?:string,customerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetCurrentCustomerAndPartner
     * 获取当前业务员所拥有的客户及合作伙伴(Rate创建询价用)
     */

    @GET('GetCurrentCustomerAndPartner')
    getCurrentCustomerAndPartner(
        @Payload
        _req: {includePartner?:boolean} 

    ): Observable<CRMListResultDto1<CRMCustomerAndPartnerListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetUserOwnCompanyCustomer
     * 获取用户所拥有的（或所属）公司
     */

    @GET('GetUserOwnCompanyCustomer')
    getUserOwnCompanyCustomer(
        @Payload
        _req: {} 

    ): Observable<CRMListResultDto1<CRMShortCustomerDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetCustomerConfigure
     * 获取客户配置
     */

    @GET('GetCustomerConfigure')
    getCustomerConfigure(
        @Payload
        _req: {customerId?:string} 

    ): Observable<CRMCustomerAuthenticateDto> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/CustomerConfigure
     * 客户配置\开通主账号
     */

    @POST('CustomerConfigure')
    customerConfigure(
        @Payload
        _req:CRMCustomerAuthenticateDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/UpdateCustomerConfigure
     * 更新客户配置
     */

    @PUT('UpdateCustomerConfigure')
    updateCustomerConfigure(
        @Payload
        _req:CRMCustomerAuthenticateDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/AuditCustomer
     * 提交审核客户
     */

    @POST('AuditCustomer')
    auditCustomer(
        @Payload
        _req:CRMAuditCustomerInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/MergeCustomer
     * 合并客户
     */

    @POST('MergeCustomer')
    mergeCustomer(
        @Payload
        _req:CRMMergeCustomerInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetCheckConfigure
     * 获取客户查验配置
     */

    @GET('GetCheckConfigure')
    getCheckConfigure(
        @Payload
        _req: {} 

    ): Observable<CRMCheckConfigure> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/UpdateCheckConfigureStatus
     * 更新客户查验配置状态
     */

    @POST('UpdateCheckConfigureStatus')
    updateCheckConfigureStatus(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
