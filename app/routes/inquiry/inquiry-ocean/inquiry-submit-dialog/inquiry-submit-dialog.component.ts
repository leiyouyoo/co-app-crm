import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PlatformOrganizationUnitService, PUBContainerService, PUBPlaceService, PUBTransportClauseService } from '@co/cds';
import { CRMCustomerService } from '../../../../services/crm';
import { NzMessageService } from 'ng-zorro-antd';
import { RatesQuoteEnquiryService } from '../../../../services/rates';
import { Observable } from 'rxjs';

enum VolumeUnitCode {
  CBM = 'TJDWCBM',
  CFT = 'TJDWCFT',
}
enum WeightUnitCode {
  KGS = 'ZLDWKGS',
  LBS = 'ZLDWLBS',
  MT = 'ZLDWMT',
}

@Component({
  selector: 'crm-inquiry-submit-dialog',
  templateUrl: './inquiry-submit-dialog.component.html',
  styleUrls: ['./inquiry-submit-dialog.component.less'],
})
export class InquirySubmitDialogComponent implements OnInit {
  @Input() id: string;
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();
  width: number = 600;
  requestAnimationFrameId: number;
  okLoading = false;
  validateForm: FormGroup;
  basicPortList: any[];
  deliveryList: any[];
  transportList: any;
  ratesList: any;
  unitUsers: any;
  customerUserList: any;
  customerList: any;
  carrierCustomerList: any;

  readonly VolumeUnitCode = VolumeUnitCode;
  readonly WeightUnitCode = WeightUnitCode;

  constructor(
    private pubPlace: PUBPlaceService,
    private fb: FormBuilder,
    private pubTransportClause: PUBTransportClauseService,
    private pubContainer: PUBContainerService,
    private OrganizationUnit: PlatformOrganizationUnitService,
    private crmCustomer: CRMCustomerService,
    private msg: NzMessageService,
    private ratesQuoteEnquiryService: RatesQuoteEnquiryService,
  ) {}

  ngOnInit(): void {
    this.bindData();
    this.validateForm = this.fb.group({
      originPortId: [null, [Validators.required]],
      destinationPortId: [null, [Validators.required]],
      deliveryAddressId: [null],
      transportClauseId: [null, [Validators.required]],
      containerType: [null, [Validators.required]],
      commodity: [null, [Validators.required]],
      ownerCustomerId: [null],
      ownerContactId: [null],
      isShipper: ['false'],
      cargoReadyDate: [null],
      deliveryDate: [null],
      quantity: [null, [this.numValidator()]],
      quantityUnitCode: 'ctn',
      weight: [null, [this.numValidator()]],
      weightUnitId: [null],
      weightUnitCode: [WeightUnitCode.KGS],
      volume: [null, [this.numValidator()]],
      volumeUnitId: [null],
      volumeUnitCode: [VolumeUnitCode.CBM],
      description: [null],
      carrierCustomerId: [null],
      freightMethodType: [1],
      replyUserId: [null, [Validators.required]],
      id: [],
    });

    // 单位公制英制统一切换
    const weightUnitCode = this.validateForm.get('weightUnitCode');
    const volumeUnitCode = this.validateForm.get('volumeUnitCode');
    const hashObj = {
      [VolumeUnitCode.CBM]: WeightUnitCode.KGS,
      [VolumeUnitCode.CFT]: WeightUnitCode.LBS,
      [WeightUnitCode.KGS]: VolumeUnitCode.CBM,
      [WeightUnitCode.LBS]: VolumeUnitCode.CFT,
    };
    weightUnitCode.valueChanges.subscribe((value) => {
      volumeUnitCode.setValue(hashObj[value], { emitEvent: false });
    });
    volumeUnitCode.valueChanges.subscribe((value) => {
      weightUnitCode.setValue(hashObj[value], { emitEvent: false });
    });

    if (this.id) {
      this.getEnquiryDetial(this.id).subscribe((res: any) => {
        let codes;
        if (res.containerType) {
          const code = JSON.parse(res.containerType);
          codes = code.map((c) => c.name);
          res.containerType = codes;
        }
        // console.log(res)
        this.validateForm.patchValue(res, { emitEvent: false });
        const ids = [res.originPortId, res.destinationPortId];
        this.getPortByIds(ids);
        this.getdeliveryList(res.deliveryAddressId);
      });
    }
  }

  bindData() {
    this.getBasicPortList();
    this.getCarrierCustomerList();
    this.getTransportClause();
    this.getRates();
    this.getOrganizationUnitUsers();
    this.getCustomerList();
  }

  handleOk() {
    setTimeout(() => {
      const tmp = document.querySelector('.ant-form-item-explain');
      tmp && (tmp as any).scrollIntoView({ block: 'end', mode: 'smooth' });
    }, 0);
    if (!this.validate()) return;
    let data = this.validateForm.value;
    this.okLoading = true;
    if (data.containerType) {
      data.containerType = JSON.stringify(
        data.containerType.map((res) => {
          return {
            name: res,
            value: 1,
          };
        }),
      );
    }

    if (!data.id) {
      this.ratesQuoteEnquiryService.create(data).subscribe(
        (res: any) => {
          this.msg.success('创建成功');
          this.validateForm.reset();
          this.close.emit(true);
          this.okLoading = false;
        },
        (err) => {
          this.okLoading = false;
        },
      );
    } else {
      this.ratesQuoteEnquiryService.updateForRejectAsync(data).subscribe(
        (res: any) => {
          this.msg.success('编辑成功');
          this.validateForm.reset();
          this.okLoading = false;
          this.close.emit(true);
        },
        (err) => {
          this.okLoading = false;
        },
      );
    }
  }

  getEnquiryDetial(id) {
    return new Observable((ob) => {
      this.ratesQuoteEnquiryService.get({ id: id }).subscribe((res) => {
        ob.next(res);
        ob.complete();
      });
    });
  }

  getPortByIds(ids: any[]) {
    this.pubPlace.getByPlacesIds(ids).subscribe((res: any) => {
      this.basicPortList = res.items;
    });
  }

  getBasicPortList(value = '') {
    if (/[\u4e00-\u9fa5]{2}/gi.test(value) || value.length > 2) {
      this.pubPlace.getAll({ name: value, isOcean: true }).subscribe((res: any) => {
        this.basicPortList = res.items;
        this.deliveryList = res.items;
      });
      // this.customerService.getAllPlace({ Name: value, IsOcean: true }).subscribe((res: any) => {
      //   this.deliveryList = res.items;
      // });
    }
  }

  getTransportClause() {
    this.pubTransportClause.getAll({}).subscribe((res: any) => {
      this.transportList = res.items.filter((data) => {
        if (
          data.description === 'CY-CY' ||
          data.description === 'CY-CFS' ||
          data.description === 'CFS-CFS' ||
          data.description === 'CFS-CY' ||
          data.description === 'CFS-DOOR'
        ) {
          return res;
        }
      });
    });
  }

  getdeliveryList(value) {
    this.pubPlace.getAll({ id: value, isOcean: true }).subscribe((res: any) => {
      this.deliveryList = res.items;
    });
  }

  getRates() {
    this.pubContainer.getAll({ maxResultCount: 100, skipCount: 0 }).subscribe((res: any) => {
      this.ratesList = res.items;
      this.ratesList.sort((a: any, b: any) => {
        const aMatch = a.desc.match(/(\d+)([A-Z]+)/);
        const bMatch = b.desc.match(/(\d+)([A-Z]+)/);
        if (!aMatch) {
          return 1;
        }
        if (!bMatch) {
          return -1;
        }
        const aNumber = aMatch[1];
        const bNumber = bMatch[1];
        const aUnit = aMatch[2];
        const bUnit = bMatch[2];
        switch (true) {
          case aUnit < bUnit:
            return -1;
          case aUnit > bUnit:
            return 1;
          default:
        }
        switch (true) {
          case aNumber < bNumber:
            return -1;
          case aNumber > bNumber:
            return 1;
          default:
            return 0;
        }
      });
    });
  }

  getOrganizationUnitUsers() {
    this.OrganizationUnit.getOrganizationUnitUsers({
      organizationUnitName: '商务部',
    }).subscribe((res: any) => {
      this.unitUsers = res.items;
    });
  }

  onCustomerListChange(id) {
    if (id) {
      this.customerUserList = null;
      this.validateForm.patchValue({
        ownerContactId: null,
      });

      this.customerList.forEach((e) => {
        if (e.id === id) {
          this.customerUserList = e.contacts;
        }
      });
    }
  }

  getCustomerList() {
    this.crmCustomer
      .getCurrentCustomerAndPartner({
        includePartner: false,
      })
      .subscribe((res: any) => {
        this.customerList = res.items;
      });
  }

  getCarrierCustomerList() {
    this.crmCustomer.getCustomerByType({ customerType: 1 }).subscribe((res: any) => {
      this.carrierCustomerList = res.items;
      // console.log(this.carrierCustomerList);
    });
  }

  onStartChange() {
    this.validateForm.patchValue({ deliveryDate: null });
  }

  onResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.width = width > 600 ? width : 600;
    });
  }

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    return startValue.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.validateForm.get('cargoReadyDate').value) {
      return false;
    }

    return endValue.getTime() <= this.validateForm.get('cargoReadyDate').value.getTime();
  };

  validate() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    return this.validateForm.valid;
  }

  closeView() {
    this.close.emit();
  }

  resetView() {
    this.validateForm.reset();
    this.validateForm.patchValue({
      truckType: 2,
      quantityUnitCode: 'ctn',
      weightUnitCode: WeightUnitCode.KGS,
      volumeUnitCode: VolumeUnitCode.CBM,
    });
  }

  numValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return;
      }
      return control.value > 0 ? null : { existSameCode: true };
    };
  }
}
