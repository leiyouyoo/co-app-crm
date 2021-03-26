import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload/interface';
import { CoConfigManager, CoPageBase } from '@co/core';
import { CRMCustomerService, CRMTraceLogService } from '../../../../services/crm';
import format from 'date-fns/format';
import { PUBDataDictionaryService } from '../../../../services/pub';
import { SSOUserService } from '@co/cds';
import { differenceInCalendarDays } from 'date-fns';

@Component({
  selector: 'crm-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.less'],
})
export class ScheduleComponent extends CoPageBase implements OnInit {
  @Input() customerId;
  @Output() readonly onSuccess = new EventEmitter<boolean>();
  @Output() readonly onExpand = new EventEmitter<boolean>();
  loading = false;
  validateForm: FormGroup;
  expanded = true; // 是否展示操作区
  listOfOption = [];
  today = new Date();
  //日期验证
  isDateMatch = true;
  constructor(
    private fb: FormBuilder,
    injector: Injector,
    public dataDictionaryService: PUBDataDictionaryService,
    public customerService: CRMCustomerService,
    public ssoUserService: SSOUserService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      remindStartTime: [null, [Validators.required]],
      remindEndTime: [null, [Validators.required]],
      remindPeople: [null],
      beAssigned: [[], [Validators.required]],
      content: [null], //跟进时间
      businessNo: [this.customerId],
    });
    this.getCityOceanUsers();
  }

  //不可用时间
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

  //比较日期
  compareDate(start: Date, end: Date) {
    if (start && end) {
      let num = differenceInCalendarDays(start, end);
      if (num > 0) this.isDateMatch = false;
      else this.isDateMatch = true;
    }
  }

  //获取被分配人
  getCityOceanUsers() {
    this.ssoUserService.getCityOceanUsers({}).subscribe((res: any) => {
      debugger;
      this.listOfOption = res.items;
    });
  }

  onSearch(e) {
    this.ssoUserService.getCityOceanUsers({ name: e }).subscribe((res: any) => {
      this.listOfOption = res.items;
    });
  }

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
    //处理被分配人数据
    const remindPeople = this.validateForm.get('beAssigned').value.join(',');
    this.validateForm.get('remindPeople').setValue(remindPeople);
    const params = this.validateForm.value;
    this.loading = true;
    this.customerService.saveScheduleAsync({ ...params }).subscribe(
      (r) => {
        this.loading = false;
        this.$message.success(this.$L('Publish success'));
        this.validateForm.reset();
        this.cancel();
        this.onSuccess.emit(true);
      },
      (e) => (this.loading = false),
    );
  }

  cancel() {}
}
