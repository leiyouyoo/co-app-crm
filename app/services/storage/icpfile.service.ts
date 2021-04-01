import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, BaseUrl, DELETE, FORM, GET, Payload, POST, PUT } from '@co/common';
import { STORAGEICPUploadFileInput,STORAGEUploadResultDto,STORAGEICPBatchDownloadInput,STORAGEListResultDto1,STORAGEICPBatchDownloadResult } from './storage.types';

@BaseUrl('/STORAGE/ICPFile')
@Injectable({ providedIn: 'root' })
export class STORAGEICPFileService extends BaseApi {
  constructor(injector: Injector) {
    super(injector);
  }

  
    /**
     * @param url /Storage/ICPFile/Upload
     * 文件上传
     */

    @POST('Upload')
    upload(
        @Payload
        _req:STORAGEICPUploadFileInput

    ): Observable<STORAGEUploadResultDto> {
        return null as any
    }


    /**
     * @param url /Storage/ICPFile/BatchDownload
     * 批量下载
     */

    @POST('BatchDownload')
    batchDownload(
        @Payload
        _req:STORAGEICPBatchDownloadInput

    ): Observable<STORAGEListResultDto1<STORAGEICPBatchDownloadResult>> {
        return null as any
    }



  }
