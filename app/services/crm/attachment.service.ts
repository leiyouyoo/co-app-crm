import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CRMAttachmentDto,CRMListResultDto1,CRMAttachmentListDto } from './crm.types';

@BaseUrl('/CRM/Attachment')
@Injectable({ providedIn: 'root' })
export class CRMAttachmentService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CRM/Attachment/Get
     * 获取附件详情
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CRMAttachmentDto> {
        return null as any
    }


    /**
     * @param url /CRM/Attachment/GetAll
     * 获取附件列表
     */

    @GET('GetAll')
    getAll(
        @Payload
        _req: {customerId?:string,type?:number} 

    ): Observable<CRMListResultDto1<CRMAttachmentListDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Attachment/Create
     * 创建附件
     */

    @POST('Create')
    create(
        @Payload
        _req:CRMAttachmentDto

    ): Observable<CRMAttachmentDto> {
        return null as any
    }


    /**
     * @param url /CRM/Attachment/BatchCreate
     * 批量创建附件
     */

    @POST('BatchCreate')
    batchCreate(
        @Payload
        _req: {} 

    ): Observable<CRMListResultDto1<CRMAttachmentDto>> {
        return null as any
    }


    /**
     * @param url /CRM/Attachment/Delete
     * 删除附件
     */

    @DELETE('Delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }



  }