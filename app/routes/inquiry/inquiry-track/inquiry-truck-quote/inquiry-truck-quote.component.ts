import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TrackDetialComponent } from '../../track-detial/track-detial.component';
import { TruckingFromToComponent } from '../../share/component/trucking-from-to/trucking-from-to.component';
import { PlatformOrganizationUnitService } from '@co/cds';
import { CRMCustomerService } from '../../../../services/crm';
import { RatesQuoteEnquiryService } from '../../../../services/rates';
import { NzMessageService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

enum VolumeUnitCode {
  CBM = "TJDWCBM",
  CFT = "TJDWCFT"
}
enum WeightUnitCode {
  KGS = "ZLDWKGS",
  LBS = "ZLDWLBS",
  MT = "ZLDWMT"
}

@Component({
  selector: 'crm-inquiry-truck-quote',
  templateUrl: './inquiry-truck-quote.component.html',
  styleUrls: ['./inquiry-truck-quote.component.less']
})
export class InquiryTruckQuoteComponent implements OnInit {
  @Input() id: string;
  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter();

  @ViewChild(TruckingFromToComponent)
  truckingFromToComponent: TruckingFromToComponent;

  okLoading = false;
  width: number = 600;
  requestAnimationFrameId: number;
  validateForm: FormGroup;
  unitUsers: any;
  customerUserList: any;
  customerList: any;
  carrierCustomerList: any;

  readonly VolumeUnitCode = VolumeUnitCode;
  readonly WeightUnitCode = WeightUnitCode;

  constructor(private fb: FormBuilder,
    private OrganizationUnit: PlatformOrganizationUnitService,
    private crmCustomer: CRMCustomerService,
    private ratesQuoteEnquiryService: RatesQuoteEnquiryService,
    private msg: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      truckType: [2, [Validators.required]],
      truckPortId: [null, [Validators.required]],
      truckAddressId: [null, [Validators.required]],
      ownerCustomerId: [null],
      ownerContactId: [null],
      isShipper: ['false'],
      cargoReadyDate: [null],
      deliveryDate: [null],
      quantity: [null, [this.numValidator()]],
      quantityUnitCode: 'ctn',
      weight: [null, [this.numValidator()]],
      weightUnitCode: [WeightUnitCode.KGS],
      volume: [null, [this.numValidator()]],
      volumeUnitCode: [VolumeUnitCode.CBM],
      zipCode: [null, [Validators.required]],
      description: [null],
      etod: [null],
      commodity: [null],
      carrierCustomerId: [null],
      replyUserId: [null, [Validators.required]],
      FreightMethodType: [3],
      id: [],
    });
    this.validateForm.controls.truckType.valueChanges.subscribe((res) => {
      this.ngModelChangeYruckType();
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
        this.validateForm.patchValue(res, { emitEvent: false });
        this.truckingFromToComponent.getFromList(null, res.fromId, res.truckType === 2);
        this.truckingFromToComponent.getToList(null, res.toId, res.truckType === 1);
      });
    }

    this.bindData();
  }

  bindData() {
    this.getCarrierCustomerList();
    this.getOrganizationUnitUsers();
    this.getCustomerList();
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

  getEnquiryDetial(id) {
    return new Observable((ob) => {
      this.ratesQuoteEnquiryService.get({ id: id }).subscribe((res) => {
        ob.next(res);
        ob.complete();
      });
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

  onAStartChange() {
    this.validateForm.patchValue({ deliveryDate: null });
  }

  disabledAStartDate = (startValue: Date): boolean => {
    if (!startValue) {
      return false;
    }
    return startValue.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
  };

  disabledAEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.validateForm.get('cargoReadyDate').value) {
      return false;
    }

    return endValue.getTime() <= this.validateForm.get('cargoReadyDate').value.getTime();
  };

  getOrganizationUnitUsers() {
    this.OrganizationUnit
      .getOrganizationUnitUsers({
        organizationUnitName: '商务部',
      })
      .subscribe((res: any) => {
        this.unitUsers = res.items;
      });
  }

  getCarrierCustomerList() {
    this.crmCustomer.getCustomerByType({ customerType: 5 }).subscribe((res: any) => {
      this.carrierCustomerList = res.items;
    });
  }

  handleOk() {
    setTimeout(() => {
      const tmp = document.querySelector('.ant-form-item-explain');
      tmp && (tmp as any).scrollIntoView({ block: 'end', mode: 'smooth' });
    }, 0);
    if (!this.validate()) return;
    let data = this.validateForm.value;
    //默认拖车为3
    data.freightMethodType = 3;

    this.okLoading = true;
    if (data.containerType) {
      data.containerType = JSON.stringify(
        data.containerType.map((res) => {
          return {
            name: res.code,
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
          this.okLoading = false;
          this.close.emit(true);
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

  validate() {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      if (i != 'truckType') {
        this.validateForm.controls[i].updateValueAndValidity();
      }
      if (this.validateForm.controls[i].invalid) {
        console.log(i);
        console.log(this.validateForm.controls[i]);
      }
    }
    return this.validateForm.valid;
  }

  ngModelChangeYruckType() {
    this.validateForm.patchValue({
      truckPortId: null,
      truckAddressId: null,
      zipCode: null,
    });
    if (this.truckingFromToComponent) this.truckingFromToComponent.reverse();
  }

  onResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = requestAnimationFrame(() => {
      this.width = width > 600 ? width : 600;
    });
  }

  closeView() {
    this.close.emit();
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
