import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload/interface';
import { CoConfigManager, CoPageBase } from '@co/core';
import { CRMTraceLogService } from '../../../../services/crm';
import { PUBDataDictionaryService } from '../../../../services/pub';

@Component({
  selector: 'crm-follow-up-record',
  templateUrl: './follow-up-record.component.html',
  styleUrls: ['./follow-up-record.component.less'],
})
export class FollowUpRecordComponent extends CoPageBase implements OnInit {
  @Output() readonly onSuccess = new EventEmitter<boolean>();
  @Output() readonly onExpand = new EventEmitter<boolean>();
  @Input() customerId;
  loading = false;
  validateForm: FormGroup;
  typeLists = [];
  fileList: NzUploadFile[] = [];
  previewImage: string | undefined = '';
  previewVisible = false;
  uploadUrl = CoConfigManager.getValue('serverUrl') + '/Storage/File/Upload';
  expanded = true; // 是否展示操作区

  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };

  constructor(private fb: FormBuilder,
              injector: Injector,
              private crmTraceLogService: CRMTraceLogService,
              public dataDictionaryService: PUBDataDictionaryService) {
    super(injector);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      traceLogTypeId: [null, [Validators.required]],//日志类型id
      followUpRecord: [new Date(), [Validators.required]],//内容
      content: ['我刚刚电话联系了这个客户'],//跟进时间
      customerId: [this.customerId],
    });
    this.dataDictionaryService.getListByType({ typeId: '3D569F80-B818-41B9-881A-1F3AC7F1990A' }).subscribe(r => {
      this.typeLists = r;
      this.validateForm.patchValue({ traceLogTypeId: this.typeLists.filter(e => e.code == 'Phone')[0].id });
    });
  }

  disabledAEndDate = (endValue: Date): boolean => {
    if (!endValue) {
      return false;
    }

    return endValue.getTime() >= new Date().getTime();
  };

  validForm(form) {
    for (const key in form.controls) {
      const control = form.controls[key] as AbstractControl;
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity(); // updateValueAndValidity方法会触发控件的valueChanges
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.validForm(control);
      }
    }
    return this.validateForm.valid;
  }

  traceChange(e) {
    let str = '';
    const code = this.typeLists.filter(ele => ele.id == e)[0].code;
    switch (code) {
      case 'Email':
        str = '我刚刚邮件联系了这个客户';
        break;
      case 'QQ':
        str = '我刚刚QQ联系了这个客户';
        break;
      case 'WeChat':
        str = '我刚刚微信联系了这个客户';
        break;
      case 'Visit':
        str = '我刚刚拜访了这个客户';
        break;
      case 'Phone':
        str = '我刚刚电话联系了这个客户';
        break;
      case 'Other':
        str = '我刚刚联系了这个客户';
        break;
    }
    this.validateForm.patchValue({ content: str });
  }

  submit() {
    if (!this.validForm(this.validateForm)) {
      return;
    }
    const params = this.validateForm.value;
    const traceLogItems = [];
    this.loading = true;
    this.fileList.forEach((item) => {
      if (item?.response?.result?.fileId) {
        traceLogItems.push({
          fileId: item?.response?.result?.fileId,
        });
      }
    });
    this.crmTraceLogService.create({ ...params, traceLogItems: traceLogItems }).subscribe(r => {
      this.loading = false;
      this.$message.success(this.$L('Publish success'));
      this.cancel();
      this.onSuccess.emit(true);
    }, e => this.loading = false);
  }

  cancel() {
    this.fileList = [];
    this.validateForm.patchValue({ followUpRecord: new Date() });
    this.traceChange(this.validateForm.value.traceLogTypeId);
  }

  handleDownload = (file: NzUploadFile) => {
    const anchor = document.createElement('a');
    anchor.download = `${file.response.result.fileName}.${file.response.result.extensionName}`;
    anchor.href = `${file.response.result.url}&Handler=raw`;
    anchor.click();
  };
}
