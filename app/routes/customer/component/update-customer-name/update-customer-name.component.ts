import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { CoPageBase } from '@co/core';
import { Observable } from 'rxjs';
import { CRMCustomerService } from '../../../../services/crm';

@Component({
  selector: 'crm-update-customer-name',
  templateUrl: './update-customer-name.component.html',
  styleUrls: ['./update-customer-name.component.less'],
})
export class UpdateCustomerNameComponent extends CoPageBase {
  @Input() customerId;
  @Input() nameObj;
  @Output() readonly onSubmitted = new EventEmitter<boolean>();
  form: FormGroup;
  isSubmitted = false; //是否点击保存按钮
  isAdopt = true; //数据是否验证通过
  loading = false;
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private cRMCustomerService: CRMCustomerService,
    private msg: NzMessageService,
    private modal: NzModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.form = this.fb.group({
      customerId: [this.customerId],
      applyRemark: [null],
      name: ['', [Validators.maxLength(100)]],
      nameLocalization: ['', [Validators.maxLength(100)]],
    });
  }

  save(resolve?) {
    if (!this.form.get('name').value && !this.form.get('nameLocalization').value) {
      this.isSubmitted = true;
      this.onSubmitted.emit(false);
      resolve && resolve(false);
      return false;
    }
    this.loading = true;
    this.checkRepetition().subscribe((res) => {
      if (!res) {
        this.loading = false;
        return;
      } else {
        this.cRMCustomerService.applyRenaming(this.form.value).subscribe(
          (res) => {
            this.loading = false;
            this.msg.info(this.$L('Operates successfully'));
            this.onSubmitted.emit(true);
            this.cancel();
          },
          (error) => {
            this.onSubmitted.emit(false);
            this.loading = false;
          },
        );
      }
    });
  }

  cancel() {
    this.modal.destroy();
  }

  //验重
  checkRepetition() {
    return new Observable((ob) => {
      this.cRMCustomerService
        .customerCheckAsync({ name: this.form.get('name').value, nameLocalization: this.form.get('nameLocalization').value })
        .subscribe((res) => {
          this.isAdopt = res.isAdopt;
          ob.next(this.isAdopt);
          ob.complete();
        });
    });
  }
}
