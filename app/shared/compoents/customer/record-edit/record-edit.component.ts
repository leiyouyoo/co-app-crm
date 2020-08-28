import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UploadFile, NzMessageService } from 'ng-zorro-antd';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { differenceInCalendarDays } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { PUBDataDictionaryService } from '@co/cds';
import { CRMTraceLogService, CRMCustomerService } from '../../../../services/crm';
import { CoConfigManager } from '@co/core';
@Component({
  selector: 'customer-record-edit',
  templateUrl: './record-edit.component.html',
  styleUrls: ['./record-edit.component.less'],
})
export class RecordEditComponent implements OnInit {
  type: null;
  @Output() getList = new EventEmitter();
  @Input() showCusSelect: boolean = false;
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true,
  };
  radioList: [];
  recordTitle = this.translate.instant('Add follow-up record');
  uploadUrl = CoConfigManager.getValue('serverUrl');
  okText = this.translate.instant('Save');

  obj = {
    id: null,
    content: null,
    customerId: null,
    traceLogTypeId: null,
    followUpRecord: null,
    traceLogItems: [{ fileId: '' }],
  };
  fileList = [];
  copyData = null;
  see = false;
  previewImage: string | undefined = '';
  previewVisible = false;
  isVisible = false;
  baseData = null;
  validateForm: FormGroup;
  startDate: any = null;
  endDate: any = null;
  cusList: any = null;

  submitForm(): void {
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  constructor(
    private fb: FormBuilder,
    private crmTraceLogService: CRMTraceLogService,
    private pubDataDictionaryService: PUBDataDictionaryService,
    private crmCustomerService: CRMCustomerService,
    private domSanitizer: DomSanitizer,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private modalRef: NzModalService,
    public translate: TranslateService,
  ) {}

  ngOnInit() {
    this.endDate = new Date();
    this.startDate = new Date(this.endDate - 60 * 60 * 1000 * 24 * 2);
    this.validateForm = this.fb.group({
      customerId: [this.activatedRoute.snapshot.params.id],
      content: [null, [Validators.required]],
      followUpRecord: [null, [Validators.required]],
      traceLogTypeId: [null, [Validators.required]],
      customerid: [null, this.showCusSelect ? [Validators.required] : null],
    });

    this.pubDataDictionaryService
      .getAll({
        typeCode: '100',
      })
      .subscribe((res: any) => {
        this.radioList = res.items;
      });

    this.getCusList('');
  }

  disabledStartDate = (endDate: Date, startDate: Date) => {
    return (startValue: Date): boolean => {
      return differenceInCalendarDays(startValue, startDate) > 0 || differenceInCalendarDays(startValue, this.startDate) <= 0;
    };
  };
  showModal(type, dataDetail) {
    this.see = false;
    this.type = type;
    if (dataDetail) {
      this.baseData = dataDetail;
      this.copyData = { ...this.baseData };
      this.validateForm = this.fb.group({
        customerId: [this.activatedRoute.snapshot.params.id],
        content: [dataDetail.content, [Validators.required]],
        followUpRecord: [dataDetail.followUpRecord, [Validators.required]],
        traceLogTypeId: [dataDetail.traceLogTypeId, [Validators.required]],
      });

      this.obj.traceLogItems = dataDetail.traceLogItems;
      this.fileList = [];
      if (this.obj.traceLogItems.length === 1) {
        this.fileList = [{ url: null, response: { fileId: null }, uid: 0 }];
        this.fileList[0].url = `${CoConfigManager.getValue('storeUrl')}/Storage/File/GetDownLoadFile?FileId=${
          this.obj.traceLogItems[0].fileId
        }&Handler=image`;
        this.fileList[0].response.fileId = this.obj.traceLogItems[0].fileId;
      } else {
        this.obj.traceLogItems.forEach((element, index) => {
          this.fileList.push({ url: null, response: { fileId: null }, uid: index });
          this.fileList[index].url = `${CoConfigManager.getValue('storeUrl')}/Storage/File/GetDownLoadFile?FileId=${
            element.fileId
          }&Handler=image`;
          this.fileList[index].response.fileId = element.fileId;
        });
      }
    }

    if (type === 3) {
      this.see = true;
    } else {
      this.see = false;
    }
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url;
    this.previewVisible = true;
  };
  handleOk() {
    if (!this.see) {
      this.submitForm();
      if (this.validateForm.valid) this.commitData();
    } else {
      this.isVisible = false;
    }
  }

  commitData() {
    this.obj = { ...this.validateForm.value };
    this.obj.traceLogItems = [];
    this.obj.customerId = this.activatedRoute.snapshot.params.id;
    this.fileList.forEach((element) => {
      this.obj.traceLogItems.push({ fileId: element.response.result.fileId });
    });
    if (this.type === 1) {
      this.crmTraceLogService.create(this.obj).subscribe((res: any) => {
        this.getList.emit();
        this.message.success(this.translate.instant('Added successfully!'));
        this.defaultCancel();
      });
    } else {
      this.obj.id = this.baseData.id;
      this.crmTraceLogService.update(this.obj).subscribe((res: any) => {
        this.getList.emit();
        this.message.success(this.translate.instant('Modify success'));
        this.defaultCancel();
      });
    }
  }
  handleCancel(): void {
    if (this.type === 2) {
      let config = false;
      this.obj = { ...this.validateForm.value };
      this.obj.traceLogItems = [];
      this.obj.customerId = this.activatedRoute.snapshot.params.id;
      this.fileList.forEach((element) => {
        this.obj.traceLogItems.push({ fileId: element.response.fileId });
      });
      for (const key in this.obj) {
        if (this.copyData[key] !== this.obj[key] && !Array.isArray(this.obj[key])) {
          config = true;
        } else if (this.copyData[key] !== this.obj[key] && Array.isArray(this.obj[key])) {
          if (this.obj[key].length !== this.copyData.traceLogItems.length) {
            config = true;
          } else {
            this.obj[key].forEach((element, index) => {
              if (element.fileId !== this.copyData.traceLogItems[index].fileId) {
                config = true;
              }
            });
          }
        }
      }
      if (config) {
        this.modalRef.confirm({
          nzContent: this.translate.instant('Discard all changes?'),
          nzOkText: this.translate.instant('Keep editing'),
          nzCancelText: this.translate.instant('Discard'),
          nzOnOk: () => {},
          nzOnCancel: () => {
            this.defaultCancel();
          },
        });
      } else {
        this.defaultCancel();
      }
    } else {
      this.defaultCancel();
    }
  }
  defaultCancel() {
    this.validateForm.reset();
    this.obj.traceLogItems = [];
    this.isVisible = false;
    this.fileList = [];
  }
  handleChange({ file, fileList }: { [key: string]: any }): void {
    let type = file.type;
    let status = file.status;
    if (status === 'done') {
      if (this.fileList.length === 0) {
        this.fileList[0].url = this.domSanitizer.bypassSecurityTrustResourceUrl(
          `${CoConfigManager.getValue('storeUrl')}/Storage/File/GetDownLoadFile?FileId=${file.response.result.fileId}&Handler=raw`,
        );
      } else {
        this.fileList[this.fileList.length - 1].url = this.domSanitizer.bypassSecurityTrustResourceUrl(
          `${CoConfigManager.getValue('storeUrl')}/Storage/File/GetDownLoadFile?FileId=${file.response.result.fileId}&Handler=raw`,
        );
      }
    } else if (status === 'error') {
      this.message.create('error', `upload img is error!`);
    } else if (status === 'removed') {
      if (this.see) {
        return;
      }
    }
  }

  handleRemove = (file: UploadFile) => {
    if (file) {
      if (this.see) {
        return false;
      } else {
        return true;
      }
    }
  };

  // 获取客户列表
  getCusList(searchText) {
    this.crmCustomerService
      .getAll({
        maxResultCount: 20,
        skipCount: 0,
        searchText: searchText,
      })
      .subscribe(
        (res: any) => {
          this.cusList = res.items;
        },
        (err) => {},
      );
  }

  searchCus(e) {
    this.getCusList(e);
  }
}
