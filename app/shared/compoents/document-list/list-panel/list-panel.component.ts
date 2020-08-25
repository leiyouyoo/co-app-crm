import { Component, OnInit, Output, Input, EventEmitter, Inject, DoCheck } from '@angular/core';
import { FileManageService } from '../file-manage/service/file-manage.service';
import { AttachmentType } from '../file-manage/entity/attachment-type';
import { BusinessType } from '../file-manage/entity/business-type';
import { UploadXHRArgs, NzMessageService } from 'ng-zorro-antd';
import { cloneDeep, merge } from 'lodash';
import { CoConfigManager } from '@co/core';
// import { UploadChangeParam } from 'ng-zorro-antd/upload';
// import { PreviewPdfService } from '../../preview-pdf/preview-pdf.service';

@Component({
  selector: 'document-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.less'],
})
export class DocumentListPanelComponent implements OnInit, DoCheck {
  files = [];

  @Output() onSuccess = new EventEmitter();
  @Output() onError = new EventEmitter();
  @Output() onSearchSuccess = new EventEmitter();
  @Output() onDownloadAll = new EventEmitter();
  @Output() fileListEmitter = new EventEmitter();

  @Input() BusinessId?: string; //业务id(比如：是booking就取booking的id)
  @Input() BusinessType?: BusinessType;
  @Input() fileTypeList: any[] = [];
  @Input() storageUrl = '';
  @Input() isToIcp = false;
  public _AttachmentType: AttachmentType;
  _BusinessType = BusinessType;
  fileList = [];
  shareList = [];
  shareListInfo = [];
  _isLoading = false;
  uploadAttachmentType = null;
  state = 1;
  isPDFVisible = false;
  // pdfSrc='https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  pdfSrc = '';
  uploading = false;

  /**
   * condition 1
   *  · 当选中type 后，可以进行上传文件
   *  · 当没有type 时，不进行判断
   * condition 2
   *     fileList.length > 0
   */
  get isDisableSave(): boolean {
    let typeNeed = false;
    if (this.fileTypeList.length) {
      typeNeed = this.uploadAttachmentType === null;
    }
    return typeNeed || !this.fileList.length;
  }

  get isLoading() {
    return this._isLoading;
  }

  //上传地址
  // tslint:disable-next-line: no-invalid-template-strings
  uploadUrl = `${CoConfigManager.getValue('serverUrl')}/Storage/File/Upload`;

  @Input() set AttachmentType(type: AttachmentType) {
    this._AttachmentType = type;
    this.searchFile(type);
  }

  constructor(
    public fileManageService: FileManageService,
    // private previewPdfService: PreviewPdfService,
    private msg: NzMessageService,
  ) {}

  ngOnInit() {
    this.searchFile(this._AttachmentType);
    let params = {
      BusinessType: this.BusinessType,
      BusinessId: this.BusinessId,
    };
    this.fileManageService.getShareableUsers(params).subscribe((res: any) => {
      this.shareList = res.items;
    });
  }

  ngDoCheck(): void {
    if (this.fileList.length === 0) {
      this.uploadAttachmentType = null;
      this.shareListInfo = [];
    }
  }

  /**
   * 上传文件改变触发
   * @param e 上传的文件列表
   */
  fileChange(e: any) {
    merge(this.fileList, e.fileList);
  }

  /**
   * 查询文件
   * @param type 文件类型
   */
  searchFile(type: AttachmentType = null) {
    if (!this.BusinessId) return;
    this.fileManageService.getAttachmentListByBusiness(this.BusinessId as any, this.BusinessType, type).subscribe(
      (res) => {
        let list = res;
        let filesTemp = [];
        list.forEach((element) => {
          filesTemp.push({
            name: element.fileName + '.' + element.extensionName,
            updateBy: element.uploadBy,
            updateTime: element.creationTime,
            id: element.id,
            downFileUrl: `${CoConfigManager.getValue('serverUrl')}/Storage/File/GetDownLoadFile?FileId=${element.fileId}&Handler=raw`,
            shareCompanies: Array.from(new Set(element.sharingItems.map((o) => o.targetCompanyName))),
          });
        });
        this.files = filesTemp;
        this.onDownloadAll.emit(this.files);
        this.onSearchSuccess.emit(res);
        this.fileListEmitter.emit(this.files);
      },
      (error) => {
        console.log('File error', error);
      },
    );
  }

  create(params: any) {
    this._isLoading = true;
    this.fileManageService.create(params).subscribe(
      (res) => {
        this._isLoading = false;
        this.searchFile(this._AttachmentType);
        this.onSuccess.emit(res);
        this.fileList.forEach((file) => {
          file.isUploaded = 'success';
        });
        this.fileList = [];
        this.showUploadField = false;
        this.msg.success('Upload Successfully');
      },
      (error) => {
        this.fileList = [];
        this._isLoading = false;
        this.searchFile(this._AttachmentType);
        console.error('Attachment File Insert DB Error', error);
      },
    );
  }

  /**
   * 删除文件
   * @param file 文件
   */
  delete(file) {
    this.fileManageService.deleteFile(file.id).subscribe((res) => {
      this.searchFile(this._AttachmentType);
    });
  }

  save() {
    let params: any = { items: [] };
    let shareList = [];
    this.shareListInfo.forEach((info, index) => {
      shareList.push({});
      shareList[index].targetUserId = info.userId;
      shareList[index].targetCustomerId = info.customerId;
      shareList[index].targetPartnerId = info.partnerId;
    });
    this.fileList
      .filter((o) => o.response)
      .forEach((o, index) => {
        const res = o.response;
        Object.assign(res, res.result || {});
        params.items.push(merge({}, {}));
        params.items[index].sharingItems = cloneDeep(shareList);
        params.items[index].businessId = this.BusinessId;
        params.items[index].businessType = this.BusinessType;
        params.items[index].attachmentType = this.uploadAttachmentType;
        params.items[index].isToIcp = this.isToIcp;
        params.items[index].fileId = res.fileId;
        params.items[index].fileName = res.fileName;
        params.items[index].extensionName = res.extensionName;
      });
    this.create(params);
  }

  onProgress(a, b) {}

  /**
   * 在fileList列表中，删除选中的file
   * @param i 需要删除的index值
   */
  closeFile(i: number) {
    this.fileList.splice(i, 1);
  }

  /**
   * 显示PDF预览文件
   * @param i 文件的序列号
   */
  showPDF(i) {
    // this.previewPdfService.showByFileId(this.fileList[i].response.fileId);
    // return;
    // this.isPDFVisible = true;
    // this.pdfSrc = this.environment.StoreUrl + '/Storage/File/GetPdf?FileId=' + this.fileList[i].response.fileId;
  }

  uploadFileList = (items: UploadXHRArgs) => {
    return this.fileManageService.upload(items.file as any).subscribe((data) => {
      items.onSuccess(data, items.file, null);
    });
  };

  handleCancel() {
    this.isPDFVisible = false;
  }

  handleOk() {
    this.isPDFVisible = false;
  }

  // 上传
  showUploadField: boolean = false;

  showFiledModal() {
    this.showUploadField = true;
  }

  uploadFieldSave() {
    this.save();
  }

  // 支持多选下载，多选删除
  fileIsAllCheck: boolean = false;
  fileIsAllCheckMin: boolean = false;
  checkStateMap: { [key: string]: boolean } = {}; // 选中状态 MAP
  isIndeterminate = false;
  numberOfCheck = 0; // 选中框的个数
  fileCheckList: any[] = [];

  filecheckAll(value: boolean): void {
    this.files.forEach((item) => (this.checkStateMap[item.id] = value));
    this.fieldRefreshStatus();
  }

  fieldRefreshStatus(): void {
    this.fileIsAllCheck = this.files.every((item) => this.checkStateMap[item.id]);
    // 未全选中状态，但是已选择部分
    this.isIndeterminate =
      this.files.some((item) => this.checkStateMap[item.id]) && !this.files.every((item) => this.checkStateMap[item.id]);
    this.numberOfCheck = this.files.filter((item) => this.checkStateMap[item.id]).length;
    this.fileCheckList = this.files
      .filter((item) => this.checkStateMap[item.id])
      .map((value) => {
        return value;
      });
  }

  downLoadFields() {
    if (this.fileCheckList.length > 0) {
      this.fileCheckList.forEach((file) => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.style.height = '0px';
        iframe.src = file.downFileUrl;
        document.body.appendChild(iframe);
        setTimeout(() => {
          iframe.remove();
        }, 1000);
      });
    }
  }

  deletedFields() {
    if (this.fileCheckList.length > 0) {
      let parame = [];
      this.fileCheckList.forEach((item) => {
        parame.push({
          id: item.id,
        });
      });
      this.fileManageService.deleteFiles(parame).subscribe((res) => {
        this.searchFile(this._AttachmentType);
      });
    }
  }

  getFile() {
    return this.files;
  }
}
