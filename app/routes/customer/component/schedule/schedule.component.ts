import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload/interface';
import { CoConfigManager, CoPageBase } from '@co/core';
import { CRMTraceLogService } from '../../../../services/crm';
import format from 'date-fns/format';
import { PUBDataDictionaryService } from '../../../../services/pub';

@Component({
  selector: 'crm-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.less'],
})
export class ScheduleComponent extends CoPageBase implements OnInit {
  @Output() readonly onSuccess = new EventEmitter<boolean>();
  @Output() readonly onExpand = new EventEmitter<boolean>();
  loading = false;
  validateForm: FormGroup;
  expanded = true; // 是否展示操作区

  constructor(
    private fb: FormBuilder,
    injector: Injector,
    private crmTraceLogService: CRMTraceLogService,
    public dataDictionaryService: PUBDataDictionaryService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      remindStartTime: [null, [Validators.required]],
      remindEndTime: [null, [Validators.required]],
      remindPeople: [null, [Validators.required]],
      content: [null], //跟进时间
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

  submit() {
    if (!this.validForm(this.validateForm)) {
      return;
    }
    const params = this.validateForm.value;
    const traceLogItems = [];
    this.loading = true;
    this.crmTraceLogService.create({ ...params, traceLogItems: traceLogItems }).subscribe(
      (r) => {
        this.loading = false;
        this.$message.success(this.$L('Publish success'));
        this.cancel();
        this.onSuccess.emit(true);
      },
      (e) => (this.loading = false),
    );
  }

  cancel() {}
}
