import { Injectable } from '@angular/core';
import { _HttpClient } from '@co/common';
import { BusinessType } from '../../../../../src/app/shared/im/src/util/file-manage/entity/business-type';
import { AttachmentType } from '../../../../../src/app/shared/im/src/util/file-manage/entity/attachment-type';
import { Observable } from 'rxjs';
import { SharingFile } from '../../../../../src/app/shared/im/src/util/file-manage/entity/sharing-file';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FileManageService {
  userMsg = JSON.parse(localStorage.getItem('co.session') || 'null');
  constructor(public http: _HttpClient) {}

  /**
   * 查询文件
   * @param BusinessId 业务ID
   * @param BusinessType 业务类型
   * @param AttachmentType 附件类型
   */
  getAttachmentListByBusiness(BusinessId: string, BusinessType: BusinessType, AttachmentType: AttachmentType): Observable<SharingFile[]> {
    return this.http.get('/CSP/Attachment/GetList', { BusinessId, BusinessType, AttachmentType }).pipe(map((o: any) => o.items)) as any;
  }

  /**
   * 创建文件
   * @param BusinessId 业务ID
   * @param BusinessType 业务类型
   * @param AttachmentType 附件类型
   * @param fileName
   * @param extensionName
   */
  create(params: {
    items: [
      {
        isFromIcp?: boolean;
        isToIcp?: boolean;
        attachmentSharings?: [
          {
            targetUserId: number;
            targetTenantId: number;
            targetPartnerId: number;
            id: number;
          },
        ];
        businessId: string;
        businessType: number;
        attachmentType: number;
        fileId: string;
        fileName: string;
        extensionName: string;
        id?: number;
      },
    ];
  }) {
    return this.http.post('/CSP/Attachment/BatchCreate', params);
  }

  /**
   * 更新文件
   * @param BusinessId
   * @param BusinessType
   * @param AttachmentType
   * @param fileName
   * @param extensionName
   * @param sharingPeopleId
   */
  update(
    BusinessId: number,
    BusinessType: BusinessType,
    AttachmentType: AttachmentType,
    fileName: string,
    extensionName: string,
    sharingPeopleId: string,
  ) {
    return this.http.post('/CSP/Attachment/Update', {
      businessId: BusinessId,
      businessType: BusinessType,
      attachmentType: AttachmentType,
      fileName: fileName,
      extensionName: extensionName,
      attachmentSharings: [{ sharingPeopleId: sharingPeopleId }],
    });
  }

  /**
   * 获取文件
   * @param Id 文件ID
   */
  get(Id: number) {
    return this.http.get('/CSP/Attachment/Get', { Id: Id });
  }

  /**
   * 获取全部文件
   * @param BusinessId
   * @param BusinessType
   * @param AttachmentType
   */
  getAll(BusinessId: number, BusinessType: BusinessType, AttachmentType: AttachmentType) {
    return this.http.get('/CSP/Attachment/GetAll', { BusinessId: BusinessId, BusinessType: BusinessType, AttachmentType: AttachmentType });
  }

  /**
   * 移除文件
   * @param Id 文件ID
   */
  deleteFile(Id: number) {
    return this.http.delete('/CSP/Attachment/Delete', { Id: Id });
  }

  /**
   * 批量移除文件
   * @param Id
   */
  deleteFiles(fileList: any) {
    return this.http.post('/CSP/Attachment/BatchDelete', fileList);
  }

  /**
   * 下载文件或者获取图片
   * @param FileId 文件id,上传后返回
   * @param Handler 文件处理器（下载原文件就传 raw,如果是图片就传image）
   * @param Modifier 图片裁剪尺寸，如果非图片，无需传（1.原图：raw_jpg,jpg可以换成其他扩展名；2.支持尺寸128x128,64x64,32x32,256x）
   */
  downLoadImgOrFile(FileId: string, Handler?: string, Modifier?: string) {
    let params = {
      FileId: FileId,
      Handler: Handler || 'raw',
      Modifier: Modifier,
    };
    return this.http.get('/Storage/File/GetDownLoadFile', params);
  }

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    return this.http.post(`/Storage/File/Upload`, formData, null);
  }

  getShareableUsers(params: { BusinessType: BusinessType; BusinessId: string }) {
    return this.http.get('/CSP/Attachment/GetShareableUsers', params);
  }

  getDownloadFileUrl(option: { idOrUrl: string; handle?: string; defaultUrl?: string }) {
    const { idOrUrl, handle, defaultUrl } = option;
    if (!idOrUrl) {
      return defaultUrl || '';
    }
    if (idOrUrl.startsWith('http')) {
      return idOrUrl;
    } else {
      // @ts-ignore
      return `${this.http.environment.SERVER_URL}/Storage/File/GetDownLoadFile?fileId=${idOrUrl}&handler=${handle}`;
    }
  }

  getImageUrl(option: { idOrUrl: string; defaultUrl?: string }) {
    return this.getDownloadFileUrl({ ...option, handle: 'image' });
  }

  getAvatarUrl(option: { idOrUrl: string; defaultUrl?: string; fromAbp?: boolean }) {
    let { idOrUrl, defaultUrl, fromAbp } = option;
    if (fromAbp) {
      idOrUrl = this.userMsg.session.user.profilePictureId;
    }
    return this.getImageUrl({ idOrUrl, defaultUrl });
  }
}
