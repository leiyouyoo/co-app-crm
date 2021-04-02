import {
  ChangeDetectionStrategy,
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
import { createPopper, Placement } from '@popperjs/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CoPageBase, debounce } from '@co/core';
import {
  PlatformEditionService,
  PUBDataDictionaryService,
  PUBPlaceService,
  PUBRegionService,
  SSORoleService,
} from '@co/cds';
import { _HttpClient, GoogleMapService } from '@co/common';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzCascaderOption } from 'ng-zorro-antd';
import { PageSideDrawerComponent, STColumn, STComponent } from '@co/cbc';
import { SSOUserService } from '@co/cds';
import { CooperationState, CustomerStatus, CustomerType } from '../../../../models/enum';
import {
  CRMCreateOrUpdateCustomerInput,
  CRMCustomerExamineService,
  CRMCustomerService,
} from '../../../../../../services/crm';
import { cloneDeep, merge } from 'lodash';
import { GlobalEventDispatcher } from '@co/cms';

@Component({
  selector: 'crm-create-potential-customer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-potential-customer.component.html',
  styleUrls: ['./create-potential-customer.component.less'],
})
export class CreatePotentialCustomerComponent extends CoPageBase implements OnInit {
  @Input() set customerInfo(v) {
    //详情展开全部
    this.showBasicInfo = true;
    //暂存 防止取消的时候更新数据
    this.storageCustomerInfo = cloneDeep(v);
    this.initForm(v);
  }

  get customerInfo() {
    return this.customerInfo;
  }

  storageCustomerInfo: any;
  checkRepeatLoading: boolean;
  checkKey: any; //当前验重的字段
  searchParams = {
    maxResultCount: 10,
    skipCount: 0,
    totalCount: 0,
    pageNo: 1,
    pageSize: 10,
  };
  @Input() showAnchor = true;
  @Input() isEdit = false;
  @Input() sideDrawer: PageSideDrawerComponent;
  @Output() readonly onSubmitted = new EventEmitter<any>();
  @ViewChild('st', { static: false }) st: STComponent;
  readonly CooperationState = CooperationState;
  readonly CustomerStatus = CustomerStatus;
  readonly CustomerType = CustomerType;
  popperInstance = null;
  validateForm: FormGroup;
  maxResultCount = 5;
  skipCount = 1;
  userList = [];
  //地区数据
  regions: any[];
  provinces: any[];
  citys: any[];
  loading = false;
  editionlist: any;
  addRegistrationButton = true;
  customerId = '';
  placeList = [];
  incotermList: any[];
  // 常用条款
  industryList: any[];
  name: string;
  scrollTop = 0;
  data: any;
  i = 1;
  emptyGuid = '00000000-0000-0000-0000-000000000000';
  //角色
  rolesList = [];
  customerTypes = [
    {
      name: 'CustomsBroker',
      value: 6,
    },
    {
      name: 'DirectClient',
      value: 4,
    },
    {
      name: 'Express',
      value: 10,
    },
    {
      name: 'Forwarding',
      value: 3,
    },
    {
      name: 'Other',
      value: 12,
    },
    {
      name: 'RailWay',
      value: 9,
    },
    {
      name: 'Storage',
      value: 8,
    },
    {
      name: 'Trucker',
      value: 5,
    },
    {
      name: 'Terminal',
      value: 11,
    },
    {
      name: 'WareHouse',
      value: 7,
    },
  ];

  registrationTypes = [
    {
      name: this.$L('Employer Identification Number'),
      value: 0,
      checked: false,
    },
    {
      name: this.$L('Social Security Number'),
      value: 1,
      checked: false,
    },
    {
      name: this.$L('Individual Taxpayer Identification Number'),
      value: 2,
      checked: false,
    },
    {
      name: this.$L('Adopted Tax Payer Identification Number'),
      value: 3,
      checked: false,
    },
  ];

  repeatList = [];
  verifyMode = ''; // 验证是否为重复客户还是相似客户
  columns: STColumn[] = [
    {
      title: 'Full name (local language)',
      index: 'nameLocalization',
      render: 'nameLocalization',
      width: 120,
      iif: (item) => this.columnConfig.includes('nameLocalization'),
    },
    {
      title: 'Full name(english)',
      index: 'name',
      render: 'name',
      width: 120,
      iif: (item) => this.columnConfig.includes('name'),
    },
    {
      title: 'Adopted Tax Payer Identification Number',
      index: 'customerTaxes',
      render: 'customerTaxes',
      width: 100,
    },
    {
      title: 'Used Name',
      index: 'usedName',
      width: 100,
    },
    {
      title: 'TEL',
      index: 'tel',
      render: 'tel',
      width: 100,
      iif: (item) => this.columnConfig.includes('tel'),
    },
    {
      title: 'Abbreviation(english)',
      index: 'shortName',
      render: 'shortName',
      width: 100,
      iif: (item) => this.columnConfig.includes('shortName'),
    },
    {
      title: 'Abbreviation(local language)',
      index: 'shortNameLocalization',
      render: 'shortNameLocalization',
      width: 120,
      iif: (item) => this.columnConfig.includes('shortNameLocalization'),
    },
    {
      title: 'Email',
      index: 'email',
      render: 'email',
      width: 100,
      iif: (item) => this.columnConfig.includes('email'),
    },
    {
      title: 'Address(english)',
      render: 'address',
      index: 'address',
      width: 100,
      iif: (item) => this.columnConfig.includes('address'),
    },
    {
      title: 'Address(local language)',
      index: 'addressLocalization',
      render: 'addressLocalization',
      width: 120,
      iif: (item) => this.columnConfig.includes('addressLocalization'),
    },
    {
      title: 'Customer owned',
      index: 'owner',
      width: 80,
    },
    {
      title: 'Cooperation State',
      index: 'cooperationState',
      render: 'cooperationState',
      width: 100,
    },
    {
      title: 'Customer Status',
      index: 'status',
      render: 'status',
      width: 100,
    },
    {
      title: 'Customer Type',
      index: 'customerType',
      render: 'customerType',
      width: 100,
    },
    {
      title: 'Action',
      type: 'action',
      width: 80,
      fixed: 'right',
      buttons: [
        {
          text: 'Claim',
          click: (item, _modal, comp) => {
            this.onClaimCustomer(item);
          },
          iif: (item) => !item.owner,
        },
      ],
    },
  ];

  showBasicInfo = false;
  concatInfo = true;
  businessInfo = true;
  taxInfo = false;
  cspInfo = false;
  maxPrice = 99.99;
  minPrice = 50;
  cusLoading: boolean;
  codeLoading: boolean;
  columnConfig: string[] = [];
  connectionCustomerList = [];
  taxNoIndex = 0;
  telIndex = 0;
  isAdopt = true;
  userListParams = {
    isLoading: true,
    maxResultCount: 20,
    skipCount: 0,
    name: null,
  };
  isLoading: boolean;

  constructor(
    private crmCustomerService: CRMCustomerService,
    private crmCustomerExamineService: CRMCustomerExamineService,
    private ssoUserService: SSOUserService,
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
    private googleMapService: GoogleMapService,
    private cdr: ChangeDetectorRef,
    private ssoRoleService: SSORoleService,
    private globalEventDispatcher: GlobalEventDispatcher,
  ) {
    super(injector);
  }

  onTableChange(e) {
    switch (e.type) {
      case 'pi': {
        this.searchParams.pageNo = e.pi;
        this.searchParams.maxResultCount = this.searchParams.pageSize;
        this.searchParams.skipCount = (this.searchParams.pageNo - 1) * this.searchParams.pageSize;
        this.checkRepeatData(this.checkKey);
        break;
      }
      case 'ps': {
        this.searchParams.pageSize = e.ps;
        this.searchParams.maxResultCount = this.searchParams.pageSize;
        this.searchParams.skipCount = (this.searchParams.pageNo - 1) * this.searchParams.pageSize;
        this.checkRepeatData(this.checkKey);
        break;
      }
    }
  }

  show(id, key?) {
    this.validateForm.disable({ emitEvent: false });
    this.validateForm.get(key || id).enable({ emitEvent: false });
    document.querySelector('#tooltip').setAttribute('data-show', '');
    this.create(id || key);
  }

  hide(key?) {
    this.isAdopt = true;
    this.validateForm.enable({ emitEvent: false });
    document.querySelector('#tooltip').removeAttribute('data-show');
    this.destroy();
    if (key === 'all') {
      for (const i in this.validateForm.controls) {
        if (i === 'tel' || i === 'customerTaxes') {
          const controls = (this.validateForm.controls[i] as FormArray).controls;
          for (const z in controls) {
            const formGroup = controls[z] as FormGroup;
            // tslint:disable-next-line: forin
            for (const q in formGroup.controls) {
              formGroup.controls[q].setErrors(null);
              formGroup.controls[q].updateValueAndValidity();
            }
          }
        } else {
          this.validateForm.controls[i].setErrors(null);
          this.validateForm.controls[i].updateValueAndValidity();
        }
      }
      return;
    }
    key && this.validateForm.get(key).setErrors(null);
  }

  create(id) {
    const element = document.querySelector(`#${id}`);
    const tooltip = document.querySelector('#tooltip') as HTMLElement;
    this.popperInstance = createPopper(element, tooltip, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 20],
          },
        },
      ],
    });
    this.st.resetColumns();
  }

  destroy() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  ngOnInit() {
    this.initForm();
    this.initData();
  }

  initData() {
    this.onRolesList();
    this.queryConnectionCustomer('');
    this.getCityOceanUsers('');
    // 获取国家
    this.pubRegionService
      .getAll({
        parentId: '',
      })
      .subscribe((res) => {
        this.regions = res.items;
      });
    this.getEditionAll();
    //贸易方式
    this.pubDataDictionaryService
      .getAll({
        maxResultCount: 2000,
        typeCode: '006',
      })
      .subscribe((res) => {
        this.incotermList = res.items;
      });

    // 行业的
    this.pubDataDictionaryService
      .getAll({
        maxResultCount: 2000,
        typeCode: '098',
      })
      .subscribe((res) => {
        this.industryList = res.items;
      });
  }

  onRolesList() {
    this.ssoRoleService
      .getParentRoles({
        type: 1,
      })
      .subscribe((res: any) => {
        this.rolesList = res.items;
      });
  }

  checkCspKeyWordData(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.validateForm) {
        let value = this.validateForm.get('oceanAttachFee')?.value;
        if (this.minPrice == null && this.maxPrice == null) {
          return;
        }
        if (this.minPrice > value || (this.maxPrice ? value > this.maxPrice : false)) {
          return { existSameCode: true };
        }
      }
    };
  }

  chineseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return;
      }
      const phoneReg = /[^\u4E00-\u9FA50-9]/g;
      const valid = !phoneReg.test(control.value);
      return valid ? null : { existSameCode: true };
    };
  }

  mobileValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const phoneReg = /([0-9\s\-]{7,20})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
      if (!!control.value) {
        const valid = phoneReg.test(control.value);
        return valid ? null : { existSameCode: true };
      }
    };
  }

  @debounce(200)
  searchPlace(value, language = this.translate.currentLang) {
    const form = this.validateForm.value;
    let country = this.regions.filter((item) => item.id === form.countryId)[0] || { nameLocalization: '' };
    let province = (this.provinces || []).filter((item) => item.id === form.provinceId)[0] || { nameLocalization: '' };
    let city = (this.citys || []).filter((item) => item.id === form.cityId)[0] || { nameLocalization: '' };
    const address = `${country.nameLocalization}${province.nameLocalization}${city.nameLocalization}`;
    this.googleMapService.autocomplete(address + value.target.value, language).subscribe((res: any) => {
      this.placeList = res.predictions;
    });
  }

  checkEnData(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let reg = /^[A-Za-z\d\s,.]+$/;
      const valid = reg.test(control.value);
      return valid ? null : { existSameCode: true };
    };
  }

  checkCnData(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let reg = /^[\u4e00-\u9fa5]+$/;
      const valid = reg.test(control.value);
      return valid ? null : { existSameCode: true };
    };
  }

  bindData(name?: string) {
    this.name = name;
    this.validateForm.patchValue({
      name: name,
    });
  }

  addRegistration(registration?: any) {
    let data: any;

    if (registration) {
      data = this.fb.group({
        taxNo: [registration.taxNo, [Validators.required]],
        taxType: [registration.taxType, [Validators.required]],
      });

      this.registrationTypes.forEach((e) => {
        if (e.value === registration.taxType) {
          e.checked = true;
        }
      });
    } else {
      data = this.fb.group({
        taxNo: [null, [Validators.required]],
        taxType: [null, [Validators.required]],
      });
    }

    if ((this.validateForm.controls.customerTaxes as FormArray).length < this.registrationTypes.length) {
      (this.validateForm.controls.customerTaxes as FormArray).push(data);
      if ((this.validateForm.controls.customerTaxes as FormArray).length === this.registrationTypes.length) {
        this.addRegistrationButton = false;
      }
    } else {
      this.addRegistrationButton = false;
    }
  }

  addPhone(tel?: any) {
    let data: any;

    if (tel) {
      let arr = tel.split(',');
      arr.forEach((e, index) => {
        // tslint:disable-next-line: no-shadowed-variable
        if (index >= 1) {
          data = this.fb.group({
            tel: [e, this.mobileValidator()],
          });
        } else {
          data = this.fb.group({
            tel: [e, { validators: [this.mobileValidator()] }],
          });
        }
        (this.validateForm.controls.tel as FormArray).push(data);
      });
      return;
    } else {
      if ((this.validateForm.controls.tel as FormArray).length >= 1) {
        data = this.fb.group({
          tel: [null, { validators: [this.mobileValidator()] }],
        });
      } else {
        data = this.fb.group({
          tel: [null, { validators: [this.mobileValidator()] }],
        });
      }
      (this.validateForm.controls.tel as FormArray).push(data);
    }
  }

  /**
   * 删除
   */
  delete(name, index) {
    (this.validateForm.controls[name] as FormArray).removeAt(index);
  }

  deleteCustomerTaxes(name, index) {
    this.addRegistrationButton = true;
    (this.validateForm.controls.customerTaxes as FormArray).removeAt(index);
    if (name === 0 || name) {
      this.registrationTypes.forEach((e) => {
        if (e.value === name) {
          e.checked = false;
        }
      });
    }
  }

  initForm(data: any = {}) {
    const user = JSON.parse(window.localStorage.getItem('co.session'));
    const userId = user.session?.user?.id;
    this.validateForm = this.fb.group({
      id: [this.emptyGuid],
      name: ['', Validators.required],
      code: [null],
      shortName: [null, { validators: [Validators.required] }],
      nameLocalization: [null],
      shortNameLocalization: [null],
      address: [null, { validators: [Validators.required] }],
      addressLocalization: [null],
      leadTrackingPhase: [0],
      tel: new FormArray([]),
      customerContacts: new FormArray([
        this.fb.group({
          lastname: [null, [Validators.required]],
          name: [null, [Validators.required]],
          nameLocalization: [null],
        }),
      ]),
      fax: [null],
      email: [null, { validators: [Validators.email] }],
      industry: [null],
      customerType: [3, [Validators.required]],
      incoterms: [null],
      isSalesCustomer: [false],
      description: [null],
      state: ['0'],
      countryId: [null, [Validators.required]],
      country: [null, [Validators.required]],
      provinceId: [null],
      cityId: [null],
      encountryId: [null],
      enprovinceId: [null],
      encityId: [null],
      customerTaxes: new FormArray([]),
      customerOwner: [userId], //客户所有人
      connectionCustomerId: [null], //关联客户
      website: [null], //网址
      customerConfigure: [null],
      customerLevel: [null],
      editionRoleId: [null],
      oceanAttachFee: [null],
    });
    this.addPhone(data.tel);
    if (data?.customerTaxes?.length > 0) {
      data.customerTaxes.forEach((item) => {
        this.addRegistration(item);
      });
    }
    if (data?.id) {
      this.setData(data);
    }
  }

  @debounce(1000)
  queryConnectionCustomer(searchText) {
    if (!searchText?.length) {
      return;
    }
    this.isLoading = true;
    this.crmCustomerService.queryConnectionCustomer({ searchText }).subscribe(
      (r) => {
        console.log(r);
        this.isLoading = false;
        this.connectionCustomerList = r;
        this.cdr.detectChanges();
      },
      (e) => (this.isLoading = false),
    );
  }

  loadMore() {
    this.userListParams.skipCount++;
    this.getCityOceanUsers(null, true);
  }

  /**
   * 获取客户所有人数据
   * @param name
   * @param loadMore
   */
  @debounce(1000)
  getCityOceanUsers(name, loadMore = false) {
    this.userListParams.isLoading = true;
    this.userListParams.maxResultCount = 20;
    if (!loadMore) {
      this.userListParams.skipCount = 0;
      this.userListParams.name = name;
      this.userList = [];
    }
    this.httpClient.get('/SSO/User/GetAllActiveUserBySearch', { searchText: name }).subscribe(
      (r: any) => {
        this.userListParams.isLoading = false;
        if (loadMore) {
          this.userList = [...this.userList, ...r];
        } else {
          this.userList = r;
        }
        this.cdr.detectChanges();
      },
      (e) => (this.userListParams.isLoading = false),
    );
  }

  checkRepeatData(key) {
    key && this.checkCustomerAsync(key, this.validateForm.get(key).value);
  }

  taxNoBlur(e, inx) {
    this.taxNoIndex = inx;
    this.checkCustomerAsync(
      'customerTaxes',
      this.validateForm
        .get('customerTaxes')
        .value.filter((ele) => ele.taxNo)
        .map((ele) => {
          return { taxNo: ele.taxNo };
        }),
      'customerTaxes' + inx,
    );
  }

  telBlur(e, inx) {
    this.telIndex = inx;
    this.checkCustomerAsync(
      'tel',
      this.validateForm
        .get('tel')
        .value.filter((ele) => ele.tel)
        .map((ele) => ele.tel)
        .join(','),
      'tel' + inx,
    );
  }

  /**
   *
   * @param key
   * @param value
   * @param id
   */
  checkCustomerAsync(key, value, id?) {
    this.checkKey = key;
    if (
      !value ||
      (this.validateForm.value.code && key == 'tel') ||
      ((this.validateForm.value.code || this.data?.examineState == 1) && (key == 'name' || key == 'nameLocalization'))
    ) {
      return;
    }
    let customerId = null;
    this.checkRepeatLoading = true;
    this.emptyGuid == this.validateForm.value.id ? (customerId = null) : (customerId = this.validateForm.value.id);
    this.crmCustomerService
      .customerCheckAsync({
        name: null,
        [key]: value,
        id: customerId,
        maxResultCount: this.searchParams.pageSize,
        skipCount: this.searchParams.skipCount,
      })
      .subscribe(
        (r) => {
          this.checkRepeatLoading = false;
          this.searchParams.totalCount = r.totalCount;
          this.verifyMode = r.verifyMode;
          this.isAdopt = r.isAdopt;
          if (!r.isAdopt) {
            this.validateForm.get(key).setErrors({ existSame: true });
            this.repeatList = r.validationErrors[key];
            if (r.validationErrors[key]) {
              this.columnConfig = Object.keys(r.validationErrors[key][0]);
            } else {
              this.columnConfig = [];
            }
            this.show(id, key);
          } else if (r.isAdopt) {
            this.validateForm.get(key).setErrors(null);
            this.hide(key);
          }
          this.validateForm.updateValueAndValidity();
        },
        (e) => (this.checkRepeatLoading = false),
      );
  }

  requiredCustomerTaxes() {
    return this.validateForm.value.customerTaxes.every((e) => e.taxNo != null && e.taxNo != '' && e.taxType != null && e.taxType != '');
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  async setData(data) {
    if (JSON.stringify(data) !== '{}') {
      this.data = data;
      this.validateForm.patchValue({
        id: data.id || this.emptyGuid,
        name: this.name || data.name || '',
        code: data.code,
        shortName: data.shortName,
        address: data.address,
        nameLocalization: data.localizationName,
        shortNameLocalization: data.localizationShortName,
        addressLocalization: data.localizationAddress,
        fax: data.fax,
        email: data.email,
        industry: data.industry,
        leadTrackingPhase: data.leadTrackingPhase,
        customerType: data.customerType || 3,
        incoterms: data.incoterms,
        isSalesCustomer: data.isSalesCustomer,
        description: data.description,
        state: data?.status.toString() || '0',
        countryId: data.countryId || null,
        country: data.country || null,
        encountryId: data.countryId || null,
        enprovinceId: data.provinceId || null,
        encityId: data.cityId || null,
        customerContacts: data.contacts?.filter(e => e.isMaster)?.length ? data.contacts.filter(e => e.isMaster) : [
          {
            lastname: null,
            name: null,
            nameLocalization: null,
          },
        ],
        customerLevel: data.customerConfigure.customerLevel || null,
        oceanAttachFee: data.customerConfigure.oceanAttachFee || null,
        editionRoleId: data.editionRoleId,
        connectionCustomerId: data.connectionCustomerId,
      });
      // 绑定地址
      if (data.address) {
        this.placeList.push({
          description: data.address,
        });

        this.placeList.push({
          description: data.localizationAddress,
        });
      }

      await this.selectedCountry(data.countryId);

      await this.selectedProvinces(data.provinceId);

      this.validateForm.patchValue({
        provinceId: data.provinceId || null,
        cityId: data.cityId || null,
      });
      if (data.customerConfigure.customerLevel) {
        this.changeCustomerLevel(data.customerConfigure.customerLevel);
      }
    }
  }

  async selectedCountry(event) {
    if (event) {
      this.validateForm.patchValue({
        encountryId: event,
        provinceId: null,
        enprovinceId: null,
        encityId: null,
        cityId: null,
      });
      let res = await this.pubRegionService
        .getAll({
          parentId: event,
        })
        .toPromise();
      this.provinces = res.items;
      return;
    }
  }

  async selectedProvinces(event) {
    if (event) {
      this.validateForm.patchValue({
        enprovinceId: event,
        encityId: null,
        cityId: null,
      });
      let res = await this.pubPlaceService
        .getAll({
          maxResultCount: 2000,
          regionId: event,
          isCity: true,
        })
        .toPromise();
      this.citys = res.items;
      return;
    }
  }

  //获取网站配置版本
  getEditionAll() {
    this.platformEditionService.getAll({ skipCount: 0, maxResultCount: 20 }).subscribe((c) => {
      this.editionlist = c.items;
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

  /**
   * 偏移量改变
   */
  onPageIndexChanged(pageIndex) {
    this.skipCount = pageIndex;
  }

  /**
   * 页大小改变
   */
  onPageSizeChanged(maxResultCount) {
    this.maxResultCount = maxResultCount;
  }

  /**
   * 认领客户（认领无主客户）
   * @param data
   */
  onClaimCustomer(data) {
    this.loading = true;
    this.crmCustomerService
      .claimCustomer({
        customerId: data.id,
      })
      .subscribe(
        (res) => {
          this.loading = false;
          this.msg.success(this.translate.instant('Claim success'));
          this.destroy();
          this.close(true, true);
        },
        (err) => {
          this.loading = false;
        },
      );
  }

  onChangeRegistrationType(id) {
    let choosed = this.validateForm.get('customerTaxes').value;
    this.registrationTypes.forEach((e) => {
      e.checked = false;
      choosed.forEach((c) => {
        if (c.taxType === e.value) {
          e.checked = true;
        }
      });
    });

    if (this.registrationTypes.every((e) => e.checked === true) && choosed.length === this.registrationTypes.length) {
      this.addRegistrationButton = false;
    }
  }

  bindCommonData(data) {
    this.incotermList.forEach((e) => (e.checked = false));
    data.checked = true;

    this.validateForm.get('incoterms').setValue(data.id, {
      emitEvent: false,
      emitViewToModelChange: false,
    });
  }

  @debounce(200)
  async bindGoogleMapData(input) {
    let res = await this.googleMapService.autocomplete(input, this.translate.currentLang).toPromise();
    let item = res?.predictions;
    if (item) {
      this.validateForm.patchValue({
        country: [null, null, null],
      });

      let choosed: any = item[0]?.terms;
      let selectedCountryId: any;
      let patchCountryIdValue: Function;
      let selectedProvinceId: any;
      let patchProvinceIdValue: Function;
      let selectedCityId: any;
      let patchCityIdValue: Function;
      if (choosed) {
        let choosedCountry = this.regions.filter((c) => {
          let value = c.nameLocalization.trim().toUpperCase();
          let value2 = choosed[choosed.length - 1].value?.toUpperCase();
          return value === value2;
        });
        selectedCountryId = choosedCountry?.length > 0 ? choosedCountry[0].id : null;
        patchCountryIdValue = () => {
          if (!this.validateForm.get('countryId').value) {
            this.validateForm.patchValue({
              countryId: selectedCountryId,
              country: [selectedCountryId, this.validateForm.value.country[1], this.validateForm.value.country[2]],
            });
          }
        };
      }

      if (selectedCountryId) {
        let provinces = await this.pubRegionService
          .getAll({
            parentId: selectedCountryId,
          })
          .toPromise();
        this.provinces = provinces.items;
        if (choosed.length > 1) {
          let choosedProvince = this.provinces.filter((c) => {
            let value = c.nameLocalization.trim().toUpperCase();
            let value2 = choosed[choosed.length - 2].value?.toUpperCase();
            return value.includes(value2) || value2.includes(value);
          });

          selectedProvinceId = choosedProvince?.length > 0 ? choosedProvince[0].id : null;
          patchProvinceIdValue = () => {
            if (!this.validateForm.get('provinceId').value) {
              this.validateForm.patchValue({
                provinceId: selectedProvinceId,
                country: [this.validateForm.value.country[0], selectedProvinceId, this.validateForm.value.country[2]],
              });
            }
          };
        }
      }

      if (selectedProvinceId) {
        let citys = await this.pubPlaceService
          .getAll({
            regionId: selectedProvinceId,
            isCity: true,
          })
          .toPromise();
        this.citys = citys.items;

        if (choosed.length > 2) {
          let choosedCity = this.citys.filter((c) => {
            let value = c.nameLocalization.trim().toUpperCase();
            let value2 = choosed[choosed.length - 3].value?.toUpperCase();
            return value.includes(value2) || value2.includes(value);
          });

          selectedCityId = choosedCity?.length > 0 ? choosedCity[0].id : null;
          patchCityIdValue = () => {
            if (!this.validateForm.get('cityId').value) {
              this.validateForm.patchValue({
                cityId: selectedCityId,
                country: [this.validateForm.value.country[0], this.validateForm.value.country[1], selectedCityId],
              });
            }
          };
        }
      }
      // 一次性执行，避免界面变化太明显
      patchCountryIdValue && patchCountryIdValue();
      patchProvinceIdValue && patchProvinceIdValue();
      patchCityIdValue && patchCityIdValue();

      let detialMsg: any = await this.googleMapService
        .getPlaceDetail(item[0].place_id, {
          language: 'zh-CN',
          fields: 'formatted_address',
        })
        .toPromise();
      this.validateForm.patchValue({
        addressLocalization: detialMsg?.result?.formatted_address,
      });
    }
  }

  bindLocalName() {
    let value = this.validateForm.controls.name.value;
    let oVlaue = this.validateForm.controls.nameLocalization.value;
    if (value && !oVlaue) {
      this.validateForm.patchValue({
        nameLocalization: value,
      });
    } else if (oVlaue && !value) {
      this.validateForm.patchValue({
        name: oVlaue,
      });
    } else {
      this.validateForm.patchValue({
        nameLocalization: value,
      });
    }
  }

  bindFullName() {
    let value = this.validateForm.controls.shortName.value;
    let oVlaue = this.validateForm.controls.shortNameLocalization.value;
    if (value && !oVlaue) {
      this.validateForm.patchValue({
        shortNameLocalization: value,
      });
    } else if (oVlaue && !value) {
      this.validateForm.patchValue({
        shortName: oVlaue,
      });
    } else {
      this.validateForm.patchValue({
        shortNameLocalization: value,
      });
    }
  }

  /** load data async execute by `nzLoadData` method */
  loadData(node: NzCascaderOption, index: number): PromiseLike<void> {
    return new Promise((resolve) => {
      node.isLeaf = false;
      if (index < 0) {
        // if index less than 0 it is root node
        node.children = this.regions;
        this.cdr.detectChanges();
        resolve();
      } else if (index === 0) {
        this.selectedCountry(node.id).then(() => {
          if (!this.provinces?.length) {
            node.isLeaf = true;
            resolve();
            return;
          }
          node.children = this.provinces;
          this.cdr.detectChanges();
          resolve();
        });
      } else if (index === 1) {
        this.selectedProvinces(node.id).then(() => {
          if (!this.citys?.length) {
            node.isLeaf = true;
            resolve();
            return;
          }
          node.children = this.citys?.map((e) => {
            return { ...e, isLeaf: true };
          });
          this.cdr.detectChanges();
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  onCascaderChanges(e) {
    if (!e) {
      this.validateForm.patchValue({
        countryId: null,
        encountryId: null,
        provinceId: null,
        enprovinceId: null,
        cityId: null,
        encityId: null,
      });
    } else {
      this.validateForm.patchValue({
        countryId: e[0] || null,
        encountryId: e[0] || null,
        provinceId: e[1] || null,
        enprovinceId: e[1] || null,
        cityId: e[2] || null,
        encityId: e[2] || null,
      });
    }

    console.log(this.validateForm.value);
  }

  get getCountryName() {
    const country = this.regions?.filter((e) => e.id === this.validateForm.value.countryId)[0]?.nameLocalization;
    const province = this.provinces?.filter((e) => e.id === this.validateForm.value.provinceId)[0]?.nameLocalization;
    const city = this.citys?.filter((e) => e.id === this.validateForm.value.cityId)[0]?.nameLocalization;
    let str = country;
    if (province) {
      str += '/' + province;
    }
    if (city) {
      str += '/' + city;
    }
    return str || null;
  }

  taxInfoChange(e) {
    this.registrationTypes.forEach((e) => {
      e.checked = false;
    });
    if (e) {
      this.validateForm.addControl('customerTaxes', new FormArray([]));
      this.addRegistration();
    } else {
      this.validateForm.removeControl('customerTaxes');
    }
  }

  cspInfoChange(e) {
    if (e) {
      this.validateForm.addControl('customerLevel', new FormControl(null, [Validators.required, Validators.maxLength(20)]));
      this.validateForm.addControl('oceanAttachFee', new FormControl(null, [Validators.required, this.checkCspKeyWordData()]));
    } else {
      this.validateForm.removeControl('customerLevel');
      this.validateForm.removeControl('oceanAttachFee');
    }
  }

  changeCustomerLevel(event: any) {
    switch (event) {
      case 1:
        this.maxPrice = 99.99;
        this.minPrice = 50;
        this.validateForm.patchValue({
          oceanAttachFee: 50,
        });
        break;
      case 2:
        this.maxPrice = 199.99;
        this.minPrice = 100;
        this.validateForm.patchValue({
          oceanAttachFee: 100,
        });

        break;
      case 3:
        this.maxPrice = 299.99;
        this.minPrice = 200;
        this.validateForm.patchValue({
          oceanAttachFee: 200,
        });

        break;
      case 4:
        this.maxPrice = 499.99;
        this.minPrice = 300;
        this.validateForm.patchValue({
          oceanAttachFee: 300,
        });

        break;
      case 5:
        this.maxPrice = null;
        this.minPrice = 500;
        this.validateForm.patchValue({
          oceanAttachFee: 500,
        });

        break;
      case 0:
        this.maxPrice = null;
        this.minPrice = null;
        this.validateForm.patchValue({
          oceanAttachFee: null,
        });

        break;
      default:
        break;
    }
  }

  submit(application?: boolean): void {
    setTimeout(() => {
      const tmp = document.querySelector('.ant-form-item-explain');
      tmp && (tmp as any).scrollIntoView({ block: 'end', mode: 'smooth' });
    }, 0);
    if (!this.validForm(this.validateForm)) {
      this.msg.warning(this.translate.instant('Please check the content'));
      return;
    }
    let value = this.validateForm.value;
    let tel = value.tel.filter((e) => e.tel).map((res) => res.tel);
    if (!value.email && value.tel.every((e) => !e.tel)) {
      this.msg.warning(this.$L('Please enter email or tel'));
      return;
    }
    if (application) {
      this.codeLoading = true;
    } else {
      this.cusLoading = true;
    }
    let entity: CRMCreateOrUpdateCustomerInput = {
      id: value.id,
      name: value.name,
      code: value.code,
      nameLocalization: value.nameLocalization,
      shortName: value.shortName,
      shortNameLocalization: value.shortNameLocalization,
      address: value.address,
      addressLocalization: value.addressLocalization,
      tel: tel.toString(),
      fax: value.fax,
      leadTrackingPhase: value.leadTrackingPhase,
      email: value.email,
      customerType: value.customerType,
      isSalesCustomer: value.isSalesCustomer == null ? false : value.isSalesCustomer,
      countryId: value.countryId,
      provinceId: value.provinceId,
      cityId: value.cityId,
      industry: value.industry,
      description: value.description,
      incoterms: value.incoterms,
      oceanAttachFee: value.oceanAttachFee,
      connectionCustomerId: value.connectionCustomerId,
      customerOwner: value.customerOwner,
      customerLevel: value.customerLevel,
      website: value.website,
      customerContacts: [Object.assign(value.customerContacts[0], { phone: tel.toString(), email: value.email })],
      editionRoleId: value.editionRoleId,
      customerTaxes: value.customerTaxes ? (value.customerTaxes[0]?.taxType != null ? value.customerTaxes : null) : null,
    };
    console.log(entity);

    const applyCode = (id) =>
      this.crmCustomerExamineService
        .postCodeAsync({
          id: id,
          customerTaxes: this.validateForm.value.customerTaxes,
        })
        .subscribe(
          (r) => {
            this.codeLoading = false;
            this.msg.success(this.translate.instant('application success!'));
          },
          (e) => (this.codeLoading = false),
        );
    if (entity.id == this.emptyGuid) {
      this.crmCustomerService.fAMCreate(entity).subscribe(
        (res) => {
          if (application) {
            applyCode(res.id);
          } else {
            this.msg.success(this.translate.instant('Create success!'));
          }
          this.cusLoading = false;
          this.close(true, true);
        },
        (err) => {
          this.cusLoading = false;
          this.close();
        },
      );
    } else {
      //编辑不处理关联公司字段
      delete entity.connectionCustomerId;
      this.crmCustomerService.update(entity).subscribe(
        (res) => {
          if (application) {
            applyCode(this.validateForm.value.id);
          } else {
            this.msg.success(this.translate.instant('Update success!'));
          }
          this.cusLoading = false;
          this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
          this.close(true, true);
        },
        (error) => {
          this.cusLoading = false;
          this.close();
        },
      );
    }
  }

  close(update = false, isClose = false) {
    debugger
    this.sideDrawer?.destroy();
    this.onSubmitted.emit({ update: update, isClose: isClose });
    if (isClose) {
      //如果是取消 将不更新值
      this.setData(this.storageCustomerInfo);
    }
  }

  get checkRequired() {
    let all = true;
    !this.validateForm.get('name').value ? (all = false) : null;
    !this.validateForm.get('shortName').value ? (all = false) : null;
    !this.validateForm.get('country').value ? (all = false) : null;
    !this.validateForm.get('address').value ? (all = false) : null;
    !this.validateForm.get('customerType').value ? (all = false) : null;
    if (this.cspInfo) {
      !this.validateForm.get('customerLevel').value ? (all = false) : null;
      !this.validateForm.get('oceanAttachFee').value ? (all = false) : null;
    }
    this.validateForm.get('customerTaxes')?.value?.forEach((e) => {
      if (!e.taxType || !e.taxNo) {
        all = false;
      }
    });
    return all;
  }
}
