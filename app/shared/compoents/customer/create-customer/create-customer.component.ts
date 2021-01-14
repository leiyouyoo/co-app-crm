import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd';
import { CoConfigManager, debounce } from '@co/core';
import { PUBRegionService, PUBDataDictionaryService, PUBPlaceService, PlatformEditionService } from '@co/cds';
import { Observable } from 'rxjs';
import { _HttpClient, GoogleMapService } from '@co/common';
import { CRMCustomerService } from '../../../../services/crm';
@Component({
  selector: 'create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.less'],
})
export class CreateCustomerComponent {
  maxResultCount = 5;
  skipCount = 1;
  validateForm: any;
  userList: any = {};
  common_select_selected = false;
  //地区数据
  regions: any[];
  provinces: any[];
  citys: any[];
  loading = false;
  //表格验证
  a = this.translate.instant('Cooperating customers');
  b = this.translate.instant('Potential customers');
  c = this.translate.instant('Unowned customers');
  d = this.translate.instant('Share customers');

  customerTypes = [
    {
      name: 'AirLine',
      value: 2,
    },
    {
      name: 'Carrier',
      value: 1,
    },
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

  statuTypes = [
    {
      name: this.translate.instant('潜在客户'),
      value: '0',
    },
    {
      name: this.translate.instant('合作客户'),
      value: '1',
    },
  ];

  registrationTypes = [
    {
      name: this.translate.instant('雇主编号'),
      value: 0,
      checked: false,
    },
    {
      name: this.translate.instant('社会安全号码'),
      value: 1,
      checked: false,
    },
    {
      name: this.translate.instant('个人税务编号'),
      value: 2,
      checked: false,
    },
    {
      name: this.translate.instant('纳税人识别号'),
      value: 3,
      checked: false,
    },
  ];

  editionlist: any;
  addRegistrationButton = true;
  customerId = '';
  placeList = [];
  incotermList: any[];
  // 常用条款
  incotermDataList = [];
  industryList: any[];
  name: string;
  scrollTop = 0;
  data: any;
  i = 1;
  @ViewChild('demo1') demo1: ElementRef;
  @ViewChild('demo2') demo2: ElementRef;
  @ViewChild('demo3') demo3: ElementRef;
  @ViewChild('demo4') demo4: ElementRef;

  constructor(
    private fb: FormBuilder,
    private pubRegionService: PUBRegionService,
    private pubPlaceService: PUBPlaceService,
    private platformEditionService: PlatformEditionService,
    public translate: TranslateService,
    private httpClient: _HttpClient,
    private pubDataDictionaryService: PUBDataDictionaryService,
    private crmCustomerService: CRMCustomerService,
    private msg: NzMessageService,
    private el: ElementRef,
    private googleMapService: GoogleMapService,
  ) {}

  ngOnInit() {
    // 获取国家
    this.pubRegionService
      .getAll({
        parentId: '',
      })
      .subscribe((res) => {
        this.regions = res.items;
      });
  }

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

  checkKeyWordData(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.validateForm) {
        let value1 = this.validateForm.get('name').value;
        let value2 = this.validateForm.get('nameLocalization').value;
        let value = value1 + value2;
        if (value && value.indexOf(control.value) <= -1) {
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

  checkData() {
    let num = this.skipCount - 1;
    if (this.data) {
      return;
    }
    this.crmCustomerService
      .checkDuplicateName({
        name: this.validateForm.get('name').value,
        maxResultCount: this.maxResultCount,
        skipCount: num * this.maxResultCount,
      })
      .subscribe((res: any) => {
        this.userList = res;
      });
  }

  addRegistration(registration?: any) {
    let data: any;

    if (registration) {
      data = this.fb.group({
        taxNo: [registration.taxNo],
        taxType: [registration.taxType],
      });

      this.registrationTypes.forEach((e) => {
        if (e.value === registration.taxType) {
          e.checked = true;
        }
      });
    } else {
      data = this.fb.group({
        taxNo: [null],
        taxType: [null],
      });
    }

    if (this.validateForm.controls.customerTaxes.length < this.registrationTypes.length) {
      (this.validateForm.controls.customerTaxes as FormArray).push(data);
      if (this.validateForm.controls.customerTaxes.length === this.registrationTypes.length) {
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
            tel: [e, [Validators.required, this.mobileValidator()]],
          });
        }
        (this.validateForm.controls.tel as FormArray).push(data);
      });
      return;
    } else {
      if (this.validateForm.controls.tel.length >= 1) {
        data = this.fb.group({
          tel: [null, [this.mobileValidator()]],
        });
      } else {
        data = this.fb.group({
          tel: [null, [Validators.required, this.mobileValidator()]],
        });
      }
      (this.validateForm.controls.tel as FormArray).push(data);
    }
  }

  /**
   * 删除
   */
  delete(name, index) {
    this.validateForm.controls[name].removeAt(index);
  }

  deleteCustomerTaxes(name, index) {
    this.validateForm.controls.customerTaxes.removeAt(index);
    if (name === 0 || name) {
      this.addRegistrationButton = true;
      this.registrationTypes.forEach((e) => {
        if (e.value === name) {
          e.checked = false;
        }
      });
    }
  }

  async initData(data: any = {}) {
    // 获取国家
    this.pubRegionService
      .getAll({
        parentId: '',
      })
      .subscribe((res) => {
        this.regions = res.items;
      });

    this.getEditionAll();

    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      shortName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      nameLocalization: [null],
      shortNameLocalization: [null],
      addressLocalization: [null],
      tel: new FormArray([]),
      fax: [null, [this.mobileValidator()]],
      email: [null, [Validators.email]],
      // email: [null, [FormValidators.email]],
      keyWord: [null, [Validators.required, this.checkKeyWordData()]],
      industry: [null],
      customerType: [3, [Validators.required]],
      incoterms: [null],
      isSalesCustomer: [false],
      description: [null],
      state: ['0'],
      countryId: [null, [Validators.required]],
      provinceId: [null],
      cityId: [null],
      encountryId: [null],
      enprovinceId: [null],
      encityId: [null],
      customerTaxes: new FormArray([]),
    });

    this.addPhone(data.tel);

    if (data?.customerTaxes?.length > 0) {
      data.customerTaxes.forEach((item) => {
        this.addRegistration(item);
      });
    } else {
      this.addRegistration(null);
    }

    //贸易方式
    this.pubDataDictionaryService
      .getAll({
        maxResultCount: 1000,
        typeCode: '006',
      })
      .subscribe((res) => {
        this.incotermList = res.items;
        let data = this.incotermList.find((e) => e.name === 'FOB');
        if (!this.incotermDataList.some((e) => e.name === data.name)) {
          this.incotermDataList.push(data);
          this.incotermList.splice(
            this.incotermList.findIndex((e) => e.name === 'FOB'),
            1,
          );
        }

        let data2 = this.incotermList.find((e) => e.name === 'CIF');
        if (!this.incotermDataList.some((e) => e.name === data2.name)) {
          this.incotermDataList.push(data2);
          this.incotermList.splice(
            this.incotermList.findIndex((e) => e.name === 'CIF'),
            1,
          );
        }

        // 绑定值
        if (this.validateForm.get('incoterms').value != '' || this.validateForm.get('incoterms').value != null) {
          let value = this.validateForm.get('incoterms').value;
          let index = this.incotermList.findIndex((e) => e.id === value);
          if (index != -1) {
            this.common_select_selected = true;
          }

          let index2 = this.incotermDataList.findIndex((e) => e.id === value);
          if (index2 != -1) {
            this.incotermDataList[index2].checked = true;
          }
        }
      });

    // 行业的
    this.pubDataDictionaryService
      .getAll({
        maxResultCount: 1000,
        typeCode: '098',
      })
      .subscribe((res) => {
        this.industryList = res.items;
      });

    if (data) {
      this.setData(data);
    }
  }

  requiredCustomerTaxes() {
    return this.validateForm.value.customerTaxes.every((e) => e.taxNo != null && e.taxNo != '' && e.taxType != null && e.taxType != '');
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  async setData(data) {
    if (JSON.stringify(data) !== '{}') {
      this.data = data;
      this.validateForm.patchValue({
        name: this.name || data.name || '',
        shortName: null || data.shortName,
        address: null || data.address,
        nameLocalization: null || data.localizationName,
        shortNameLocalization: null || data.localizationShortName,
        addressLocalization: null || data.localizationAddress,
        fax: null || data.fax,
        email: null || data.email,
        keyWord: null || data.keyWord,
        industry: null || data.industry,
        customerType: null || data.customerType || 3,
        incoterms: null || data.incoterms,
        isSalesCustomer: false || data.isSalesCustomer,
        description: null || data.description,
        state: data?.status.toString() || '0',
        countryId: data.countryId || null,
        encountryId: data.countryId || null,
        enprovinceId: data.provinceId || null,
        encityId: data.cityId || null,
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
          maxResultCount: 1000,
          regionId: event,
          isCity: true,
        })
        .toPromise();
      this.citys = res.items;
      return;
    }
  }

  selectedCity(event) {
    if (event) {
      this.validateForm.patchValue({
        encityId: event,
      });
    }
  }

  //获取网站配置版本
  getEditionAll() {
    this.platformEditionService.getAll({ skipCount: 0, maxResultCount: 20 }).subscribe((c) => {
      this.editionlist = c.items;
    });
  }

  submitForm() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      if (i === 'tel' || i === 'customerTaxes') {
        const controls = (this.validateForm.controls[i] as FormArray).controls;

        for (const z in controls) {
          const formGroup = controls[z] as FormGroup;
          // tslint:disable-next-line: forin
          for (const q in formGroup.controls) {
            formGroup.controls[q].markAsDirty();
            formGroup.controls[q].updateValueAndValidity();
          }
        }
      } else {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    return this.validateForm.valid;
  }

  /**
   * 偏移量改变
   */
  onPageIndexChanged(pageIndex) {
    this.skipCount = pageIndex;
    this.checkData();
  }

  /**
   * 页大小改变
   */
  onPageSizeChanged(maxResultCount) {
    this.maxResultCount = maxResultCount;
    this.checkData();
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
          this.checkData();
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
    this.common_select_selected = false;
    this.incotermList.forEach((e) => (e.checked = false));
    this.incotermDataList.forEach((e) => (e.checked = false));
    data.checked = true;

    this.validateForm.get('incoterms').setValue(data.id, {
      emitEvent: false,
      emitViewToModelChange: false,
    });
  }

  bindSelectCommonData(data) {
    if (data) {
      this.incotermDataList.forEach((e) => (e.checked = false));
      this.common_select_selected = true;
    }
  }

  @debounce(200)
  async bindGoogleMapData(input) {
    let res = await this.googleMapService.autocomplete(input, this.translate.currentLang).toPromise();
    let item = res?.predictions;
    if (item) {
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
}
