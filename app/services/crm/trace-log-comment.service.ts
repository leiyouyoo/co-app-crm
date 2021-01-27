import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { crmPagedResultDto1,crmTraceLogCommentListDto,crmCreateTraceLogCommentInput } from './crm.types';

@BaseUrl('/crm/TraceLogComment')
@Injectable({ providedIn: 'root' })
export class crmTraceLogCommentService extends BaseApi {
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

    ): Observable<crmPagedResultDto1<crmTraceLogCommentListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/TraceLogComment/Create
     * 发表日志评论
     */

    @POST('Create')
    create(
        @Payload
        _req:crmCreateTraceLogCommentInput

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
