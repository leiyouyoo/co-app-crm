import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMListResultDto1,CRMExternalLocationListDto,CRMExternalLocationDto,CRMPagedResultDto1,CRMFBALocationListDto,CRMGetLocationsForUiPickerInput,CRMLocationListDto,CRMCreateOrUpdateLocationExternalInput,CRMAssignUsersToLocationDto,CRMAssignLocationsToUserDto,CRMUnbindUsersLocationDto,CRMGlobalSearchInput,CRMGlobalSearchOutput,CRMMailLocationDto,CRMEditForBillOfLadingInput,CRMEditForComponentInput } from './crm.types';

@BaseUrl('/CRM/LocationExternal')
@Injectable({ providedIn: 'root' })
export class CRMLocationExternalService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/LocationExternal/GetLocationByCustomer
     * 获取客户下以及客户的合作伙伴的location、别人共享的地点
     */

    @GET('GetLocationByCustomer')
    getLocationByCustomer(
        @Payload
        _req: {customerId?:string} 

    ): Observable<CRMListResultDto1<CRMExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetLocationByCustomerOwn
     * 获取客户自己的全部地址
     */

    @GET('GetLocationByCustomerOwn')
    getLocationByCustomerOwn(
        @Payload
        _req: {customerId?:string} 

    ): Observable<CRMListResultDto1<CRMExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetLocationByCustomers
     * 获取客户自己的全部地址
     */

    @GET('GetLocationByCustomers')
    getLocationByCustomers(
        @Payload
        _req: {customerIds?:any[]} 

    ): Observable<CRMListResultDto1<CRMExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/Get
     * 根据Id查location
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMExternalLocationDto> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetForUpdate
     * 根据Id获取用于更新的location
     */

    @GET('GetForUpdate')
    getForUpdate(
        @Payload
        _req: {locationId?:string,partnerId?:string} 

    ): Observable<CRMExternalLocationDto> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetAll
     * 获取地点列表（客户自己的或者合作伙伴的）
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {partnerId?:string,customerId?:string,isAll?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetLocationByIds
     * 根据地点集合查找地点
     */

    @POST('GetLocationByIds')
    getLocationByIds(
        @Payload
        _req: {} 

    ): Observable<CRMListResultDto1<CRMExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetAllLocationByIds
     * 根据id获取地点集合(包括FBA)
     */

    @POST('GetAllLocationByIds')
    getAllLocationByIds(
        @Payload
        _req: {} 

    ): Observable<CRMListResultDto1<CRMExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetSharedList
     * 获取客户的共享地点(数据包含客户自己的、客户合作伙伴的、别人共享给客户的)
     */

    @GET('GetSharedList')
    getSharedList(
        @Payload
        _req: {isAll?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetFBALocations
     * 获取FBA地址
     */

    @GET('GetFBALocations')
    getFBALocations(
        @Payload
        _req: {isCityocean?:boolean} 

    ): Observable<CRMListResultDto1<CRMExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetFBALocationsByCustomer
     * 根据客户获取FBA地址
     */

    @GET('GetFBALocationsByCustomer')
    getFBALocationsByCustomer(
        @Payload
        _req: {customerId?:string} 

    ): Observable<CRMListResultDto1<CRMExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetCustomerLocationAndFBALocations
     * 获取客户的地址以及海外仓
     */

    @GET('GetCustomerLocationAndFBALocations')
    getCustomerLocationAndFBALocations(
        @Payload
        _req: {customerId?:string,countryId?:string} 

    ): Observable<CRMListResultDto1<CRMFBALocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetAllForUiPicker
     * 地点选择器
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:CRMGetLocationsForUiPickerInput

    ): Observable<CRMPagedResultDto1<CRMLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/CreateCustomerLocation
     * 创建客户地点
     */

    @POST('CreateCustomerLocation')
    createCustomerLocation(
        @Payload
        _req:CRMCreateOrUpdateLocationExternalInput

    ): Observable<CRMExternalLocationDto> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/UpdateForCustomerLocation
     * 更新客户地点
     */

    @PUT('UpdateForCustomerLocation')
    updateForCustomerLocation(
        @Payload
        _req:CRMCreateOrUpdateLocationExternalInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/CreatePartnerLocation
     * 创建合作伙伴地点
     */

    @POST('CreatePartnerLocation')
    createPartnerLocation(
        @Payload
        _req:CRMCreateOrUpdateLocationExternalInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/UpdateForPartnerLocation
     * 更新合作伙伴地点
     */

    @PUT('UpdateForPartnerLocation')
    updateForPartnerLocation(
        @Payload
        _req:CRMCreateOrUpdateLocationExternalInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetByContactId
     * 获取联系人的地点
     */

    @GET('GetByContactId')
    getByContactId(
        @Payload
        _req: {contactId?:string} 

    ): Observable<CRMListResultDto1<CRMExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/AssignUsersToLocation
     * 赋值用户（联系人）到地点
     */

    @POST('AssignUsersToLocation')
    assignUsersToLocation(
        @Payload
        _req:CRMAssignUsersToLocationDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/AssignLocationsToUser
     * 赋值地点给用户（联系人）
     */

    @POST('AssignLocationsToUser')
    assignLocationsToUser(
        @Payload
        _req:CRMAssignLocationsToUserDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/UnbindUserLocation
     * 解除联系人地点绑定关系
     */

    @POST('UnbindUserLocation')
    unbindUserLocation(
        @Payload
        _req:CRMUnbindUsersLocationDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/Delete
     * 删除地点
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GlobalSearch
     * 全局搜索
     */

    @POST('GlobalSearch')
    globalSearch(
        @Payload
        _req:CRMGlobalSearchInput

    ): Observable<CRMListResultDto1<CRMGlobalSearchOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/CreateMailLocation
     * 创建邮寄地址
     */

    @POST('CreateMailLocation')
    createMailLocation(
        @Payload
        _req:CRMMailLocationDto

    ): Observable<CRMMailLocationDto> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetMailLocations
     * 获取邮寄地址列表
     */

    @GET('GetMailLocations')
    getMailLocations(
        @Payload
        _req: {customerId?:string} 

    ): Observable<CRMListResultDto1<CRMMailLocationDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/EditForBillOfLading
     * 从提单处创建或编辑地点
     */

    @POST('EditForBillOfLading')
    editForBillOfLading(
        @Payload
        _req:CRMEditForBillOfLadingInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/EditForComponent
     * 从外部创建或编辑地点（FCM等）
     */

    @POST('EditForComponent')
    editForComponent(
        @Payload
        _req:CRMEditForComponentInput

    ): Observable<any> {
        return null as any
    }



  }
