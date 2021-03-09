import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMCustomerTitleDto,CRMPagedResultDto1,CRMCustomerTitleListDto } from './crm.types';

@BaseUrl('/CRM/CustomerTitle')
@Injectable({ providedIn: 'root' })
export class CRMCustomerTitleService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/CustomerTitle/Get
     * 获取发票抬头
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMCustomerTitleDto> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerTitle/GetAll
     * 获取发票抬头列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {customerId?:string,searchText?:string,isAll?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerTitleListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerTitle/CreateOrUpdate
     * 创建或编辑发票抬头
     */

    @POST('CreateOrUpdate')
    createOrUpdate(
        @Payload
        _req:CRMCustomerTitleDto

    ): Observable<CRMCustomerTitleDto> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerTitle/SetValid
     * 启用/作废发票抬头
     */

    @POST('SetValid')
    setValid(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerTitle/Delete
     * 删除发票抬头
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/CustomerTitle/GetAllForFam
     * FAM-获取发票抬头列表
     */

    @GET('GetAllForFam')
    getAllForFam(
        @Payload
        _req: {customerId?:string,searchText?:string,isAll?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMCustomerTitleListDto>> {
        return null as any
    }



  }
