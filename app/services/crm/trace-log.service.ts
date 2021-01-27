import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { crmTraceLogListDto,crmPagedResultDto1,crmCreateTraceLogInput } from './crm.types';

@BaseUrl('/crm/TraceLog')
@Injectable({ providedIn: 'root' })
export class crmTraceLogService extends BaseApi {
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

    ): Observable<crmTraceLogListDto> {
        return null as any
    }


    /**
     * @param url /CRM/TraceLog/GetAll
     * 分页获取日志
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {customerId?:string,userId?:number,traceLogTypeId?:string,content?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<crmPagedResultDto1<crmTraceLogListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/TraceLog/Create
     * 发表日志
     */

    @POST('Create')
    create(
        @Payload
        _req:crmCreateTraceLogInput

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
        _req:crmCreateTraceLogInput

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
