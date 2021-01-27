import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { crmCreateOrUpdateLocationInput,crmPagedResultDto1,crmLocationListDto,crmListResultDto1,crmAssignUsersToLocationDto,crmAssignLocationsToUserDto,crmUnbindUsersLocationDto } from './crm.types';

@BaseUrl('/crm/Location')
@Injectable({ providedIn: 'root' })
export class crmLocationService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/Location/Get
     * 地点详情
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string,partnerId?:string} 

    ): Observable<crmCreateOrUpdateLocationInput> {
        return null as any
    }


    /**
     * @param url /CRM/Location/GetAll
     * 分页获取地点列表（客户的或者合作伙伴的）
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {customerId?:string,partnerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmPagedResultDto1<crmLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Location/GetAllByCustomerOrPartner
     * 获取客户或合作伙伴的地点(一般用于下拉框)
     */

    @GET('GetAllByCustomerOrPartner')
    getAllByCustomerOrPartner(
        @Payload
        _req: {customerId?:string,partnerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmListResultDto1<crmLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Location/GetByContactId
     * 获取联系人地点
     */

    @GET('GetByContactId')
    getByContactId(
        @Payload
        _req: {contactId?:string} 

    ): Observable<crmListResultDto1<crmLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Location/CreateCustomerLocation
     * 为客户创建地点
     */

    @POST('CreateCustomerLocation')
    createCustomerLocation(
        @Payload
        _req:crmCreateOrUpdateLocationInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Location/CreatePartnerLocation
     * 为合作伙伴创建地点
     */

    @POST('CreatePartnerLocation')
    createPartnerLocation(
        @Payload
        _req:crmCreateOrUpdateLocationInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Location/Update
     * 更新地点
     */

    @PUT('Update')
    update(
        @Payload
        _req:crmCreateOrUpdateLocationInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Location/AssignUsersToLocation
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
     * @param url /CRM/Location/AssignLocationsToUser
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
     * @param url /CRM/Location/UnbindUserLocation
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
     * @param url /CRM/Location/Delete
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
     * @param url /CRM/Location/QuartzSaveLatAndLngAsync
     * 定时拉取定时经纬度
     */

    @POST('QuartzSaveLatAndLngAsync')
    quartzSaveLatAndLngAsync(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
