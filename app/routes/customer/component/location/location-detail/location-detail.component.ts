import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PUBPlaceService, PUBRegionService } from '@co/cds';
import { GoogleMapService } from '@co/common';
import { CoPageBase, debounce } from '@co/core';
import { TranslateService } from '@ngx-translate/core';
import { NzCascaderOption, NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { createPopper, Placement } from '@popperjs/core';
import { STComponent } from '@co/cbc';
import { CRMContactService, CRMLocationService } from 'apps/crm/app/services/crm';
import { ContactDetailComponent } from '../../contact/contact-detail/contact-detail.component';
@Component({
  selector: 'crm-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.less'],
})
export class LocationDetailComponent extends CoPageBase implements OnInit {
  @ViewChild('st', { static: false }) st: STComponent;
  @Input() isbingLocation = false;
  @Input() id;
  @Input() customerId;
  @Input() contactIds = [];
  validateForm: FormGroup;
  isShow = false;
  isAdopt = true;
  popperInstance = null;
  regions: any[] = [];
  provinces: any[] = [];
  citys: any[] = [];
  placeList = [];
  contactList = [];
  @Output() readonly onSubmitted = new EventEmitter<boolean>();
  @Output() readonly bingLocation = new EventEmitter<boolean>();

  roleList = [];
  positionList = [];
  loading = false;
  isSuccess = true; //邮箱是否被注册过
  isSubmitted = false;
  emptyGuid = '00000000-0000-0000-0000-000000000000';
  constructor(
    private fb: FormBuilder,
    private googleMapService: GoogleMapService,
    public translate: TranslateService,
    private pubRegionService: PUBRegionService,
    private pubPlaceService: PUBPlaceService,
    private crmContactService: CRMContactService,
    private crmLocationService: CRMLocationService,
    private modalRef: NzModalRef,
    private msg: NzMessageService,
    private modal: NzModalService,
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initForm();
    this.initData();
    this.getContacts(this.customerId);
    this.fetchRemoteData();
  }

  initData() {
    // 获取国家
    this.pubRegionService
      .getAll({
        parentId: '',
      })
      .subscribe((res) => {
        this.regions = res.items;
      });
  }

  getContacts(id) {
    this.crmContactService.getByCustomerOrPartner({ customerId: id, maxResultCount: 999 }).subscribe((res: any) => {
      this.contactList = res.items;
    });
  }

  initForm() {
    this.validateForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      streetAddressLocalization: [null, [Validators.required]],
      streetAddress: [null, [Validators.required]],
      streetAddress2: [null],
      zip: [null, [Validators.required]],
      countryId: [null, [Validators.required]],
      country: [null, [Validators.required]],
      provinceId: [null],
      cityId: [null],
      encountryId: [null],
      enprovinceId: [null],
      encityId: [null],
      viewableType: [null],
      locationAddition: [null],
      portCode: [null],
      partnerId: [null],
      contactIds: [this.contactIds],
      customerId: [this.customerId],
      reamrk: [null],
    });
  }

  private fetchRemoteData() {
    if (this.id) {
      this.crmLocationService.get({ id: this.id }).subscribe((res) => {
        this.validateForm.reset({
          id: res.id,
          name: res.name,
          streetAddressLocalization: res.streetAddressLocalization,
          streetAddress: res.streetAddress,
          streetAddress2: res.streetAddress2,
          zip: res.zip,
          countryId: res.countryId,
          country: [res.countryId, res.provinceId, res.cityId],
          provinceId: res.provinceId,
          cityId: res.cityId,
          encountryId: res.countryId,
          enprovinceId: res.provinceId,
          encityId: res.cityId,
          viewableType: res.viewableType,
          locationAddition: res.locationAddition,
          portCode: res.locationAddition.unlocode,
          partnerId: res.partnerId,
          contactIds: res.contactIds,
          customerId: res.customerId,
          reamrk: res.reamrk,
        });
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
        resolve();
      } else if (index === 0) {
        this.selectedCountry(node.id).then(() => {
          if (!this.provinces?.length) {
            node.isLeaf = true;
            resolve();
            return;
          }
          node.children = this.provinces;
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
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  async selectedCountry(event) {
    if (event) {
      event != this.validateForm.value.encountryId &&
        this.validateForm.patchValue({
          encountryId: event,
          countryId: event,
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
      event != this.validateForm.value.enprovinceId &&
        this.validateForm.patchValue({
          enprovinceId: event,
          encityId: null,
          cityId: null,
          provinceId: event,
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

  checkRepeatData(key) {
    key && this.checkCustomerAsync(key, this.validateForm.get(key).value);
  }

  /**
   *
   * @param key
   * @param value
   * @param id
   */
  checkCustomerAsync(key, value, id?) {
    if (!value) {
      this.hide(key);
      return;
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
        streetAddressLocalization: detialMsg?.result?.formatted_address,
      });
    }
  }
  originLocationsearch(e) {}
  clearLocation(e, type) {}
  @debounce(200)
  searchPlace(value, language = this.translate.currentLang) {
    const form = this.validateForm.value;
    let country = this.regions.filter((item) => item.id === form.countryId)[0] || { nameLocalization: '' };
    let province = (this.provinces || []).filter((item) => item.id === form.provinceId)[0] || { nameLocalization: '' };
    let city = (this.citys || []).filter((item) => item.id === form.cityId)[0] || { nameLocalization: '' };
    const streetAddress = `${country.nameLocalization}${province.nameLocalization}${city.nameLocalization}`;
    this.googleMapService.autocomplete(streetAddress + value.target.value, language).subscribe((res: any) => {
      this.placeList = res.predictions;
    });
  }

  save() {
    this.loading = true;
    if (!this.validForm(this.validateForm) || !this.isSuccess) {
      this.msg.warning(this.translate.instant('Please check the content'));
      this.loading = false;
      this.isSubmitted = true;
      return;
    }
    //处理数据
    if (this.validateForm.value.portCode) {
      this.validateForm.get('locationAddition').setValue({ unlocode: this.validateForm.value.portCode });
    }
    if (!this.validateForm.value.id) {
      this.crmLocationService.createCustomerLocation(this.validateForm.value).subscribe(
        (res) => {
          this.loading = false;
          this.onSubmitted.emit(true);
          this.msg.info(this.$L('Added successfully!'));
          this.isbingLocation = false; //false 直接关闭窗口
          this.cancel();
        },
        (error) => {
          this.loading = false;
        },
      );
    } else {
      this.crmLocationService.update(this.validateForm.value).subscribe(
        (res) => {
          this.loading = false;
          this.onSubmitted.emit(true);
          this.msg.info(this.$L('Edited successfully!'));
          this.isbingLocation = false; //false 直接关闭窗口
          this.cancel();
        },
        (error) => {
          this.loading = false;
        },
      );
    }
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
  cancel() {
    //是否直接关闭弹窗
    if (this.isbingLocation) {
      this.bingLocation.emit(true);
    } else {
      this.modalRef.destroy();
    }
  }

  onAddContact(title, item?) {
    const modal = this.modal.create({
      nzTitle: this.$L(title),
      nzContent: ContactDetailComponent,
      nzComponentParams: {
        id: item?.id,
        customerId: this.customerId,
      },
      nzClassName: 'crm-contact-detail',
      nzStyle: { width: '40%' },
      nzFooter: null,
    });
    modal.componentInstance.onSubmitted.subscribe((res) => {
      if (res.isSucccess) {
        // this.st.load();
        //获取联系人数据
        let myArray = [];
        myArray = this.validateForm.get('contactIds').value;
        //联系人新增成功之后默认选中当前新增联系人到下拉框
        myArray.push(res.id);
        this.validateForm.get('contactIds').setValue(myArray);
        this.getContacts(this.customerId);
      }
    });
  }
}
