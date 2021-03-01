import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMCustomerDto,CRMPagedResultDto1,CRMCustomerListDto,CRMMergeCustomerListInput,CRMGetAllForUiPickerInput,CRMListResultDto1,CRMExternalPartnerAndCustomerDto,CRMOwnerLessPagedResultDto1,CRMSearchCustomerOutput,CRMCreateOrUpdateCustomerInput,CRMCustomerOutput,CRMGetCustomerByNameInput,CRMCheckDeleteOutput,CRMCoEntityDto,CRMFollowCustomerInput,CRMAssignCustomerInput,CRMCustomerAndPartnerListDto,CRMShortCustomerDto,CRMCustomerAuthenticateDto,CRMAuditCustomerInput,CRMMergeCustomerInput,CRMRemergeCustomerInput,CRMCheckConfigure,CRMCustomerHighSeasPondSettingDto,CRMClaimCustomerInput,CRMTurnCustomerSeaInput,CRMCustomerAccountConfigureInput,CRMGetCustomerOrganizationOutput,CRMQueryHighSeasPondCustomerInput,CRMQueryHighSeasPondCustomerDto,CRMCustomerDetailDto,CRMQueryConnectionCustomerInput,CRMCustomerCommunalCheckInput,CRMCheckCustomerDto,CRMFAMCustomerDto,CRMCustomerRenamingApprovalInput,CRMRenamingDetailDto,CRMCustomerApplyModifyNameInput } from './crm.types';

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
        _req: {type?:number,searchText?:string,isCooperation?:boolean,customerOwnerIds?:any[],includeTaxes?:boolean,includeContacts?:boolean,includeShareOwner?:boolean,loadUser?:boolean,isUserContact?:boolean,isOwn?:boolean,customerId?:string,isPassedAudit?:boolean,customerStatus?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

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
        _req: {type?:number,searchText?:string,isCooperation?:boolean,customerOwnerIds?:any[],includeTaxes?:boolean,includeContacts?:boolean,includeShareOwner?:boolean,loadUser?:boolean,isUserContact?:boolean,isOwn?:boolean,customerId?:string,isPassedAudit?:boolean,customerStatus?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

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
        _req: {type?:number,searchText?:string,isCooperation?:boolean,customerOwnerIds?:any[],includeTaxes?:boolean,includeContacts?:boolean,includeShareOwner?:boolean,loadUser?:boolean,isUserContact?:boolean,isOwn?:boolean,customerId?:string,isPassedAudit?:boolean,customerStatus?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

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
        _req: {type?:number,searchText?:string,isCooperation?:boolean,customerOwnerIds?:any[],includeTaxes?:boolean,includeContacts?:boolean,includeShareOwner?:boolean,loadUser?:boolean,isUserContact?:boolean,isOwn?:boolean,customerId?:string,isPassedAudit?:boolean,customerStatus?:number,sorting?:string,maxResultCount?:number,skipCount?:number} 

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
     * @param url /CRM/Customer/RecoverDelete
     * 恢复客户--仅恢复客户
     */

    @POST('RecoverDelete')
    recoverDelete(
        @Payload
        _req:CRMCoEntityDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/SetDangerCustomer
     * 设为危险客户
     */

    @POST('SetDangerCustomer')
    setDangerCustomer(
        @Payload
        _req:CRMCoEntityDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/RecoverSetDangerCustomer
     * 取消危险客户
     */

    @POST('RecoverSetDangerCustomer')
    recoverSetDangerCustomer(
        @Payload
        _req:CRMCoEntityDto

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

    ): Observable<CRMMergeCustomerInput> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetCustomerMergeLogs
     * 获取客户合并记录
     */

    @GET('GetCustomerMergeLogs')
    getCustomerMergeLogs(
        @Payload
        _req: {customerId?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/RemergeCustomer
     * 撤销合并
     */

    @POST('RemergeCustomer')
    remergeCustomer(
        @Payload
        _req:CRMRemergeCustomerInput

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


    /**
     * @param url /CRM/Customer/SaveHighSeasPondSetting
     * 保存公海池配置
     */

    @POST('SaveHighSeasPondSetting')
    saveHighSeasPondSetting(
        @Payload
        _req:CRMCustomerHighSeasPondSettingDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetHighSeasPondSetting
     * 获取配置信息
     */

    @GET('GetHighSeasPondSetting')
    getHighSeasPondSetting(
        @Payload
        _req: {} 

    ): Observable<CRMCustomerHighSeasPondSettingDto> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/BulkClaimCustomer
     * 业务员认领客户(无论是否分配给自己都可以认领)
     */

    @POST('BulkClaimCustomer')
    bulkClaimCustomer(
        @Payload
        _req:CRMClaimCustomerInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/BulkTurnCustomerSea
     * 客户转移到公海(多个业务员时，只要有一个转移到公海都解绑)
     */

    @POST('BulkTurnCustomerSea')
    bulkTurnCustomerSea(
        @Payload
        _req:CRMTurnCustomerSeaInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/CustomerAccountConfigure
     * 客户CSP账号配置
     */

    @POST('CustomerAccountConfigure')
    customerAccountConfigure(
        @Payload
        _req:CRMCustomerAccountConfigureInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetCustomerOrganization
     * 获取客户组织结构
     */

    @GET('GetCustomerOrganization')
    getCustomerOrganization(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMListResultDto1<CRMGetCustomerOrganizationOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/QueryHighSeasPondCustomers
     * 公海池查询客户
     */

    @POST('QueryHighSeasPondCustomers')
    queryHighSeasPondCustomers(
        @Payload
        _req:CRMQueryHighSeasPondCustomerInput

    ): Observable<CRMPagedResultDto1<CRMQueryHighSeasPondCustomerDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetLeadTrackingPhase
     * 获取潜在客户追踪阶段
     */

    @GET('GetLeadTrackingPhase')
    getLeadTrackingPhase(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetAllExamineForCRMStatistics
     * CRM获取审批统计信息
     */

    @GET('GetAllExamineForCRMStatistics')
    getAllExamineForCRMStatistics(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetBusinessStatistics
     * 业务员获取所属业务数量
     */

    @GET('GetBusinessStatistics')
    getBusinessStatistics(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/GetDetail
     * 获取详情
     */

    @GET('GetDetail')
    getDetail(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMCustomerDetailDto> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/QueryConnectionCustomer
     * 获取可用关联客户列表
     */

    @POST('QueryConnectionCustomer')
    queryConnectionCustomer(
        @Payload
        _req:CRMQueryConnectionCustomerInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/CustomerCommunalCheckAsync
     * 通用验证客户数据
     */

    @POST('CustomerCommunalCheckAsync')
    customerCommunalCheckAsync(
        @Payload
        _req:CRMCustomerCommunalCheckInput

    ): Observable<CRMCheckCustomerDto> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/FAMGetCustomerDetail
     * 客户详情
     */

    @GET('FAMGetCustomerDetail')
    fAMGetCustomerDetail(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMFAMCustomerDto> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/FAMUpdate
     * 更新客户数据
     */

    @POST('FAMUpdate')
    fAMUpdate(
        @Payload
        _req:CRMCreateOrUpdateCustomerInput

    ): Observable<CRMCustomerOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/FAMCreate
     * 创建客户
     */

    @POST('FAMCreate')
    fAMCreate(
        @Payload
        _req:CRMCreateOrUpdateCustomerInput

    ): Observable<CRMCustomerOutput> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/CustomerCheckAsync
     * 验证客户数据
     */

    @POST('CustomerCheckAsync')
    customerCheckAsync(
        @Payload
        _req:CRMCreateOrUpdateCustomerInput

    ): Observable<CRMCheckCustomerDto> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/ApprovalRenaming
     * 审批改名
     */

    @POST('ApprovalRenaming')
    approvalRenaming(
        @Payload
        _req:CRMCustomerRenamingApprovalInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/ApplyRenamingDetail
     * 申请改名详情
     */

    @GET('ApplyRenamingDetail')
    applyRenamingDetail(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMRenamingDetailDto> {
        return null as any
    }


    /**
     * @param url /CRM/Customer/ApplyRenaming
     * 客户名称变更申请
     */

    @POST('ApplyRenaming')
    applyRenaming(
        @Payload
        _req:CRMCustomerApplyModifyNameInput

    ): Observable<any> {
        return null as any
    }



  }
