import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CRMCustomerService } from '../../../../services/crm';
@Component({
  selector: 'apply-cus-code',
  templateUrl: './apply-cus-code.component.html',
  styleUrls: ['./apply-cus-code.component.less'],
})
export class ApplyCusCodeComponent implements OnInit {
  @Input() itemData: any = {}; // 客户代码数据，如果没有则显示客户选择框， 用来区分从客户详情还是首页跳转过来
  @Output() closeModal = new EventEmitter();

  isVisible: boolean = false;
  cusList: any = null;
  validateForm: FormGroup;
  cusCodeList: any = [];
  cusCodePage: number = 0;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private crmCustomerService: CRMCustomerService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      customerid: [null],
    });
  }

  ngOnChanges() {
    if (this.itemData) {
      this.cusCodeList = [];
      this.cusCodeList.push(this.itemData);
    } else {
    }
  }

  async showModal() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false;
    this.cusCodeList = [];
    this.validateForm.get('customerid').setValue(null);
    this.cusCodePage = 0;
  }

  handleOk() {}

  codeItemClose() {
    this.handleCancel();
    this.closeModal.emit();
  }

  submitForm() {
    // console.log(this.validateForm.value);
  }

  // 获取客户列表
  getCusList(searchText) {
    this.crmCustomerService
      .getAll({
        maxResultCount: 20,
        skipCount: 0,
        searchText: searchText,
        includeTaxes: true,
        includeShareOwner: true,
        isOwn: true,
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

  selectCus(item) {
    this.cusCodeList = [];
    this.cusCodeList.push(item);
  }

  onScrollChange(e) {
    if (!this.itemData && this.validateForm.get('customerid').value == null && e.scrollTop + e.clientHeight == e.scrollHeight) {
      this.cusCodePage += 1;
      this.getCusListToList(this.cusCodePage);
    }
  }

  getCusListToList(page) {
    this.loading = true;
    this.crmCustomerService
      .getAll({
        maxResultCount: 20,
        skipCount: page * 20,
        searchText: null,
        includeTaxes: true,
        includeShareOwner: true,
        isOwn: false,
      })
      .subscribe(
        (res: any) => {
          this.cusCodeList = this.cusCodeList.concat(res.items);
          this.loading = false;
        },
        (err) => {
          this.loading = false;
        },
      );
  }
}
