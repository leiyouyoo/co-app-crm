import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatformEditionService, PUBDataDictionaryService, PUBPlaceService, PUBRegionService } from '@co/cds';
import { GoogleMapService, _HttpClient } from '@co/common';
import { CoPageBase } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { CRMCustomerService } from 'apps/crm/app/services/crm';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'crm-potentailcustomer-detail',
  templateUrl: './potentailcustomer-detail.component.html',
  styleUrls: ['./potentailcustomer-detail.component.less'],
})
export class PotentailcustomerDetailComponent extends CoPageBase {
  @Output() readonly actionChange = new EventEmitter<any>();
  @Input() set customerInfo(v) {
    this.customerDetail = v;
    this.initData(v);
  }
  get customerInfo() {
    return this.customerDetail;
  }
  customerDetail: any;
  @Output() readonly onSubmitted = new EventEmitter<boolean>();
  @Input() readonly = true;
  @Input() customerId;
  popperInstance = null;
  validateForm: FormGroup;
  maxResultCount = 5;
  skipCount = 1;
  userList: any = {};
  //地区数据
  regions: any[];
  provinces: any[];
  citys: any[];
  loading = false;
  editionlist: any;
  addRegistrationButton = true;
  // 常用条款
  industryList: any[];
  name: string;
  scrollTop = 0;
  data: any;
  i = 1;
  @ViewChild('demo1') demo1: ElementRef;
  @ViewChild('demo2') demo2: ElementRef;
  @ViewChild('demo3') demo3: ElementRef;
  @ViewChild('demo4') demo4: ElementRef;
  showBasicInfo = true;
  concatInfo = true;
  businessInfo = true;
  taxInfo = true;
  cspInfo = true;
  sysInfo = true;
  maxPrice = 99.99;
  minPrice = 50;
  cusLoading: boolean;
  applicationLoading: boolean;
  edit = false;
  constructor(
    private crmCustomerService: CRMCustomerService,
    injector: Injector,
    private fb: FormBuilder,
    private pubRegionService: PUBRegionService,
    private pubPlaceService: PUBPlaceService,
    private platformEditionService: PlatformEditionService,
    public translate: TranslateService,
    private httpClient: _HttpClient,
    private pubDataDictionaryService: PUBDataDictionaryService,
    private msg: NzMessageService,
    private el: ElementRef,
    public cdr: ChangeDetectorRef,
  ) {
    super(injector);
  }

  show(id) {
    this.validateForm.disable({ emitEvent: false });
    this.validateForm.get(id).enable({ emitEvent: false });
    document.querySelector('#tooltip').setAttribute('data-show', '');
  }

  hide() {
    this.validateForm.enable({ emitEvent: false });
    document.querySelector('#tooltip').removeAttribute('data-show');
    this.destroy();
  }

  destroy() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  ngOnInit() {}

  editCustomer() {
    this.edit = !this.edit;
  }

  onSubmit(e) {
    if (e&&e.update) {
      this.onSubmitted.emit(true)
      this.edit = false;
    }
    if (e&&e.isClose) {
      this.edit = false;
    }
  }
  // getCustomerDetail(id) {
  //   this.loading = true;
  //   this.crmCustomerService.fAMGetCustomerDetail({ id: id }).subscribe(
  //     (res) => {
  //       this.loading = false;
  //       this.initData(res);
  //     },
  //     (error) => {
  //       this.loading = false;
  //     },
  //   );
  // }

  ngScroll() {
    let _scroll = document.querySelector('.head_customer');
    _scroll.addEventListener('scroll', () => {
      let height1 = this.demo1.nativeElement.scrollHeight;
      let height2 = this.demo2.nativeElement.scrollHeight;
      let height3 = this.demo3.nativeElement.scrollHeight;
      this.scrollTop = document.querySelector('.head_customer').scrollTop;
      if (this.scrollTop < height1) {
        this.i = 1;
      } else if (this.scrollTop >= height1 && this.scrollTop < height1 + height2) {
        this.i = 2;
      } else if (this.scrollTop >= height1 && this.scrollTop >= height1 + height2 && this.scrollTop < height1 + height2 + height3) {
        this.i = 3;
      } else {
        this.i = 4;
      }
    });
  }

  ngScrollBottom() {
    document.querySelector('#head_customer_modal').scrollTop =
      this.el.nativeElement.querySelector('#head_customer_modal').scrollHeight + 100;
  }

  initData(data: any = {}) {
    this.validateForm = this.fb.group({
      name: [data.name, [Validators.required]],
      code: [data.code, [Validators.required]],
      shortName: [data.shortName, [Validators.required]],
      address: [data.address, [Validators.required]],
      localizationName: [data.localizationName],
      localizationShortName: [data.localizationShortName],
      localizationAddress: [data.localizationAddress],
      tel: [data.tel],
      fax: [data.fax],
      email: [data.email, [Validators.email]],
      keyWord: [data.keyWord, [Validators.required]],
      industry: [data.industry],
      industryDisplay: [data.industryDisplay],
      customerType: [data.customerType, [Validators.required]],
      incoterms: [data.incoterms],
      incotermsDisplay: [data.incotermsDisplay],
      isSalesCustomer: [data.isSalesCustomer],
      description: [data.description],
      state: [data.state],
      countryId: [data.countryId, [Validators.required]],
      country: [data.country, [Validators.required]],
      provinceId: [data.provinceId],
      cityId: [data.cityId],
      customerTaxes: [data.customerTaxes],
      customerConfigure: [data.customerConfigure],
      status: [data.status],
      creationTime: [data.creationTime],
      lastModificationTime: [data.lastModificationTime],
      creationUser: [data.creationUser],
      lastModificationUser: [data.lastModificationUser],
      examineTime: [data.examineTime],
      relatedCustomers: [data.relatedCustomers],
      customerRenamings: [data.customerRenamings],
      beforeNames: [data.beforeNames],
      ownerUserList: [data.ownerUserList],
      examineState: [data.examineState],
    });
  }

  onGoDetial(data) {
    this.i = data;
    if (data === 1) {
      this.demo1.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'start' });
    } else if (data === 2) {
      this.demo2.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'start' });
    } else if (data === 3) {
      this.demo3.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'start' });
    } else if (data === 4) {
      this.demo4.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'start' });
    }
    // let hegiht = document.getElementById('demo' + data).offsetTop;
    // document.getElementsByClassName('head')[0].scrollTo(0, hegiht - 120);
  }
}
