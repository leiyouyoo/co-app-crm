import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { unitType, computeFormula, computeMode, priceProduceNode, FreightMethodType } from '../../enum/quoteState';
import { QuotesService } from '../../service/quotes.service';
import { NzMessageService, isTemplateRef } from 'ng-zorro-antd';
import { differenceInCalendarDays } from 'date-fns';
import { NgForm, NgModel, AbstractControl } from '@angular/forms';
import { cloneDeep, merge, uniqBy, uniqWith, groupBy } from 'lodash';
import { observable, Observable } from 'rxjs';
import { RatesCspTruckListInput } from 'apps/crm/app/services/rates';
import { CRMCustomerService } from 'apps/crm/app/services/crm';

@Component({
  selector: 'crm-handlequotes',
  templateUrl: './handlequotes.component.html',
  styleUrls: ['./handlequotes.component.less'],
})
export class HandlequotesComponent implements OnInit {
  today = new Date();
  @Input() _quoteinfo: any = {};
  //基础费用
  @Input() basiccost: any[] = [{ validDateRange: [this.today] }];
  //目的地费用
  @Input() endplace: any[] = [{ NO: 1 }];
  @Input() copyendplace: any[] = [{ NO: 1 }];

  //起始地费用
  @Input() startingplace: any[] = [{ NO: 1 }];
  @Input() copystartingplace: any[] = [{ NO: 1 }];

  @Output() containerHand = new EventEmitter<any[]>();
  @Output() startPlaceHand = new EventEmitter<any[]>();
  @Output() endPlaceHand = new EventEmitter<any[]>();
  @Output() basicdataHand = new EventEmitter<any[]>();

  @Input() containHavedataList: Array<any> = [];
  @ViewChild('basicData', { static: true }) basicData: NgForm;
  @ViewChild('startingplacData', { static: true }) startingplacData: NgForm;
  @ViewChild('endplaceplacData', { static: true }) endplaceplacData: NgForm;
  @ViewChild('vaildDate', { static: true }) vaildDate: NgForm;
  @ViewChild('basicFee') basicFee: ElementRef;
  @ViewChild('originFee') originFee: ElementRef;
  @ViewChild('desitionFee') desitionFee: ElementRef;
  @ViewChild('validDateDiv') validDateDiv: ElementRef;
  @ViewChild(NgModel, { static: true }) validEffectiveDate: NgModel;
  oceanFreight: any[] = [];
  originFreight: any[] = [];
  desinationFreight: any[] = [];
  originLocalFee: any[] = [];
  desinationLocalFee: any[] = [];
  //空的guid
  emptyGuid = '00000000-0000-0000-0000-000000000000';
  oceanFreightParams: any = {
    OriginLocationId: null,
    DeliveryLocationId: null,
    OriginPortId: [],
    DeliveryPortId: [],
    CarrierId: null,
    Filter: null,
    Sorting: null,
    MaxResultCount: 2,
    SkipCount: 0,
    nzPageSize: 2,
  };
  truckListInput: any = {
    placeModel: {
      id: null,
      placeId: null,
      placeName: null,
    },
    portId: null,
    type: 1,
    sorting: null,
    maxResultCount: 2,
    skipCount: 0,
  };
  oceanFreighttotal: number;
  originFreighttotal: number;
  desinationFreighttotal: number;

  freightMethodTypeValue: typeof FreightMethodType = FreightMethodType;
  costItemList: any[] = [];
  //币别列表
  currencyList: Array<any> = new Array<any>();
  carrierList: any[] = [];
  //起始地验证费用代码
  isSameChargeCode = false;
  sameIndex: number;
  //目的地验证费用代码
  isSameChargeCodeByEnd = false;
  sameEndIndex: number;
  //日期yanzheng
  //日期验证
  isDateMatch = true;
  //新增起始地费用
  tableIndex = 1;
  isShowFreigthOcean: boolean = true;
  isShowOriginFee: boolean = true;
  isShowDesinationFee: boolean = true;
  isTruckFeeByDesination: boolean = false;
  selIndex: string;
  selIndexByOrigin: string;
  selIndexByDesination: string;
  chargingCodeName = 'TRUC';
  isShoworiginTruc: boolean = false;
  isShowdesinationTruc: boolean = false;
  parserDollar = (value: string) => value.replace('$ ', '');
  formatterDollar = (value: number) => {
    return value ? `$ ${value}` : `$ `;
  };
  units = [];
  reg = /(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/;
  //询价列表
  quoteList = new Array();
  //询价查询参数
  quoteInputParams = {
    SortingValue: 'CreationTime',
    Id: null,
    isGeneral: false,
    isFba: false,
    QuoteNo: '',
    nzPageSize: 5,
    MaxResultCount: 5,
    pageIndex: 1,
    SkipCount: 0,
  };
  routeQuoteParams = {
    Id: null,
    DestinationAddressId: null,
    OriginAddressId: null,
    DestinationPortId: null,
    OriginPortId: null,
    MaxResultCount: 5,
    SkipCount: 0,
    Sorting: null,
  };
  quotetotal: number;
  isShowQuoteList: boolean = false;
  selIndexByquote: string;
  constructor(public quotesService: QuotesService, private message: NzMessageService, private crmCustomerService: CRMCustomerService) {}
  ngOnInit(): void {
    this.getAllCurrency();
    this.getCarrierList();
    this.getAirList();
    this.getCostAll({});
    this.init();
  }

  init() {
    if (
      this._quoteinfo.originPortId &&
      this._quoteinfo.destinationPortId &&
      this._quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean &&
      this._quoteinfo.shipmentType == 0 &&
      this.basiccost.length > 0 &&
      this.basiccost[0].carrierId &&
      this._quoteinfo.ownerCustomerId
    ) {
      this.oceanFreightParams.OriginPortId = [this._quoteinfo.originPortId];
      this.oceanFreightParams.DeliveryPortId = [this._quoteinfo.destinationPortId];
      this.oceanFreightParams.CarrierId = this.basiccost[0].carrierId;
      this.oceanFreightParams.CustomerId = this._quoteinfo.ownerCustomerId;
      this.GetQuoteFreightRates(this.oceanFreightParams);
    }

    //拖车费(起始地点)
    if (
      this._quoteinfo.originPortId &&
      (this._quoteinfo.originAddressId || this._quoteinfo.originAddressName) &&
      (this._quoteinfo.freightType == 3 || this._quoteinfo.freightType == 4) &&
      this.isShoworiginTruc
    ) {
      if (this._quoteinfo.originAddressId) {
        if (!this._quoteinfo.originAddressId.match(this.reg)) {
          //假如是地图搜索
          this.truckListInput.placeModel.placeName = this._quoteinfo.originAddressId;
          if (this._quoteinfo.originPlaceId) {
            this.truckListInput.placeModel.placeId = this._quoteinfo.originPlaceId;
          }
          this.truckListInput.placeModel.id = null;
        } else {
          this.truckListInput.placeModel.placeName = null;
          this.truckListInput.placeModel.id = this._quoteinfo.originAddress.cityId;
        }
      } else {
        this.truckListInput.placeModel.placeName = this._quoteinfo.originAddressName;
        if (this._quoteinfo.originPlaceId) {
          this.truckListInput.placeModel.placeId = this._quoteinfo.originPlaceId;
        }
        this.truckListInput.placeModel.id = null;
      }
      this.truckListInput.portId = this._quoteinfo.originPortId;
      this.truckListInput.type = 1;
      this.GetOriginTruckRates(this.truckListInput);
    }

    //拖车费(目的地点)
    if (
      this._quoteinfo.destinationPortId &&
      (this._quoteinfo.destinationAddressId || this._quoteinfo.destinationAddressName) &&
      (this._quoteinfo.freightType == 2 || this._quoteinfo.freightType == 4) &&
      this.isShowdesinationTruc
    ) {
      if (this._quoteinfo.destinationAddressId) {
        //假如是地图搜索
        if (!this._quoteinfo.destinationAddressId.match(this.reg)) {
          this.truckListInput.placeModel.placeName = this._quoteinfo.destinationAddressId;
          if (this._quoteinfo.desinationPlaceId) {
            this.truckListInput.placeModel.placeId = this._quoteinfo.desinationPlaceId;
          }
          this.truckListInput.placeModel.id = null;
        } else {
          this.truckListInput.placeModel.placeName = null;
          this.truckListInput.placeModel.id = this._quoteinfo.destinationAddress.cityId;
        }
      } else {
        this.truckListInput.placeModel.placeName = this._quoteinfo.destinationAddressName;
        if (this._quoteinfo.desinationPlaceId) {
          this.truckListInput.placeModel.placeId = this._quoteinfo.desinationPlaceId;
        }
        this.truckListInput.placeModel.id = null;
      }
      this.truckListInput.portId = this._quoteinfo.destinationPortId;
      this.truckListInput.type = 2;
      this.GetDesitinationTruckRates(this.truckListInput);
    }

    //本地费用
    if (this._quoteinfo.originPortId && this._quoteinfo.destinationPortId && this.basiccost[0].carrierId) {
      this.GetOriginalAndDestinationLocalRates({
        polId: this._quoteinfo.originPortId,
        podId: this._quoteinfo.destinationPortId,
        carrierId: this.basiccost[0].carrierId,
      });
    }

    //根据路线获取报价
    if (this._quoteinfo.id) {
      this.getListByRouteForCRM({ Id: this._quoteinfo.id });
    }

    if (
      !this._quoteinfo.id &&
      ((this._quoteinfo.originPortId && this._quoteinfo.destinationPortId) ||
        (this._quoteinfo.originAddressId && this._quoteinfo.destinationAddressId))
    ) {
      if (this._quoteinfo.originAddressId && this._quoteinfo.originAddressId.match(this.reg)) {
        this.routeQuoteParams.OriginAddressId = this._quoteinfo.originAddressId;
      }
      if (this._quoteinfo.destinationAddressId && this._quoteinfo.destinationAddressId.match(this.reg)) {
        this.routeQuoteParams.DestinationAddressId = this._quoteinfo.destinationAddressId;
      }
      this.routeQuoteParams.OriginPortId = this._quoteinfo.originPortId;
      this.routeQuoteParams.DestinationPortId = this._quoteinfo.destinationPortId;

      this.getListByRouteForCRM(this.routeQuoteParams);
    }

    this.clearTDate();
  }

  clearTDate() {
    if (
      !this._quoteinfo.originPortId ||
      !this._quoteinfo.destinationPortId ||
      !this.basiccost[0].carrierId ||
      !this._quoteinfo.ownerCustomerId
    ) {
      //海运费清空
      this.oceanFreight = [];
      this.oceanFreighttotal = 0;
      this.selIndex = '';
    }
    if (!this._quoteinfo.originPortId || !this._quoteinfo.originAddressId || !this._quoteinfo.originAddressName) {
      //港前拖车费清空
      this.originFreight = [];
      this.originFreighttotal = 0;
      this.selIndexByOrigin = '';
      this.quoteList = [];
      this.quotetotal = 0;
      this.selIndexByquote = '';
    }
    if (!this._quoteinfo.destinationPortId || !this._quoteinfo.destinationAddressId || !this._quoteinfo.destinationAddressName) {
      //港后拖车费清空
      this.desinationFreight = [];
      this.desinationFreighttotal = 0;
      this.selIndexByDesination = '';
      this.quoteList = [];
      this.quotetotal = 0;
      this.selIndexByquote = '';
    }
  }
  //获取费用代码信息
  getCostAll(costObj: { GroupId?: number; Text?: string; isValid?: boolean }) {
    this.quotesService.getCostAll(costObj).subscribe((res) => {
      this.costItemList = res.items;
    });
  }

  //获取币别
  getAllCurrency() {
    this.quotesService.getAllCurrency({}).subscribe((c) => {
      this.currencyList = c.items;
    });
  }

  //获取船东信息
  getCarrierList() {
    this.crmCustomerService
      .getCustomerByType({
        customerType: 1,
      })
      .subscribe((res: any) => {
        this.carrierList = res.items;
      });
  }

  //获取航空公司信息
  airList: any[] = [];
  getAirList() {
    this.crmCustomerService
      .getCustomerByType({
        customerType: 2,
      })
      .subscribe((res: any) => {
        this.airList = res.items;
      });
  }

  //获取海运费价格推荐
  GetQuoteFreightRates(freight) {
    this.quotesService.GetQuoteFreightRates(freight).subscribe((res) => {
      this.oceanFreight = res.result;
      this.oceanFreighttotal = res.totalCount;
      this.units = res.unitDist;
      this.handContainer();
    });
  }

  //处理返回得箱型排序
  handContainer() {
    this.units.sort((a: any, b: any) => {
      const aMatch = a.match(/(\d+)([A-Z]+)/);
      const bMatch = b.match(/(\d+)([A-Z]+)/);
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
  }

  //获取港前拖车费用
  GetOriginTruckRates(truckRates) {
    this.quotesService.GetQuoteTruckRates(truckRates).subscribe((res) => {
      if (res) {
        this.originFreight = res.items;
        this.originFreighttotal = res.totalCount;
      }
    });
  }

  //获取港后拖车费用
  GetDesitinationTruckRates(truckRates) {
    this.quotesService.GetQuoteTruckRates(truckRates).subscribe((res) => {
      if (res) {
        this.desinationFreight = res.items;
        this.desinationFreighttotal = res.totalCount;
      }
    });
  }

  //获取本地费用
  GetOriginalAndDestinationLocalRates(params: { carrierId?: string; polId?: string; podId?: string }) {
    this.quotesService.GetOriginalAndDestinationLocalRates(params).subscribe((res) => {
      this.originLocalFee = res.item1;
      this.desinationLocalFee = res.item2;
      this.handOrginLocalFee();
    });
  }

  //处理港前港后本地费用
  handOrginLocalFee() {
    let originLocalFee: any = [];
    let endLocalplace: any = [];
    if (this.originLocalFee.length > 0) {
      originLocalFee = this.originLocalFee.map((origin) => {
        let startObj = {};
        if (origin.chargeUnitType == 1) {
          startObj = {
            chargingCodeId: origin.chargingCodesTypeId,
            currencyId: origin.currencyId,
            unitType: origin.chargeUnitType,
            remark: origin.remark,
            isDelete: true,
            iscover: true,
          };
          this.containHavedataList.forEach((con) => {
            origin.localUnitRates.forEach((b) => {
              if (con.name == b.containerCode) {
                startObj[b.containerCode] = b.cost;
              }
            });
          });
          this.containerHand.emit(this.containHavedataList);
        } else {
          startObj = {
            chargingCodeId: origin.chargingCodesTypeId,
            currencyId: origin.currencyId,
            unitType: origin.chargeUnitType,
            remark: origin.remark,
            unitPrice: origin.totalPrice,
            isDelete: true,
            iscover: true,
          };
        }
        return startObj;
      });
    }
    for (let index = 0; index < this.startingplace.length; index++) {
      //覆盖之前的本地费用
      const element = this.startingplace[index];
      if (element.iscover) this.startingplace.splice(index, 1);
    }
    let start = uniqBy([...this.startingplace, ...originLocalFee], function (e) {
      return e.chargingCodeId;
    }); //合并 并将重复的去掉
    for (let index = 0; index < start.length; index++) {
      //去掉空行
      const st = start[index];
      if (!st.chargingCodeId && !st.currencyId && !st.unitType && !st.remark) {
        start.splice(index, 1);
      }
    }
    this.startingplace = start;
    if (this.startingplace.length <= 0) this.startingplace = [{ NO: 1 }];
    this.startPlaceHand.emit(this.startingplace);
    if (this.desinationLocalFee.length > 0) {
      endLocalplace = this.desinationLocalFee.map((desination) => {
        let endObj = {};
        if (desination.chargeUnitType == 1) {
          endObj = {
            chargingCodeId: desination.chargingCodesTypeId,
            currencyId: desination.currencyId,
            unitType: desination.chargeUnitType,
            remark: desination.remark,
            isDelete: true,
            iscover: true,
          };
          this.containHavedataList.forEach((con) => {
            desination.localUnitRates.forEach((b) => {
              if (con.name == b.containerCode) {
                endObj[b.containerCode] = b.cost;
              }
            });
          });
          this.containerHand.emit(this.containHavedataList);
        } else {
          endObj = {
            chargingCodeId: desination.chargingCodesTypeId,
            currencyId: desination.currencyId,
            unitType: desination.chargeUnitType,
            remark: desination.remark,
            unitPrice: desination.totalPrice,
            isDelete: true,
            iscover: true,
          };
        }
        return endObj;
      });
    }
    for (let index = 0; index < this.endplace.length; index++) {
      //覆盖之前的本地费用
      const element = this.endplace[index];
      if (element.iscover) this.endplace.splice(index, 1);
    }
    let end = uniqBy([...this.endplace, ...endLocalplace], function (e) {
      return e.chargingCodeId;
    }); //合并去掉重复的
    for (let index = 0; index < end.length; index++) {
      //去掉空行
      const ed = end[index];
      if (!ed.chargingCodeId && !ed.currencyId && !ed.unitType && !ed.remark) {
        end.splice(index, 1);
      }
    }
    this.endplace = end;
    if (this.endplace.length <= 0) this.endplace = [{ NO: 1 }];
    this.endPlaceHand.emit(this.endplace);
  }

  //分页
  pageIndexChange(event: number): void {
    if (event > 1) this.oceanFreightParams.SkipCount = this.oceanFreightParams.nzPageSize * (event - 1);
    else this.oceanFreightParams.SkipCount = 0;
    this.GetQuoteFreightRates(this.oceanFreightParams);
    this.selIndex = '';
  }

  //分页
  pageIndexChangeByoriginFreight(event: number): void {
    if (event > 1) this.truckListInput.skipCount = this.truckListInput.maxResultCount * (event - 1);
    else this.truckListInput.skipCount = 0;
    this.GetOriginTruckRates(this.truckListInput);
    this.selIndexByOrigin = '';
  }

  //分页
  pageIndexChangeBydesinationFreight(event: number): void {
    if (event > 1) this.truckListInput.skipCount = this.truckListInput.maxResultCount * (event - 1);
    else this.truckListInput.skipCount = 0;
    this.GetDesitinationTruckRates(this.truckListInput);
    this.selIndexByDesination = '';
  }

  //计费方式选中后计算（空运散货计算）
  calculatetotal(event: any, data: any) {
    if (data.unitPrice) {
      if (event == 1) {
        //实际重量
        data.totalPrice = data.unitPrice * this._quoteinfo.weight;
        data.quantity = this._quoteinfo.weight;
      } else {
        //计费重量
        data.totalPrice = data.unitPrice * this._quoteinfo.volume * 167;
        data.quantity = this._quoteinfo.volume * 167;
      }
    }
  }

  //海运散货计算
  bulkcargo(data: any) {
    if (data.unitPrice && data.unitType && data.computeFormula) {
      if (data.unitType == unitType.Volume && data.computeFormula == computeFormula.ActuallyVolume) {
        //收费单位是体积 计费方式是实际体积
        data.quantity = this._quoteinfo.volume;
        data.totalPrice = data.quantity * data.unitPrice;
      } else if (data.unitType == unitType.Volume && data.computeFormula == computeFormula.ComputeTon) {
        //收费单位是体积 计费方式是计费吨
        if (this.basiccost[0].computeMode == computeMode.CBM167KG) data.quantity = this._quoteinfo.weight / 167;
        else if (this.basiccost[0].computeMode == computeMode.CBM363KG) data.quantity = this._quoteinfo.weight / 363;
        else if (this.basiccost[0].computeMode == computeMode.CBM500KG) data.quantity = this._quoteinfo.weight / 500;
        else if (this.basiccost[0].computeMode == computeMode.CBM750KG) data.quantity = this._quoteinfo.weight / 750;
        else if (this.basiccost[0].computeMode == computeMode.CBM1000KG) data.quantity = this._quoteinfo.weight / 1000;
        else data.quantity = this._quoteinfo.weight / 167;
        data.quantity = Math.round(data.quantity * 1000) / 1000;
        if (data.quantity) data.quantity = data.quantity.toFixed(3);
      } else if (data.unitType == unitType.Weight && data.computeFormula == computeFormula.ActuallyWeight) {
        data.quantity = this._quoteinfo.weight;
      } else if (data.unitType == unitType.Weight && data.computeFormula == computeFormula.ComputeTon) {
        if (this.basiccost[0].computeMode == computeMode.CBM167KG) data.quantity = this._quoteinfo.volume * 167;
        else data.quantity = this._quoteinfo.volume * 167;
      }
      data.totalPrice = data.quantity * data.unitPrice;
      data.totalPrice = Math.round(data.totalPrice * 1000) / 1000;
      if (data.totalPrice) data.totalPrice = data.totalPrice.toFixed(3);
    }
  }

  //校验费用代码
  verificationChargestartplace(event: any, data: any) {
    if (!event) {
      this.isShoworiginTruc = false;
      this.originFreight = [];
      this.originFreighttotal = 0;
      this.selIndexByOrigin = '';
      data.chargingCodeName = '';
      return;
    }
    this.sameIndex = data.NO;
    data.chargingCodeName = event.code;
    if (this.startingplace.filter((c) => c.chargingCodeId == event.id && c.NO != data.NO).length > 0) {
      this.isSameChargeCode = true;
    } else {
      this.isSameChargeCode = false;
    }
    if (event.code == 'TRUC') {
      this.isShoworiginTruc = true;
      //拖车费(起始地点)
      if (
        this._quoteinfo.originPortId &&
        (this._quoteinfo.originAddressId || this._quoteinfo.originAddressName) &&
        (this._quoteinfo.freightType == 3 || this._quoteinfo.freightType == 4)
      ) {
        if (this._quoteinfo.originAddressId) {
          if (!this._quoteinfo.originAddressId.match(this.reg)) {
            //假如是地图搜索
            this.truckListInput.placeModel.placeName = this._quoteinfo.originAddressId;
            if (this._quoteinfo.originPlaceId) {
              this.truckListInput.placeModel.placeId = this._quoteinfo.originPlaceId;
            }
            this.truckListInput.placeModel.id = null;
          } else {
            this.truckListInput.placeModel.placeName = null;
            this.truckListInput.placeModel.id = this._quoteinfo.originAddress.cityId;
          }
        } else {
          this.truckListInput.placeModel.placeName = this._quoteinfo.originAddressName;
          if (this._quoteinfo.originPlaceId) {
            this.truckListInput.placeModel.placeId = this._quoteinfo.originPlaceId;
          }
          this.truckListInput.placeModel.id = null;
        }
        this.truckListInput.portId = this._quoteinfo.originPortId;
        this.truckListInput.type = 1;
        this.GetOriginTruckRates(this.truckListInput);
      }
    } else {
      this.isShoworiginTruc = false;
      this.originFreight = [];
      this.originFreighttotal = 0;
      this.selIndexByOrigin = '';
    }
  }

  //校验费用代码
  verificationChargeendplace(event: any, data: any) {
    if (!event) {
      this.desinationFreight = [];
      this.desinationFreighttotal = 0;
      this.isShowdesinationTruc = true;
      this.selIndexByDesination = '';
      data.chargingCodeName = '';
      return;
    }
    this.sameEndIndex = data.NO;
    data.chargingCodeName = event.code;
    if (this.endplace.filter((c) => c.chargingCodeId == event.id && c.NO != data.NO).length > 0) {
      this.isSameChargeCodeByEnd = true;
    } else {
      this.isSameChargeCodeByEnd = false;
    }
    if (event.code == 'TRUC') {
      this.isShowdesinationTruc = true;
      //拖车费(目的地点)
      if (
        this._quoteinfo.destinationPortId &&
        (this._quoteinfo.destinationAddressId || this._quoteinfo.destinationAddressName) &&
        (this._quoteinfo.freightType == 2 || this._quoteinfo.freightType == 4)
      ) {
        if (this._quoteinfo.destinationAddressId) {
          if (!this._quoteinfo.destinationAddressId.match(this.reg)) {
            //假如是地图搜索
            this.truckListInput.placeModel.placeName = this._quoteinfo.destinationAddressId;
            if (this._quoteinfo.desinationPlaceId) {
              this.truckListInput.placeModel.placeId = this._quoteinfo.desinationPlaceId;
            }
            this.truckListInput.placeModel.id = null;
          } else {
            this.truckListInput.placeModel.placeName = null;
            this.truckListInput.placeModel.id = this._quoteinfo.destinationAddress.cityId;
          }
        } else {
          this.truckListInput.placeModel.placeName = this._quoteinfo.destinationAddressName;
          if (this._quoteinfo.desinationPlaceId) {
            this.truckListInput.placeModel.placeId = this._quoteinfo.desinationPlaceId;
          }
          this.truckListInput.placeModel.id = null;
        }
        this.truckListInput.portId = this._quoteinfo.destinationPortId;
        this.truckListInput.type = 2;
        this.GetDesitinationTruckRates(this.truckListInput);
      }
    } else {
      this.desinationFreight = [];
      this.desinationFreighttotal = 0;
      this.isShowdesinationTruc = true;
      this.selIndexByDesination = '';
    }
  }

  //比较日期
  compareDate(start: Date, end: Date) {
    if (start && end) {
      let num = differenceInCalendarDays(start, end);
      if (num > 0) this.isDateMatch = false;
      else this.isDateMatch = true;
    }
  }

  //不可用时间
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

  //删除行起始地费用
  deleteOrigin(index: number, item: any) {
    if (this.startingplace.length > 0 || item.isDelete) this.startingplace.splice(index, 1);
    if (item.chargingCodeName == this.chargingCodeName) {
      //如果是拖车费用被删除那么 拖车费用价格数据清空
      this.originFreight = [];
      this.originFreighttotal = 0;
      this.isShoworiginTruc = false;
      this.selIndexByOrigin = '';
    }
  }

  //删除行目的地费用
  deleteDestination(index: number, item: any) {
    if (this.endplace.length > 0 || item.isDelete) this.endplace.splice(index, 1);
    if (item.chargingCodeName == this.chargingCodeName) {
      //如果是拖车费用被删除那么 拖车费用价格数据清空
      this.desinationFreight = [];
      this.desinationFreighttotal = 0;
      this.isShowdesinationTruc = false;
      this.selIndexByDesination = '';
    }
  }

  //增加行(起始地费用)
  addOrigin() {
    let i = this.startingplace.length > 0 ? this.startingplace.length : this.tableIndex;
    i++;
    this.startingplace.push({ NO: i });
  }

  //增加行(目的地费用)
  addDestination() {
    let i = this.endplace.length > 0 ? this.endplace.length : this.tableIndex;
    i++;
    this.endplace.push({ NO: i });
  }

  trackByIndex(index: number) {
    return index;
  }

  //单位重选时重置价格
  repret(item: any) {
    if (item.unitType == 1) {
      item.unitPrice = null;
    } else {
      this.containHavedataList.forEach((element) => {
        if (item[element.name]) {
          item[element.name] = null;
        }
      });
    }
  }

  //切换海运费
  switchBasicFee() {
    this.basiccost.forEach((res) => {
      res.transitTime = '';
    });
    this.selIndex = '';
  }

  //选择海运费
  selFreigthOean(item: any) {
    this.basiccost.forEach((res) => {
      res.transitTime = item.TransitTime;
      this.containHavedataList.forEach((element) => {
        if (item[element.name]) {
          res[element.name] = item[element.name];
        }
      });
    });
  }

  //选择拖车费
  selOriginFreight(item: any) {
    this.startingplace.forEach((res) => {
      if (res.chargingCodeName == this.chargingCodeName) {
        // res.chargingCodeId = this.chargingCodeId;
        res.currencyId = item.currencyId;
        res.unitType = 2;
        res.unitPrice = item.total;
        res.remark = item.remark;
      }
    });
  }

  selDesinationFreight(item: any) {
    this.endplace.forEach((res) => {
      if (res.chargingCodeName == this.chargingCodeName) {
        // res.chargingCodeId = this.chargingCodeId;
        res.currencyId = item.currencyId;
        res.unitType = 2;
        res.unitPrice = item.total;
        res.remark = item.remark;
      }
    });
  }

  feereq(item: any) {
    if (item.chargingCodeId || item.currencyId || item.remark) {
      return true;
    } else {
      return false;
    }
  }

  /*获取所有报价(有报价的)*/
  getListByRouteForCRM(quoteParams) {
    this.quotesService.GetListByRouteForCRM(quoteParams).subscribe(
      (res) => {
        this.quoteList = res.items;
        this.quotetotal = res.totalCount;
      },
      (error) => {},
    );
  }

  /*quote改变页数显示数量*/
  quotePageSizeChange($event: any) {
    this.selIndexByquote = '';
    this.quoteInputParams.nzPageSize = $event;
    this.quoteInputParams.MaxResultCount = this.quoteInputParams.nzPageSize;
    this.quoteInputParams.SkipCount = 0;
    this.getListByRouteForCRM(this.routeQuoteParams);
  }

  /*quote翻页*/
  quotepageIndexChange(event: number): void {
    this.selIndexByquote = '';
    if (event > 1) this.quoteInputParams.SkipCount = this.quoteInputParams.nzPageSize * (event - 1);
    else this.quoteInputParams.SkipCount = 0;
    this.getListByRouteForCRM(this.routeQuoteParams);
  }

  /*选择报价*/
  selQuote(quoteinfo: any) {
    this.getLastForCRM(quoteinfo.id).subscribe((data: any) => {
      this.basiccost = [];
      this.startingplace = [];
      this.endplace = [];
      if (data.OriginList && data.OriginList.length <= 0) this.startingplace = [{ NO: 1 }];
      if (data.DestinationList && data.DestinationList.length <= 0) this.endplace = [{ NO: 1 }];
      //1.处理组装报价数据
      //基础费用组装   海运整柜
      //起始地费用组装
      //目的地费用组装
      if (this._quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this._quoteinfo.shipmentType == 0) {
        let unit = '';
        let currencyId = '';
        if (data.freightList && data.freightList.length > 0) {
          unit = data.freightList[0].unitType;
          currencyId = data.freightList[0].currencyId;
        }
        let startObj = {
          unitType: unit,
          currencyId: currencyId,
          validDateRange: [this.today],
          transitTime: data.transitTime,
          carrierId: data.carrierId,
        };
        data.freightList.forEach((c) => {
          if (c.unitType == unitType.Container) {
            //按箱
            this.containHavedataList.forEach((element) => {
              if (c.containerCode == element.name) {
                startObj[c.containerCode] = c.unitPrice;
              }
            });
          }
        });
        this.basiccost.push(startObj);
        this.basicdataHand.emit(this.basiccost);
        //起始地组装
        let listOfOriginDataGROUP = groupBy(data.OriginList, 'chargingCodeId');
        let originList = this.objToArray(listOfOriginDataGROUP);
        originList.forEach((c) => {
          //5
          if (!c.list[0]) return;
          if (c.list[0].unitType == unitType.Container) {
            //按箱
            let startObj = {
              // unitPrice: c.list[0].unitPrice,
              unitType: c.list[0].unitType,
              currencyId: c.list[0].currencyId,
              chargingCodeId: c.list[0].chargingCodeId,
              remark: c.list[0].remark,
            };
            c.list.forEach((b) => {
              startObj[b.containerCode] = b.unitPrice;
            });
            this.startingplace.push(startObj);
          } else {
            //按票
            let startObj = {
              unitPrice: c.list[0].unitPrice,
              unitType: c.list[0].unitType,
              currencyId: c.list[0].currencyId,
              chargingCodeId: c.list[0].chargingCodeId,
              remark: c.list[0].remark,
            };
            this.startingplace.push(startObj);
          }
        });
        this.startPlaceHand.emit(this.startingplace);

        let listOfDestinaDataGROUP = groupBy(data.DestinationList, 'chargingCodeId');
        let destinationList = this.objToArray(listOfDestinaDataGROUP);
        destinationList.forEach((c) => {
          //5
          if (!c.list[0]) return;
          if (c.list[0].unitType == unitType.Container) {
            //按箱
            let endObj = {
              // unitPrice: c.list[0].unitPrice,
              unitType: c.list[0].unitType,
              currencyId: c.list[0].currencyId,
              chargingCodeId: c.list[0].chargingCodeId,
              remark: c.list[0].remark,
            };
            c.list.forEach((b) => {
              endObj[b.containerCode] = b.unitPrice;
            });
            this.endplace.push(endObj);
          } else {
            //按票
            let endObj = {
              unitPrice: c.list[0].unitPrice,
              unitType: c.list[0].unitType,
              currencyId: c.list[0].currencyId,
              chargingCodeId: c.list[0].chargingCodeId,
              remark: c.list[0].remark,
            };
            this.endplace.push(endObj);
          }
        });
        this.endPlaceHand.emit(this.endplace);
      }
      //基础费用组装   海运散货 空运散货
      //起始地费用组装
      //目的地费用组装
      if (
        (this._quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this._quoteinfo.shipmentType == 1) ||
        this._quoteinfo.freightMethodType == this.freightMethodTypeValue.Air
      ) {
        //海运散货
        data.freightList.forEach((c) => {
          this.basiccost.push({
            unitPrice: c.unitPrice,
            unitType: c.unitType,
            quantity: c.quantity,
            totalPrice: c.totalPrice,
            computeMode: c.computeMode,
            computeFormula: c.computeFormula,
            remark: c.remark,
            currencyId: c.currencyId,
            carrierId: data.carrierId,
            transitTime: data.transitTime,
            sailSchedule: data.sailSchedule,
            validEndDate: data.validEndDate,
            validStartDate: data.validStartDate,
          });
        });
        this.basicdataHand.emit(this.basiccost);

        data.OriginList.forEach((c) => {
          let startObj = {
            unitPrice: c.unitPrice,
            unitType: c.unitType,
            currencyId: c.currencyId,
            chargingCodeId: c.chargingCodeId,
            remark: c.remark,
          };
          this.startingplace.push(startObj);
        });
        this.startPlaceHand.emit(this.startingplace);

        data.DestinationList.forEach((c) => {
          let endObj = {
            unitPrice: c.unitPrice,
            unitType: c.unitType,
            currencyId: c.currencyId,
            chargingCodeId: c.chargingCodeId,
            remark: c.remark,
          };
          this.endplace.push(endObj);
        });
        this.endPlaceHand.emit(this.endplace);
      }
    });
  }

  //对象转数组
  objToArray(list: any) {
    let array = Array<any>();
    for (let key in list) {
      array.push({
        chargeId: key,
        remark: list[key][0].remark,
        list: list[key],
      });
    }
    return array;
  }

  /*获取最新一条报价*/
  getLastForCRM(id: string) {
    return new Observable((ob) => {
      this.quotesService.GetLastForCRM(id).subscribe((res: any) => {
        let data;
        if (res && res.quoteReplyItems.length > 0) {
          data = res;
          data['freightList'] = data.quoteReplyItems.filter((b) => b.priceProduceNode == priceProduceNode.Freight);
          data['OriginList'] = data.quoteReplyItems.filter((b) => b.priceProduceNode == priceProduceNode.Origin);
          data['DestinationList'] = data.quoteReplyItems.filter((b) => b.priceProduceNode == priceProduceNode.Destination);
        }
        ob.next(data);
        ob.complete();
      });
    });
  }

  verification() {
    var isResult = true;
    this.validEffectiveDate.control.setValidators((control: AbstractControl) => {
      if (control.value.length < 2) return { receiver: false, required: true };
      return null;
    });
    //触发验证
    this.quotesService.submit(this.basicData);
    this.quotesService.submit(this.startingplacData);
    this.quotesService.submit(this.endplaceplacData);
    this.quotesService.submit(this.vaildDate);
    if (
      !this.basicData.valid ||
      !this.startingplacData.valid ||
      !this.endplaceplacData.valid ||
      !this.vaildDate.valid ||
      !this.isDateMatch ||
      this.isSameChargeCode ||
      this.isSameChargeCodeByEnd
    ) {
      isResult = false;
    }
    if (!this.basiccost[0].validDateRange) {
      isResult = false;
    }
    return isResult;
  }
}
