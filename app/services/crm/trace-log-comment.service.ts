import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMPagedResultDto1,CRMTraceLogCommentListDto,CRMCreateTraceLogCommentInput } from './crm.types';

@BaseUrl('/CRM/TraceLogComment')
@Injectable({ providedIn: 'root' })
export class CRMTraceLogCommentService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/TraceLogComment/GetAll
     * 分页获取评论
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {traceLogId?:string,sorting?:string,maxResultCount?:number,skipCount?:number} 

    ): Observable<CRMPagedResultDto1<CRMTraceLogCommentListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/TraceLogComment/Create
     * 发表日志评论
     */

    @POST('Create')
    create(
        @Payload
        _req:CRMCreateTraceLogCommentInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CRM/TraceLogComment/Delete
     * 删除日志评论
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }
