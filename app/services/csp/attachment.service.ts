import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { CSPTestDtoValidateInput,CSPHttpResponseMessage,CSPAttachmentListDto,CSPListResultDto,CSPGetAllAttachmentListInput,CSPAttachmentDto,CSPBatchCreateAttachmentInput,CSPCreateAttachmentInput,CSPShareableContactModel,CSPAttachmentForIcpDto, } from './csp.types';

@BaseUrl('/csp/Attachment')
@Injectable({ providedIn: 'root' })
export class CSPAttachmentService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /CSP/Attachment/TestDtoValidate
     * 
     */

    @POST('testDtoValidate')
    testDtoValidate(
        @Payload
        _req:CSPTestDtoValidateInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/TestAgentJob
     * 
     */

    @POST('testAgentJob')
    testAgentJob(
        @Payload
        _req: {} 

    ): Observable<CSPHttpResponseMessage> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/TestL
     * 
     */

    @POST('testL')
    testL(
        @Payload
        _req: {} 

    ): Observable<CSPHttpResponseMessage> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/GetList
     * 根据业务获取附件列表.
     */

    @GET('getList')
    getList(
        @Payload
        _req: {businessId?:string,businessType?:number,attachmentType?:number} 

    ): Observable<CSPListResultDto<CSPAttachmentListDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/GetAllList
     * 根据业务id集合获取附件列表.
     */

    @POST('getAllList')
    getAllList(
        @Payload
        _req:CSPGetAllAttachmentListInput

    ): Observable<CSPListResultDto<CSPAttachmentListDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/Delete
     * 删除附件
     */

    @DELETE('delete')
    delete(
        @Payload
        _req: {id?:string} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/BatchDelete
     * 批量删除附件
     */

    @POST('batchDelete')
    batchDelete(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/Get
     * 获取附件信息
     */

    @GET('get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPAttachmentDto> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/GetByFileId
     * 根据文件 Id 获取附件信息
     */

    @GET('getByFileId')
    getByFileId(
        @Payload
        _req: {id?:string} 

    ): Observable<CSPAttachmentDto> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/GetListByFileIds
     * 根据文件 Id 获取附件信息
     */

    @GET('getListByFileIds')
    getListByFileIds(
        @Payload
        _req: {input?:any[]} 

    ): Observable<CSPListResultDto<CSPAttachmentListDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/BatchCreate
     * 批量创建附件
     */

    @POST('batchCreate')
    batchCreate(
        @Payload
        _req:CSPBatchCreateAttachmentInput

    ): Observable<CSPListResultDto<CSPAttachmentDto>> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/Create
     * 创建附件
     */

    @POST('create')
    create(
        @Payload
        _req:CSPCreateAttachmentInput

    ): Observable<CSPAttachmentDto> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/GetShareableUsers
     * 获取待分享用户
     */

    @GET('getShareableUsers')
    getShareableUsers(
        @Payload
        _req: {businessType?:number,businessId?:string} 

    ): Observable<CSPListResultDto<CSPShareableContactModel>> {
        return null as any
    }


    /**
     * @param url /CSP/Attachment/GetAllForIcp
     * 提供给ICP获取文档列表
     */

    @GET('getAllForIcp')
    getAllForIcp(
        @Payload
        _req: {businessId?:string,businessType?:number,attachmentType?:number} 

    ): Observable<CSPListResultDto<CSPAttachmentForIcpDto>> {
        return null as any
    }



  }
