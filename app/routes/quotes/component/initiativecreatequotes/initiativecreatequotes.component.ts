import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef, Injector, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { QuotesService } from '../../service/quotes.service';
import { NzMessageService, NzModalService, NzUploadChangeParam } from 'ng-zorro-antd';
import { VolumeUnitCode, WeightUnitCode, unitType, priceProduceNode, FreightMethodType } from '../../enum/quoteState';
import { differenceInCalendarDays } from 'date-fns';
import { HandlequotesComponent } from '../handlequotes/handlequotes.component';
import { cloneDeep } from 'lodash';
import { freightType } from '../../enum/quoteState';
import { TranslateService } from '@ngx-translate/core';
import { CoConfigManager, CoPageBase, debounce } from '@co/core';
import { GoogleMapService, I18nMessageService } from '@co/common';
import { FCMBookingOrderService, FCMCustomerBookingEditInput } from '../../../../../../csp/app/services/fcm';
import { PUBChannelService, PUBPlaceService, PUBRegionService } from '@co/cds';
import {
  CRMContactExternalService,
  CRMLocationExternalService,
  CRMPartnerExternalService, CRMQuoteEnquiryService,
} from '../../../../../../csp/app/services/crm';
import { CSPPurchaseOrderService } from '../../../../../../csp/app/services/csp';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { TradeType, TransportationMode, ContainerLoadingType, FbaDeliveryMethodType, FbaPickUpMethodType } from './enums';
import { CRMCustomerService } from '../../../../services/crm';
import { HandlequotesOfCreateComponent } from '../handlequotes-of-create/handlequotes-of-create.component';


function truthyRequired(fn: () => boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return fn() ? Validators.required(control) : null;
  };
}

@Component({
  selector: 'initiativequotes-initiativecreatequotes',
  templateUrl: './initiativecreatequotes.component.html',
  styleUrls: ['./initiativecreatequotes.component.less'],
})
export class initiativeCreatequotesComponent extends CoPageBase {
  @ViewChild(HandlequotesOfCreateComponent) handlequotesComponent: HandlequotesOfCreateComponent;

//#region 私有变量

  id: string;
  _booking: FCMCustomerBookingEditInput;
  validateForm: FormGroup;
  templateName = null;
  saveLoading = false;
  draftLoading = false;

  //#endregion

  checkOptionsTwo = [
    { label: this.$L('Batteries'), value: 'dc288225-de61-4c32-a134-437459a23977', checked: false },
    { label: this.$L('Hazardous Materials'), value: '0aca966e-38ce-4d80-aa4e-6f4b537d1f26', checked: false },
    { label: this.$L('Other(creams,liquids,powders)'), value: '75755280-8626-40c4-b684-2b0499c9371b', checked: false },
  ];

  //#region  输入输出参数
  zhgError: boolean = false;
  xhgError: boolean = false;
  recentlyUsed: any = {};
  uploadUrl = CoConfigManager.getValue('uploadUrl');
  historylist = []
  cachedcustomerlist = []
  customerlist = []
  contacts = []
  locations = []
  cacheLocations = []
  //基础费用
  basiccost: any[] = [{ tradeType: 0, shipmentType: 0, freightType: freightType.CYCY, validDateRange: [new Date()] }];
  //目的地费用
  endplace: any[] = [{ NO: 1 }];

  //起始地费用
  startingplace: any[] = [{ NO: 1 }];

  quoteReplys: any = {
    quoteReplyItems: [],
  };

  showBasic = true;
  showSR = true;
  showGoods = true;
  showPackingList = true;
  isTemplate = false;
  cannotDeactivate = true;

  readonly TradeType = TradeType;
  readonly TransportationMode = TransportationMode;
  readonly ContainerLoadingType = ContainerLoadingType;
  readonly FbaDeliveryMethodType = FbaDeliveryMethodType;
  readonly FbaPickUpMethodType = FbaPickUpMethodType;

  //#endregion

  //#region 页面生命周期

  constructor(
    injector: Injector,
    private modal: NzModalService,
    private message: NzMessageService,
    private formBuilder: FormBuilder,
    private pubChannelService: PUBChannelService,
    private locationExternalService: CRMLocationExternalService,
    private placeService: PUBPlaceService,
    private customerService: CRMPartnerExternalService,
    private contactExternalService: CRMContactExternalService,
    private pubRegionService: PUBRegionService,
    private fcmBookingOrderService: FCMBookingOrderService,
    private i18nMessageService: I18nMessageService,
    private cspPurchaseOrderService: CSPPurchaseOrderService,
    private crmQuoteEnquiryService: CRMQuoteEnquiryService,
    private crmCustomerService: CRMCustomerService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(injector);
    this.validateForm = this.formBuilder.group({
      isDraft: [false],
      ownerCustomerId: [null, Validators.required],
      ownerUserId: [null, Validators.required],
      cargoReadyDate: [null, truthyRequired(() => this.validateForm?.value?._ori === 'CY')],
      deliveryDate: [null, ],
      tradeType: [1, Validators.required],
      freightMethodType: [1, Validators.required],
      containerLoadingType: [ContainerLoadingType.FCL, Validators.required],
      freightType: [''],
      originAddressId: [
        '',
        truthyRequired(
          () =>
            this.validateForm?.value?._ori === 'DOOR' && this.validateForm?.value?.fbaPickUpMethodType === FbaPickUpMethodType.Cityocean,
        ),
      ],
      originPortId: ['', truthyRequired(() => this.validateForm?.value?._ori === 'CY')],
      destinationPortId: ['', truthyRequired(() => this.validateForm?.value?._dest === 'CY')],
      destinationAddressId: [''],
      pickUpTimeRange: [''],
      channelId: ['', truthyRequired(() => this.validateForm?.value?.tradeType === TradeType.EC)],
      fbaPickUpMethodType: [null, truthyRequired(() => this.validateForm?.value?._ori === 'DOOR')],
      fbaDeliveryMethodType: [
        null,
        truthyRequired(() => this.validateForm?.value?._dest === 'DOOR' && this.validateForm?.value?.tradeType === TradeType.EC),
      ],
      originWarehouseId: [
        '',
        truthyRequired(
          () => this.validateForm?.value?._ori === 'DOOR' && this.validateForm?.value?.fbaPickUpMethodType === FbaPickUpMethodType.Self,
        ),
      ],
      expectDeliveryDate: [null],
      countryId: ['', truthyRequired(() => this.validateForm?.value?._dest === 'DOOR')],
      attachments: [null],
      wantsExportCustomsService: [false],
      wantsInsuranceService: [false],
      wantsCustomsClearanceService: [false],
      hsCodes: ['', ],
      commodity: [[], Validators.required],
      hasSpecialGoods: [false],
      specialGoodsTypesJson: [''],
      description: [''],
      specialInstructions: [''],
      containerCountsJson: [''],
      quantity: this.formBuilder.group({
        value: [0, truthyRequired(() => this.validateForm?.value?.tradeType === TradeType.EC)],
        unit: ['CTN', Validators.required],
      }),
      weight: this.formBuilder.group({
        value: [0, truthyRequired(() => this.validateForm?.value?.tradeType === TradeType.EC)],
        unit: ['KGS', Validators.required],
      }),
      volume: this.formBuilder.group({
        value: [0, truthyRequired(() => this.validateForm?.value?.tradeType === TradeType.EC)],
        unit: ['CBM', Validators.required],
      }),
      purchaseOrderId: [null],
      quoteEnquiryId: [null],
      quoteReplyNo: [null],
      _container: this.formBuilder.array([]),
      _ori: ['CY'],
      _dest: ['CY'],
      id: [null],
    });

    return;
    setTimeout(() => {
      Object.keys(this.validateForm.controls).forEach((field) => {
        const control = this.validateForm.get(field);
        control.markAllAsTouched();
        control.updateValueAndValidity();
      });
    });
  }

  coOnInit(): void {
    this.getChannelList();
    this.getOriginWarehouseList();
    this.GetOwnerCustomers();
  }

  coOnActived(): void {}

  coOnDeactived(): void {}

  coOnChanges(changes: SimpleChanges): void {}

  coAfterViewInit(): void {}

  coOnDestroy(): void {}

  //#endregion

  //#region 事件处理

  //#region 公共方法

  //#region 公共方法
  channelList: any = [];
  getChannelList() {
    this.pubChannelService.getAllForUiPicker({ skipCount: 0, maxResultCount: 500 } as any).subscribe((res) => {
      this.channelList = res.items;
    });
  }

  getChanneIsTas(id) {
    let result = this.channelList.filter((e) => {
      return e.id == id;
    });
    if (result.length > 0) {
      return result[0].isTaxIncluded;
    }
  }

  getChanneMode(id) {
    let result = this.channelList.filter((e) => {
      return e.id == id;
    });
    if (result.length > 0) {
      return result[0].transportationMode;
    }
  }


  // 获取发货地列表
  sendLocationList: any = [];
  async getSendLocationList() {
    await this.locationExternalService
      .getLocationByCustomerOwn({
        customerId: true ? this.validateForm.get('shipperCustomerId').value : this.validateForm.get('customerId').value,
      })
      .subscribe((res) => {
        this.sendLocationList = res.items;
      });
  }

  // 获取收货地列表
  getLocationList: any = [];
  // to do customerId
  async getGetLocationList() {
    await this.locationExternalService
      .getLocationByCustomer({ customerId: this.validateForm.get('consigneeCustomerId').value })
      .subscribe((res) => {
        this.getLocationList = res.items;
      });
  }

  //获取起始port
  OriginPortList: any = [];
  async GetAllOrginalPort(name: string = null, Id = null) {
    await this.placeService
      .getAll({
        id: Id,
        name: name,
        isOcean: true,
        isAir: null,
        maxResultCount: 10,
      })
      .subscribe(
        (res: any) => {
          this.OriginPortList = res.items;
          if (Id) {
            setTimeout(() => {
              this.portOriginsearch('');
            });
          }
          this.addFormRatesOrginalPort();
        },
        (error) => {
          this.message.info('Data loading failed');
        },
      );
  }

  comparePort(e, id, type) {}

  OriginPortListFromRates: any[] = [];
  portOriginsearch(event: any, id = '') {
    if (event.length || id || !this.recentlyUsed?.originPorts?.length) {
      this.GetAllOrginalPort(event, id);
    } else {
      this.OriginPortList = this.recentlyUsed?.originPorts;
      this.addFormRatesOrginalPort();
    }
  }

  //获取结束port
  DesinationPortList: any = [];
  async GetAllDesitinaPort(name = null, Id = null) {
    await this.placeService
      .getAll({
        id: Id,
        name: name,
        isOcean: true,
        isAir: null,
        maxResultCount: 10,
      })
      .subscribe(
        (res: any) => {
          this.DesinationPortList = res.items;
          if (Id) {
            setTimeout(() => {
              this.portOriginsearch('');
            });
          }
          this.addFormRatesOrginalPort();
        },
        (error) => {
          this.message.info('Data loading failed');
        },
      );
  }

  //搜索origin港口
  portDesinationsearch(event: any, id = '') {
    if (event.length || id || !this.recentlyUsed?.destinationPorts?.length) {
      this.GetAllDesitinaPort(event, id);
    } else {
      this.DesinationPortList = this.recentlyUsed?.destinationPorts;
      this.addFormRatesDesitinaPort();
    }
  }

  // 添加从rates传过来的数据
  addFormRatesOrginalPort() {
    if (this.OriginPortListFromRates.length) {
      const hasInclude = this.OriginPortList.some((e) => {
        return e.id == this.OriginPortListFromRates[0].id;
      });
      if (!hasInclude) {
        this.OriginPortList = this.OriginPortList.concat(this.OriginPortListFromRates);
      }
    }
  }

  poList = [];
  onPoSearch(e) {
    this.cspPurchaseOrderService.bookingSearch({ searchKeyword: e }).subscribe((data) => {
      this.poList = data.items;
    });
  }

  onTradeTypeChange(e) {
    if (e === TradeType.Normal) {
      this.validateForm.patchValue({ fbaDeliveryMethodType: FbaDeliveryMethodType.Customer });
    }
    if (e === TradeType.EC) {
      this.validateForm.patchValue({ _ori: 'DOOR', _dest: `DOOR` });
    }
  }

  // 添加从rates传过来的数据
  DesitinaPortListFromRates: any[] = [];
  addFormRatesDesitinaPort() {
    if (this.DesitinaPortListFromRates.length) {
      const hasInclude = this.DesinationPortList.some((e) => {
        return e.id == this.DesitinaPortListFromRates[0].id;
      });
      if (!hasInclude) {
        this.DesinationPortList = this.DesinationPortList.concat(this.DesitinaPortListFromRates);
      }
    }
  }

  portChange() {}

  methodTypeChange(e?) {
    this.validateForm.controls.destinationAddressId.reset()
    this.getCustomerLocationAndFBALocations();
  }

  addressList: any = [];
  // 获取地址
  async getCustomerLocationAndFBALocations(text = '', ids = null) {
    const countryId = this.validateForm.value.countryId;

    let res = await this.locationExternalService
      .getAllForUiPicker({
        searchText: text,
        locationType: this.validateForm.value.fbaDeliveryMethodType == 2 ? 0 : 1,
        customerId:
          this.validateForm.value.fbaDeliveryMethodType == 2
            ? this.validateForm.value.tradeType === TradeType.Normal
            ? this.validateForm.value.consigneeCustomerId
            : this.validateForm.value.shipperCustomerId
            : null,
        countryId: countryId,
        ids: ids,
      } as any)
      .toPromise();
    this.addressList = res.items;
    return;
  }

  cantactList: any = [];
  // 获取联系人
  getContactList(id) {
    this.contactExternalService
      .getByCustomerOrPartner({
        customerId: id,
      })
      .subscribe((res) => {
        this.cantactList = res.items;
      });
  }

  customerOptionChange() {
    const e = this.validateForm.value.shipperCustomerId;
    // this.validateForm.get('incoterm').setValue(e?.incotermsStr);
    this.getContactList(e);
  }

  volumeChange() {
    if (this.validateForm.get('volume').value?.unit == 'CBM') {
      // let item: any = this.validateForm.controls.booking
      this.validateForm.controls['weight'].get('unit').setValue('KGS', { emitViewToModelChange: false });
    } else {
      // let item: any = this.validateForm.controls.booking
      this.validateForm.controls['weight'].get('unit').setValue('LBS', { emitViewToModelChange: false });
    }
  }

  weightChange() {
    if (this.validateForm.get('weight').value?.unit == 'KGS') {
      // let item: any = this.validateForm.controls.booking
      this.validateForm.controls['volume'].get('unit').setValue('CBM', { emitViewToModelChange: false });
    } else {
      // let item: any = this.validateForm.controls.booking
      this.validateForm.controls['volume'].get('unit').setValue('CBF', { emitViewToModelChange: false });
    }
  }

  countryList: any = [];
  // 获取国家
  getCountry(event = null, id = null) {
    this.pubRegionService
      .getAll({
        name: event,
        id,
      })
      .subscribe((res) => {
        this.countryList = res.items;
      });
  }

  fileListBG = [];
  fileChangeBG(e: NzUploadChangeParam) {
    switch (e.type) {
      case 'success':
        this.fileListBG = [e.file];
        break;
      default:
    }
  }

  clearAddress(data) {
    if (data) {
      this.validateForm.get('destinationAddressId').setValue(null);
      // for (var item of this.validateForm.controls.lineItems.controls) {
      //   item.controls.address.setValue(null, { emitEvent: false, emitViewToModelChange: false });
      // }
      this.getCustomerLocationAndFBALocations();
    }
  }

  optionChangeTwo() {
    const good = [
      { id: 'dc288225-de61-4c32-a134-437459a23977', Name: 'Batteries', IsSelected: false },
      { id: '0aca966e-38ce-4d80-aa4e-6f4b537d1f26', Name: 'Hazardous Materials', IsSelected: false },
      {
        id: '75755280-8626-40c4-b684-2b0499c9371b',
        Name: 'Other(creams,liquids,powders)',
        IsSelected: false,
      },
    ];

    this.checkOptionsTwo.forEach((e) => {
      good.forEach((item) => {
        if (e.checked) {
          e.value == item.id && (item.IsSelected = true);
        }
      });
    });

    let gooList = good.filter((e) => {
      return e.IsSelected;
    });

    this.validateForm.get('specialGoodsTypesJson').setValue(JSON.stringify(gooList));
  }

  originWarehouseList: any = [];
  // 获取交货仓库
  getOriginWarehouseList() {
    this.locationExternalService.getFBALocations({ isCityocean: true }).subscribe((res) => {
      this.originWarehouseList = res.items;
    });
  }

  processForm() {
    const value = cloneDeep(this.validateForm.value);
    value.freightType = `${value._ori}_${value._dest}`;
    value.commodity = value.commodity?.toString();

    try {
      value.containerCountsJson = JSON.stringify(value._container);
    } catch (e) {
      console.error(e);
    }

    (value as any).shipmentType = value.containerLoadingType;
    (value as any).containerType = value.containerCountsJson;
    (value as any).isDeclaration = value.wantsExportCustomsService;
    (value as any).isInsurance = value.wantsInsuranceService;
    (value as any).isClearance = value.wantsCustomsClearanceService;
    (value as any).containsSpecialGoodsTypes = value.specialGoodsTypesJson;

    value.quantityUnitCode = value.quantity.unit;
    value.weightUnitCode = value.weight.unit;
    value.volumeUnitCode = value.volume.unit;
    value.quantity = value.quantity.value;
    value.weight = value.weight.value;
    value.volume = value.volume.value;

    return value;
  }

  emptyGuid = '00000000-0000-0000-0000-000000000000';
  save() {
    console.log(this.validateForm);
    Object.keys(this.validateForm.controls).forEach((field) => {
      const control = this.validateForm.get(field);
      control.markAllAsTouched();
      control.updateValueAndValidity();
    });
    if (this.validateForm.invalid) {
      return this.i18nMessageService.info(`Please enter required fields`);
    }
    // console.log(this.newPackingListComponent);
    // return;

    const value = this.processForm();

    //触发验证
    if (
      !this.handlequotesComponent.verification()
    ) {
      setTimeout(() => {
        (document.querySelector('.alert-danger') as any).scrollIntoView({ block: 'end', mode: 'smooth' });
      }, 0);
      return false;
    }
    this.quoteReplys.carrierId = this.basiccost[0].carrierId;
    // this.quoteReplys.quoteEnquiryId = this.quoteinfo.id;
    this.quoteReplys.transitTime = this.basiccost[0].transitTime;
    if (this.basiccost[0].validDateRange) {
      this.quoteReplys.validEndDate = this.basiccost[0].validDateRange[1];
      this.quoteReplys.validStartDate = this.basiccost[0].validDateRange[0];
    }
    //判断海运散货 海运整柜 空运散货得报价添加
    if (value.freightMethodType == 1 && value.shipmentType == 0) {
      //海运整柜
      this.handlequotesComponent.containHavedataList.forEach((c) => {
        if (this.basiccost[0][c.name]) {
          //基础费用
          this.quoteReplys.quoteReplyItems.push({
            currencyId: this.emptyGuid,
            unitPrice: this.basiccost[0][c.name],
            priceProduceNode: priceProduceNode.Freight,
            unitType: unitType.Container, //整柜默认传箱 单位
            quantity: c.value,
            totalPrice: c.value * this.basiccost[0][c.name],
            containerCode: c.name,
          });
        }
      });
      this.startingplace.forEach((c) => {
        //起始地
        if (c.unitType == unitType.Container) {
          //按箱
          this.handlequotesComponent.containHavedataList.forEach((b) => {
            if (c[b.name]) {
              this.quoteReplys.quoteReplyItems.push({
                currencyId: c.currencyId,
                unitPrice: c[b.name],
                priceProduceNode: priceProduceNode.Origin,
                containerCode: b.name,
                unitType: c.unitType,
                chargingCodeId: c.chargingCodeId,
                quantity: b.value,
                totalPrice: b.value * c[b.name],
                remark: c.remark,
              });
            }
          });
        } else {
          //按票
          if (c.unitPrice)
            this.quoteReplys.quoteReplyItems.push({
              currencyId: c.currencyId,
              unitPrice: c.unitPrice,
              priceProduceNode: priceProduceNode.Origin,
              unitType: c.unitType,
              chargingCodeId: c.chargingCodeId,
              quantity: 1,
              totalPrice: 1 * c.unitPrice,
              remark: c.remark,
            });
        }
      });
      this.endplace.forEach((c) => {
        //目的地费用
        if (c.unitType == unitType.Container) {
          //按箱
          this.handlequotesComponent.containHavedataList.forEach((b) => {
            if (c[b.name]) {
              this.quoteReplys.quoteReplyItems.push({
                currencyId: c.currencyId,
                unitPrice: c[b.name],
                priceProduceNode: priceProduceNode.Destination,
                containerCode: b.name,
                unitType: c.unitType,
                chargingCodeId: c.chargingCodeId,
                quantity: b.value,
                totalPrice: b.value * c[b.name],
                remark: c.remark,
              });
            }
          });
        } else {
          //按票
          if (c.unitPrice)
            this.quoteReplys.quoteReplyItems.push({
              currencyId: c.currencyId,
              unitPrice: c.unitPrice,
              priceProduceNode: priceProduceNode.Destination,
              unitType: c.unitType,
              chargingCodeId: c.chargingCodeId,
              quantity: 1,
              totalPrice: 1 * c.unitPrice,
              remark: c.remark,
            });
        }
      });
    }
    if (value.freightMethodType == 1 && value.shipmentType == 1) {
      this.quoteReplys.sailSchedule = this.basiccost[0].sailSchedule;
      //海运散货
      this.quoteReplys.quoteReplyItems.push({
        unitPrice: this.basiccost[0].unitPrice,
        currencyId: this.basiccost[0].currencyId,
        unitType: this.basiccost[0].unitType,
        priceProduceNode: priceProduceNode.Freight,
        totalPrice: this.basiccost[0].totalPrice,
        computeMode: this.basiccost[0].computeMode,
        computeFormula: this.basiccost[0].computeFormula,
        remark: this.basiccost[0].remark,
        quantity: this.basiccost[0].quantity,
      });
      this.startingplace.forEach((c) => {
        //起始地
        if (c.unitType == unitType.Ticket) {
          //票
          c.quantity = 1;
        } else if (c.unitType == unitType.Weight) {
          //重量
          c.quantity = this.handlequotesComponent._quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this.handlequotesComponent._quoteinfo.volume;
        }
        if (c.unitPrice) {
          this.quoteReplys.quoteReplyItems.push({
            currencyId: c.currencyId,
            unitPrice: c.unitPrice,
            priceProduceNode: priceProduceNode.Origin,
            unitType: c.unitType,
            chargingCodeId: c.chargingCodeId,
            quantity: c.quantity,
            totalPrice: c.quantity * c.unitPrice,
            remark: c.remark,
          });
        }
      });
      this.endplace.forEach((c) => {
        //目的地费用
        if (c.unitType == unitType.Ticket) {
          //票
          c.quantity = 1;
        } else if (c.unitType == unitType.Weight) {
          //重量
          c.quantity = this.handlequotesComponent._quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this.handlequotesComponent._quoteinfo.volume;
        }
        if (c.unitPrice) {
          this.quoteReplys.quoteReplyItems.push({
            currencyId: c.currencyId,
            unitPrice: c.unitPrice,
            priceProduceNode: priceProduceNode.Destination,
            unitType: c.unitType,
            chargingCodeId: c.chargingCodeId,
            quantity: c.quantity,
            totalPrice: c.quantity * c.unitPrice,
            remark: c.remark,
          });
        }
      });
    }
    if (value.freightMethodType == 2) {
      //空运散货
      this.quoteReplys.quoteReplyItems.push({
        unitPrice: this.basiccost[0].unitPrice,
        currencyId: this.basiccost[0].currencyId,
        unitType: unitType.Weight, //写死
        priceProduceNode: priceProduceNode.Freight,
        totalPrice: this.basiccost[0].totalPrice,
        computeMode: this.basiccost[0].computeMode,
        computeFormula: this.basiccost[0].computeFormula,
        quantity: this.basiccost[0].quantity,
        remark: this.basiccost[0].remark,
      });
      this.startingplace.forEach((c) => {
        //起始地
        if (c.unitType == unitType.Ticket) {
          //票
          c.quantity = 1;
        } else if (c.unitType == unitType.Weight) {
          //重量
          c.quantity = this.handlequotesComponent._quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this.handlequotesComponent._quoteinfo.volume;
        }
        if (c.unitPrice) {
          this.quoteReplys.quoteReplyItems.push({
            currencyId: c.currencyId,
            unitPrice: c.unitPrice,
            priceProduceNode: priceProduceNode.Origin,
            unitType: c.unitType,
            chargingCodeId: c.chargingCodeId,
            quantity: c.quantity,
            totalPrice: c.quantity * c.unitPrice,
            remark: c.remark,
          });
        }
      });
      this.endplace.forEach((c) => {
        //目的地费用
        if (c.unitType == unitType.Ticket) {
          //票
          c.quantity = 1;
        } else if (c.unitType == unitType.Weight) {
          //重量
          c.quantity = this.handlequotesComponent._quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this.handlequotesComponent._quoteinfo.volume;
        }
        if (c.unitPrice) {
          this.quoteReplys.quoteReplyItems.push({
            currencyId: c.currencyId,
            unitPrice: c.unitPrice,
            priceProduceNode: priceProduceNode.Destination,
            unitType: c.unitType,
            chargingCodeId: c.chargingCodeId,
            quantity: c.quantity,
            totalPrice: c.quantity * c.unitPrice,
            remark: c.remark,
          });
        }
      });
    }
    //主动报价
    value.containerType = JSON.stringify(this.handlequotesComponent.containHavedataList);
    value.quoteReplys = [];
    value.quoteReplys.push(this.quoteReplys);

    console.log(value);
    this.saveLoading = true;

    this.crmQuoteEnquiryService.create(value)
      .pipe(finalize(() => (this.saveLoading = false)))
      .subscribe(
        (res) => {
          this.cannotDeactivate = false;
          this.i18nMessageService.info('Successful operation');
          this.$navigate(['/crm/quotes']);
        },
        (err) => {
        },
      );
  }
  //#endregion

  //#region 私有方法

  saveData(data, id) {
    data.commodity = data.commodity?.split(',') as any;
    this.validateForm.patchValue(data);
    if (data.freightType?.split(`-`)?.length) {
      this.validateForm.patchValue({
        _ori: data.freightType?.split(`-`)[0],
        _dest: data.freightType?.split(`-`)[1],
      });
    }
    this.portOriginsearch('', data.originPortId);
    this.GetAllDesitinaPort('', data.destinationPortId);
    this.getCountry(null, data.countryId);
    // (<FormGroup>this.newPackingListComponent.dataGroup).patchValue({
    //   products: data?.packingList?.products,
    //   cartons: data?.packingList?.cartons,
    // });
    if (data.containerCountsJson) {
      try {
        this.validateForm.controls._container.setValue(JSON.parse(data.containerCountsJson));
      } catch (e) {
        console.error(e);
      }
    }
    try {
      let specialArray: Array<any> = eval('(' + data?.specialGoodsTypesJson + ')');
      specialArray.forEach((e) => {
        this.checkOptionsTwo.forEach((item) => {
          if (item.value == e.id) {
            item.checked = true;
          }
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  GetOwnerCustomers() {
    this.crmCustomerService.getOwnerCustomers({}).subscribe((c) => {
      this.customerlist = c.items;
    });
  }

  seachCustomer(event: any) {
    if (event) {
      this.customerlist = this.cachedcustomerlist;
    } else {
      this.customerlist = this.historylist;
    }
  }

  //选择询价客户
  selCustomer(event: any) {
    let customer = this.customerlist.filter((c) => c.id == event);
    if (customer.length > 0) {
      this.contacts = customer[0].contacts;
      this.locations = customer[0].locations;
      this.cacheLocations = customer[0].locations;
    } else {
      this.contacts = [];
      this.locations = [];
      this.cacheLocations = [];
    }
    //切换客户 清空起始地和询价人数据
    this.validateForm.controls.ownerUserId.setValue(null);
    this.validateForm.controls.originAddressId.setValue(null);
    this.validateForm.controls.destinationAddressId.setValue(null);
  }
  //#endregion
}
