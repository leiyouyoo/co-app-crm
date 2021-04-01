import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { STORAGEChangeAttachmentTypeInput,STORAGEGetAllAttachmentListInput,STORAGEListResultDto1,STORAGEAttachmentListDto,STORAGECoEntityDto,STORAGEAttachmentDto,STORAGEAttachmentEditDto,STORAGEAttachmentTypePermissionDto,STORAGEBatchCreateAttachmentInput } from './storage.types';

@BaseUrl('/STORAGE/Attachment')
@Injectable({ providedIn: 'root' })
export class STORAGEAttachmentService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Storage/Attachment/ChangeType
     * 修改文件类型
     */

    @POST('ChangeType')
    changeType(
        @Payload
        _req:STORAGEChangeAttachmentTypeInput

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Storage/Attachment/GetAllList
     * 根据业务id集合获取附件列表.(弃用，跟业务耦合的，得根据具体业务提供获取业务附件的接口)
     */

    @POST('GetAllList')
    getAllList(
        @Payload
        _req:STORAGEGetAllAttachmentListInput

    ): Observable<STORAGEListResultDto1<STORAGEAttachmentListDto>> {
        return null as any
    }


    /**
     * @param url /Storage/Attachment/Delete
     * 删除附件
     */

    @POST('Delete')
    delete(
        @Payload
        _req:STORAGECoEntityDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Storage/Attachment/BatchDelete
     * 批量删除附件
     */

    @POST('BatchDelete')
    batchDelete(
        @Payload
        _req: {} 

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Storage/Attachment/Get
     * 获取附件信息
     */

    @GET('Get')
    get(
        @Payload
        _req: {id?:string} 

    ): Observable<STORAGEAttachmentDto> {
        return null as any
    }


    /**
     * @param url /Storage/Attachment/GetByFileId
     * 根据文件 Id 获取附件信息
     */

    @GET('GetByFileId')
    getByFileId(
        @Payload
        _req: {id?:string} 

    ): Observable<STORAGEAttachmentDto> {
        return null as any
    }


    /**
     * @param url /Storage/Attachment/GetListByFileIds
     * 根据文件 Id 获取附件信息
     */

    @POST('GetListByFileIds')
    getListByFileIds(
        @Payload
        _req: {} 

    ): Observable<STORAGEListResultDto1<STORAGEAttachmentListDto>> {
        return null as any
    }


    /**
     * @param url /Storage/Attachment/UpdateAttachment
     * 编辑
     */

    @PUT('UpdateAttachment')
    updateAttachment(
        @Payload
        _req:STORAGEAttachmentEditDto

    ): Observable<any> {
        return null as any
    }


    /**
     * @param url /Storage/Attachment/GetDefaultPermission
     * 获取所有附件类型权限
     */

    @GET('GetDefaultPermission')
    getDefaultPermission(
        @Payload
        _req: {step?:number} 

    ): Observable<STORAGEListResultDto1<STORAGEAttachmentTypePermissionDto>> {
        return null as any
    }


    /**
     * @param url /Storage/Attachment/BatchCreate
     * 批量创建附件
     */

    @POST('BatchCreate')
    batchCreate(
        @Payload
        _req:STORAGEBatchCreateAttachmentInput

    ): Observable<STORAGEListResultDto1<STORAGEAttachmentDto>> {
        return null as any
    }



  }
