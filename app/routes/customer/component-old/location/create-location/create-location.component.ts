import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PUBPlaceService, PUBRegionService } from '@co/cds';
import { debounce } from '@co/core';
import { CRMContactService, CRMCreateOrUpdateContactInput } from 'apps/crm/app/services/crm';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { GoogleMapService } from '@co/common';

@Component({
  selector: 'create-location',
  templateUrl: './create-location.component.html',
  styleUrls: ['./create-location.component.less'],
})
export class CreateLocationComponent implements OnInit {
  @Input() customerId: any;
  @Input() partnerId: any;

  @Output() datas = new EventEmitter();
  placeList = [];
  isVisible = false;
  //地区数据
  regions: any[];
  provinces: any[];
  citys: any[];
  //表格验证
  validateForm: FormGroup;
  validateContactForm: FormGroup;
  //联系人
  contacts: any[];
  //是否显示新增联系人
  isAddContacts = false;
  locationId: any;
  edit = false;
  loading = false;
  title = this.translate.instant('Add Location');

  width = 600;
  requestAnimationFrameId: number;
  constructor(
    private pubPlaceService: PUBPlaceService,
    private googleMapService: GoogleMapService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private pubRegionService: PUBRegionService,
    private crmContactService: CRMContactService,
  ) {}

  ngOnInit() {
    this.initData();
    this.get('').subscribe((res) => {
      this.regions = res.items;
    });
  }

  onResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.width = width > 600 ? width : 600;
    });
  }

  async initData(data: any = {}) {
    this.title = this.translate.instant('Add Location');
    // 获取国家
    this.get('').subscribe((res) => {
      this.regions = res.items;
    });
    //获取联系人列表
    this.getInitCustomerOrPartner();

    // tslint:disable-next-line: one-variable-per-declaration

    this.validateForm = this.fb.group({
      locationName: [null, [Validators.required]],
      contacts: [null],
      country: [null, [Validators.required]],
      remarks: [null],
      province: [null],
      postalCode: [null, [Validators.required]],
      city: [null],
      portCode: [null],
      address: [null, [Validators.required]],
      address2: [null, [Validators.required]],
      locationAddress: [null],
    });

    this.validateContactForm = this.fb.group({
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      nameLocalization: [null],
      phone: [null],
      mail: [null, [Validators.required, Validators.email]],
      customerId: [this.customerId],
    });

    if (data) {
      await this.selectedCountry(data.countryId);
      await this.selectedCity(data.provinceId);
    }
  }

  async bindData(data) {
    this.locationId = data.id;
    if (data.id) {
      this.title = this.translate.instant('Edit Location');
    } else {
      this.title = this.translate.instant('New Location');
    }

    this.validateContactForm.reset();
    this.validateForm.patchValue({
      locationName: data.name,
      contacts: data.contactIds,
      country: data.countryId,
      remarks: data.locationAddition.description,
      province: data.provinceId,
      postalCode: data.zip,
      city: data.cityId,
      portCode: data.locationAddition.unlocode,
      address: data.streetAddress,
      address2: data.streetAddress2,
      locationAddress: data.streetAddressLocalization,
    });
    if (data.countryId) {
      await this.selectedCountry(data.countryId);
      await this.selectedCity(data.provinceId);
      this.validateForm.patchValue({
        province: data.provinceId,
        city: data.cityId,
      });
    }
  }

  async selectedCountry(event) {
    if (!event) {
      return;
    }
    this.validateForm.patchValue({
      province: null,
      city: null,
    });

    let res: any = await this.get(event).toPromise();
    this.provinces = res.items;
    return;
  }

  async selectedCity(event) {
    if (!event) {
      return;
    }
    this.validateForm.patchValue({
      city: null,
    });

    let res: any = await this.pubPlaceService
      .getAll({
        regionId: event,
        maxResultCount: 1000,
        isCity: true,
      })
      .toPromise();
    this.citys = res.items;
  }

  @debounce(200)
  searchPlace(value, language = this.translate.currentLang) {
    const form = this.validateForm.value;
    let country = this.regions.filter((item) => item.id === form.country)[0] || { nameLocalization: '' };
    let province = (this.provinces || []).filter((item) => item.id === form.province)[0] || { nameLocalization: '' };
    let city = (this.citys || []).filter((item) => item.id === form.city)[0] || { nameLocalization: '' };
    const address = `${country.nameLocalization}${province.nameLocalization}${city.nameLocalization}`;
    this.googleMapService.autocomplete(address + value.target.value, language).subscribe((res: any) => {
      this.placeList = res.predictions;
    });
  }

  getInitCustomerOrPartner() {
    let data: any = {};
    if (this.customerId) {
      data.customerId = this.customerId;
    }
    if (this.partnerId) {
      data.partnerId = this.partnerId;
    }

    this.crmContactService.getByCustomerOrPartner(data).subscribe((res: any) => {
      this.contacts = res.items;
    });
  }

  getRegionInfo() {
    return this.pubRegionService.getAll({});
  }

  get(id: any) {
    let obj = { parentId: id };
    return this.pubRegionService.getAll(obj);
  }

  addContacts() {
    this.isAddContacts = !this.isAddContacts;
    if (this.isAddContacts) {
      this.validateContactForm.reset();
    }
  }

  contactForm() {
    // tslint:disable-next-line: forin
    for (const i in this.validateContactForm.controls) {
      this.validateContactForm.controls[i].markAsDirty();
      this.validateContactForm.controls[i].updateValueAndValidity();
    }
    if (this.validateContactForm.valid) {
      let entity: CRMCreateOrUpdateContactInput = {
        nameLocalization: this.validateContactForm.value.nameLocalization,
        name: this.validateContactForm.value.name,
        surname: this.validateContactForm.value.surname,
        customerId: this.customerId,
        phone: this.validateContactForm.value.phone,
        email: this.validateContactForm.value.mail,
      };

      if (this.partnerId) {
        entity.partnerId = this.partnerId;
        this.crmContactService.createForPartner(entity).subscribe((res) => {
          this.getInitCustomerOrPartner();
          this.isAddContacts = false;
        });
      } else {
        this.crmContactService.createForCustomer(entity).subscribe((res) => {
          this.getInitCustomerOrPartner();
          this.isAddContacts = false;
        });
      }
    }
  }

  handleCancel() {
    this.loading = false;
    this.isVisible = false;
  }

  handleOk() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    setTimeout(() => {
      const tmp = document.querySelector('.ant-form-item-explain');
      tmp && (tmp as any).scrollIntoView({ block: 'end', mode: 'smooth' });
    }, 0);
    if (this.validateForm.valid) {
      let value = this.validateForm.value;
      let entity: any = {
        customerId: this.customerId,
        countryId: value.country,
        provinceId: value.province,
        cityId: value.city,
        name: value.locationName,
        streetAddress: value.address,
        streetAddress2: value.address2,
        streetAddressLocalization: value.locationAddress,
        contactIds: value.contacts,
        description: value.remarks,
        zip: value.postalCode,
        locationAddition: {
          unlocode: value.portCode,
          description: value.remarks,
        },
      };

      if (this.locationId) {
        entity.id = this.locationId;
      }
      this.loading = true;
      this.datas.emit(entity);
    }
  }

  show() {
    this.isVisible = true;
  }
  @debounce(200)
  async bindGoogleMapData(input) {
    let res = await this.googleMapService.autocomplete(input, this.translate.currentLang).toPromise();
    let item = res?.predictions;
    if (item) {
      let choosed: any = item[0]?.terms;
      let selectedCountryId: any;
      let selectedProvinceId: any;
      let selectedCityId: any;
      let patchCountryIdValue: Function;
      let patchProvinceIdValue: Function;
      let patchCityIdValue: Function;
      if (choosed) {
        let choosedCountry = this.regions.filter((c) => {
          let value = c.nameLocalization.trim().toUpperCase();
          let value2 = choosed[choosed.length - 1].value?.toUpperCase();
          return value === value2;
        });
        selectedCountryId = choosedCountry?.length > 0 ? choosedCountry[0].id : null;
        patchCountryIdValue = () => {
          if (!this.validateForm.get('country').value) {
            this.validateForm.patchValue({
              country: selectedCountryId,
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
          let choosedProvince = provinces.items.filter((c) => {
            let value = c.nameLocalization.trim().toUpperCase();
            let value2 = choosed[choosed.length - 2].value?.toUpperCase();
            return value.includes(value2) || value2.includes(value);
          });
          selectedProvinceId = choosedProvince?.length > 0 ? choosedProvince[0].id : null;
          patchProvinceIdValue = () => {
            if (!this.validateForm.get('province').value) {
              this.validateForm.patchValue({
                province: selectedProvinceId,
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
        this.citys = res.items;

        if (choosed.length > 2) {
          let choosedCity = citys.items.filter((c) => {
            let value = c.nameLocalization.trim().toUpperCase();
            let value2 = choosed[choosed.length - 3].value?.toUpperCase();
            return value.includes(value2) || value2.includes(value);
          });
          selectedCityId = choosedCity?.length > 0 ? choosedCity[0].id : null;
          patchCityIdValue = () => {
            if (!this.validateForm.get('city').value) {
              this.validateForm.patchValue({
                city: selectedCityId,
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
        locationAddress: detialMsg?.result?.formatted_address,
      });
    }
  }
}
