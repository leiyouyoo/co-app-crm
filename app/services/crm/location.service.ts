import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMCreateOrUpdateLocationInput,CRMLocationListDto,CRMPagedResultDto,CRMListResultDto,CRMAssignUsersToLocationDto,CRMAssignLocationsToUserDto,CRMUnbindUsersLocationDto, } from './crm.types';

@BaseUrl('/CRM/Location')
@Injectable({ providedIn: 'root' })
export class CRMLocationService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/Location/Get
     * 地点详情
     */

    @GET('get')
    get(
        @Payload
        _req: {id?:string,partnerId?:string} 

    ): Observable<CRMCreateOrUpdateLocationInput> {
        return null as any
    }


    /**
     * @param url /CRM/Location/GetAll
     * 分页获取地点列表（客户的或者合作伙伴的）
     */

    @GET('getAll')
    getAll(
        @Payload
        _req: {customerId?:string,partnerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto<CRMLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Location/GetAllByCustomerOrPartner
     * 获取客户或合作伙伴的地点(一般用于下拉框)
     */

    @GET('getAllByCustomerOrPartner')
    getAllByCustomerOrPartner(
        @Payload
        _req: {customerId?:string,partnerId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMListResultDto<CRMLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Location/GetByContactId
     * 获取联系人地点
     */

    @GET('getByContactId')
    getByContactId(
        @Payload
        _req: {contactId?:string} 

    ): Observable<CRMListResultDto<CRMLocationListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Location/CreateCustomerLocation
     * 为客户创建地点
     */

    @POST('createCustomerLocation')
    createCustomerLocation(
        @Payload
        _req:CRMCreateOrUpdateLocationInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Location/CreatePartnerLocation
     * 为合作伙伴创建地点
     */

    @POST('createPartnerLocation')
    createPartnerLocation(
        @Payload
        _req:CRMCreateOrUpdateLocationInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Location/Update
     * 更新地点
     */

    @PUT('update')
    update(
        @Payload
        _req:CRMCreateOrUpdateLocationInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Location/AssignUsersToLocation
     * 赋值用户（联系人）到地点
     */

    @POST('assignUsersToLocation')
    assignUsersToLocation(
        @Payload
        _req:CRMAssignUsersToLocationDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Location/AssignLocationsToUser
     * 赋值地点给用户（联系人）
     */

    @POST('assignLocationsToUser')
    assignLocationsToUser(
        @Payload
        _req:CRMAssignLocationsToUserDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Location/UnbindUserLocation
     * 解除联系人地点绑定关系
     */

    @POST('unbindUserLocation')
    unbindUserLocation(
        @Payload
        _req:CRMUnbindUsersLocationDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/Location/Delete
     * 删除地点
     */

    @DELETE('delete')
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

    @POST('quartzSaveLatAndLngAsync')
    quartzSaveLatAndLngAsync(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }



  }
