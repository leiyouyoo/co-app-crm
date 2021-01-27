import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMTraceLogListDto,CRMPagedResultDto,CRMCreateTraceLogInput, } from './crm.types';

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

    @GET('get')
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

    @GET('getAll')
    getAll(
        @Payload
        _req: {customerId?:string,userId?:number,traceLogTypeId?:string,content?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto<CRMTraceLogListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/TraceLog/Create
     * 发表日志
     */

    @POST('create')
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

    @PUT('update')
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

    @DELETE('delete')
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

    @POST('addPraise')
    addPraise(
        @Payload
        _req: {traceLogId?:string} 

    ): Observable<any> {
        return null as any
    }



  }
