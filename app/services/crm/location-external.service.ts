import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { crmListResultDto1,crmExternalLocationListDto,crmExternalLocationDto,crmPagedResultDto1,crmFBALocationListDto,crmGetLocationsForUiPickerInput,crmLocationListDto,crmCreateOrUpdateLocationExternalInput,crmAssignUsersToLocationDto,crmAssignLocationsToUserDto,crmUnbindUsersLocationDto,crmGlobalSearchInput,crmGlobalSearchOutput,crmMailLocationDto,crmEditForBillOfLadingInput } from './crm.types';

@BaseUrl('/crm/LocationExternal')
@Injectable({ providedIn: 'root' })
export class crmLocationExternalService extends BaseApi {
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

    ): Observable<crmListResultDto1<crmExternalLocationListDto>> {
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

    ): Observable<crmListResultDto1<crmExternalLocationListDto>> {
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

    ): Observable<crmExternalLocationDto> {
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

    ): Observable<crmExternalLocationDto> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetAll
     * 获取地点列表（客户自己的或者合作伙伴的）
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {partnerId?:string,customerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmPagedResultDto1<crmExternalLocationListDto>> {
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

    ): Observable<crmListResultDto1<crmExternalLocationListDto>> {
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

    ): Observable<crmListResultDto1<crmExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetSharedList
     * 获取客户的共享地点(数据包含客户自己的、客户合作伙伴的、别人共享给客户的)
     */

    @GET('GetSharedList')
    getSharedList(
        @Payload
        _req: {sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmPagedResultDto1<crmExternalLocationListDto>> {
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

    ): Observable<crmListResultDto1<crmExternalLocationListDto>> {
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

    ): Observable<crmListResultDto1<crmExternalLocationListDto>> {
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

    ): Observable<crmListResultDto1<crmFBALocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/GetAllForUiPicker
     * 地点选择器
     */

    @POST('GetAllForUiPicker')
    getAllForUiPicker(
        @Payload
        _req:crmGetLocationsForUiPickerInput

    ): Observable<crmPagedResultDto1<crmLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/CreateCustomerLocation
     * 创建客户地点
     */

    @POST('CreateCustomerLocation')
    createCustomerLocation(
        @Payload
        _req:crmCreateOrUpdateLocationExternalInput

    ): Observable<crmExternalLocationDto> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/UpdateForCustomerLocation
     * 更新客户地点
     */

    @PUT('UpdateForCustomerLocation')
    updateForCustomerLocation(
        @Payload
        _req:crmCreateOrUpdateLocationExternalInput

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
        _req:crmCreateOrUpdateLocationExternalInput

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
        _req:crmCreateOrUpdateLocationExternalInput

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

    ): Observable<crmListResultDto1<crmExternalLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/AssignUsersToLocation
     * 赋值用户（联系人）到地点
     */

    @POST('AssignUsersToLocation')
    assignUsersToLocation(
        @Payload
        _req:crmAssignUsersToLocationDto

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
        _req:crmAssignLocationsToUserDto

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
        _req:crmUnbindUsersLocationDto

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
        _req:crmGlobalSearchInput

    ): Observable<crmListResultDto1<crmGlobalSearchOutput>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/CreateMailLocation
     * 创建邮寄地址
     */

    @POST('CreateMailLocation')
    createMailLocation(
        @Payload
        _req:crmMailLocationDto

    ): Observable<crmMailLocationDto> {
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

    ): Observable<crmListResultDto1<crmMailLocationDto>> {
        return null as any
    }


    /**
     * @param url /CRM/LocationExternal/EditForBillOfLading
     * 从提单处创建或编辑地点
     */

    @POST('EditForBillOfLading')
    editForBillOfLading(
        @Payload
        _req:crmEditForBillOfLadingInput

    ): Observable<any> {
        return null as any
    }



  }
