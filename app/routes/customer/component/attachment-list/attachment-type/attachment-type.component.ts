import { Component, Injector, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageAttachmentService } from '@co/cds';
import { CoConfigManager, CoPageBase } from '@co/core';
import { NzMessageService, NzModalRef, NzUploadChangeParam } from 'ng-zorro-antd';
import { AttachmentRoles, InternalPermissionType } from './enums';
import { CRMAttachmentService } from '../../../../../services/crm';

/**
 * 样例明细页
 */
@Component({
  selector: 'crm-attachment-permissions',
  templateUrl: './attachment-type.component.html',
  styleUrls: ['./attachment-type.component.less'],
})
export class AttachmentTypeComponent extends CoPageBase {
  //#region 私有变量
  @Input() customerId: any;
  @Input() getData: any = false;
  loading: any;
  validateForm = this.fb.group({
    type: [null, [Validators.required]],
  });
  fileList: any;
  uploadUrl = CoConfigManager.getValue('uploadUrl');

  readonly attachmentRoles = AttachmentRoles;
  readonly internalPermissionType = InternalPermissionType;
  //#endregion

  //#region  输入输出参数

  //#endregion

  //#region 页面生命周期

  constructor(
    private crmAttachmentService: CRMAttachmentService,
    private attachmentService: StorageAttachmentService,
    injector: Injector,
    private message: NzMessageService,
    private fb: FormBuilder,
    public modalRef: NzModalRef,
  ) {
    super(injector);
  }

  coOnInit(): void {
  }

  coOnChanges(changes: SimpleChanges): void {
  }

  coAfterViewInit(): void {
  }

  coOnDestroy(): void {
  }

  //#endregion

  //#region 事件处理

  //#endregion

  //#region 公共方法

  //#endregion

  //#region 私有方法

  fileChange(e: NzUploadChangeParam) {
    switch (e.type) {
      case 'success':
        this.fileList = e.fileList;
        break;
      case 'removed':
        this.fileList = e.fileList;
        break;
      default:
    }
  }

  upload() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    if (!this.validateForm.valid) {
      return;
    }

    if (!this.fileList?.some((e) => e?.response?.result?.fileId)) {
      this.message.warning('Please upload file');
      return;
    }

    let arr = [];
    this.fileList.forEach((item) => {
      if (item?.response?.result?.fileId) {
        arr.push({
          customerId: this.customerId,
          type: this.validateForm.value.type,
          fileId: item?.response?.result?.fileId,
          fileName: item?.response?.result?.fileName,
          extensionName: item?.response?.result?.extensionName,
        });
      }
    });
    this.loading = true;
    this.crmAttachmentService.batchCreate(arr).subscribe((res) => {
      this.message.success(this.$L('Success'));
      this.loading = false;
      this.modalRef.close(this.getData ? res : true);
    }, e => this.loading = false);
  }

  //#endregion
}
