import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMTraceLogListDto,CRMPagedResultDto1,CRMCreateTraceLogInput } from './crm.types';

@BaseUrl('/CRM/TraceLog')
@Injectable({ providedIn: 'root' })
export class CRMTraceLogService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/TraceLog/Get
     * 获取单条跟进记录详情
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMTraceLogListDto> {
        return null as any
    }


    /**
     * @param url /CRM/TraceLog/GetAll
     * 分页获取日志
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {customerId?:string,userId?:number,traceLogTypeId?:string,content?:string,isAll?:boolean,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMTraceLogListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/TraceLog/Create
     * 发表日志
     */

    @POST('Create')
    create(
        @Payload
        _req:CRMCreateTraceLogInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/TraceLog/Update
     * 编辑日志
     */

    @PUT('Update')
    update(
        @Payload
        _req:CRMCreateTraceLogInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/TraceLog/Delete
     * 删除日志
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/TraceLog/AddPraise
     * 给日志点赞
     */

    @POST('AddPraise')
    addPraise(
        @Payload
        _req: {traceLogId?:string} 

    ): Observable<any> {
        return null as any
    }



  }
