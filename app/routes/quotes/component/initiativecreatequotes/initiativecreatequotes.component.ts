import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { QuotesService } from '../../service/quotes.service';
import { NzMessageService } from 'ng-zorro-antd';
import { VolumeUnitCode, WeightUnitCode, unitType, priceProduceNode, FreightMethodType } from '../../enum/quoteState';
import { differenceInCalendarDays } from 'date-fns';
import { HandlequotesComponent } from '../handlequotes/handlequotes.component';
import { AmapService } from '../../../../services/amap/amap.service';
import { cloneDeep } from 'lodash';
import { freightType } from '../../enum/quoteState';
import { TranslateService } from '@ngx-translate/core';
import { debounce } from '@co/core';

@Component({
  selector: 'initiativequotes-initiativecreatequotes',
  templateUrl: './initiativecreatequotes.component.html',
  styleUrls: ['./initiativecreatequotes.component.less'],
})
export class initiativeCreatequotesComponent implements OnInit {
  constructor(
    private quotesService: QuotesService,
    private message: NzMessageService,
    private amapService: AmapService,
    private translate: TranslateService,
  ) {}

  validateForm: FormGroup;
  freightMethodTypeValue: typeof FreightMethodType = FreightMethodType;
  readonly VolumeUnitCode = VolumeUnitCode;
  readonly WeightUnitCode = WeightUnitCode;
  quoteinfo: any = {
    freightMethodType: this.freightMethodTypeValue.Ocean,
    shipmentType: 0,
    containerType: '',
    containTypeText: '',
    quantityUnitCode: 'ctn',
    originIsRequireTruck: false,
    destinationIsRequireTruck: false,
    weightUnitCode: WeightUnitCode.KGS,
    volumeUnitCode: VolumeUnitCode.CBM,
    unitConvertType: 0,
    freightType: freightType.CYCY,
    tradeType: 1,
    quoteReplys: [],
    originAddress: {},
    destinationAddress: {},
    originPlaceId: null,
    desinationPlaceId: null,
  };
  today = new Date();
  copyquoteInfo: any = {};
  //基础费用
  basiccost: any[] = [{ tradeType: 0, shipmentType: 0, freightType: freightType.CYCY, validDateRange: [this.today] }];
  //目的地费用
  endplace: any[] = [{ NO: 1 }];

  //起始地费用
  startingplace: any[] = [{ NO: 1 }];
  dateFormat = 'yyyy/MM/dd';
  @ViewChild('basicData', { static: true }) basicData: NgForm;
  @ViewChild('startingplacData', { static: true }) startingplacData: NgForm;
  @ViewChild('endplaceplacData', { static: true }) endplaceplacData: NgForm;
  @ViewChild('formData', { static: true }) formData: NgForm;
  @ViewChild('vaildDate', { static: true }) vaildDate: NgForm;
  //xiangxing
  otherNum = '20';
  //箱型操作
  containList: Array<any> = [
    { value: 0, name: '20GP' },
    { value: 0, name: '40GP' },
    { value: 0, name: '40HQ' },
    { value: 0, name: '45HQ' },
  ];
  //最终有数据的箱型
  containHavedataList: any[] = [];
  //贸易类型
  tradeTypeList: any[] = [];
  customerlist: Array<any> = new Array<any>();
  cachedcustomerlist: Array<any> = new Array<any>();
  contacts: Array<any> = new Array<any>();
  locations: Array<any> = new Array<any>();
  cacheLocations: Array<any> = new Array<any>();
  historylist: any[] = [];
  //港口数据
  OriginPortList: Array<any> = new Array<any>();
  DesinationPortList: Array<any> = new Array<any>();
  //比较港口
  isSamePort = true;
  unitList: any[] = [];
  //判断location地址
  isLocationSame = true;
  @Output() isSuccessfully = new EventEmitter<boolean>();
  @Output() isClosed = new EventEmitter<boolean>();
  @Output() initiaveQuoteStatus = new EventEmitter<boolean>();
  quoteReplys: any = {
    quoteReplyItems: [],
  };
  tableIndex = 1;
  emptyGuid = '00000000-0000-0000-0000-000000000000';
  //是否提交
  isSubmitted: boolean = false;
  reg = /(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}/;
  @ViewChild(HandlequotesComponent) handlequotesComponent: HandlequotesComponent;
  ngOnInit() {
    this.init();
  }

  ngScroll() {
    let _scroll = document.querySelector('.head_quote');
    _scroll.addEventListener('scroll', () => {
      let freight = this.freight.nativeElement.scrollHeight;
      let basicFee = this.handlequotesComponent.basicFee.nativeElement.scrollHeight;
      let originFee = this.handlequotesComponent.originFee.nativeElement.scrollHeight;
      let desitionFee = this.handlequotesComponent.desitionFee.nativeElement.scrollHeight;
      let validDateDiv = this.handlequotesComponent.validDateDiv.nativeElement.scrollHeight;
      let scrollTop = document.querySelector('.head_quote').scrollTop;
      if (scrollTop < freight) {
        this.i = 1;
      } else if (scrollTop >= freight && scrollTop < freight + basicFee) {
        this.i = 2;
      } else if (scrollTop >= freight && scrollTop < freight + basicFee + originFee) {
        this.i = 3;
      } else if (scrollTop >= freight && scrollTop < freight + basicFee + originFee + desitionFee) {
        this.i = 4;
      } else if (scrollTop >= freight && scrollTop < freight + basicFee + originFee + desitionFee + validDateDiv) {
        this.i = 5;
      }
    });
  }

  init() {
    this.GetAllOrginalPort(); //获取起始港口
    this.GetAllDesitinaPort(); //获取目的港口
    this.getTradeTypes();
    this.GetCRMCustomerBindUserHistorys();
    this.GetOwnerCustomers();
    this.GetAmazonAll(false); //获取国外仓库
  }

  changeNum(num: any) {
    this.otherNum = num;
  }

  //提交数据前yanzheng
  isContain: boolean = false; //是否有箱型
  operationContainer(event: any) {
    this.containList.find((c) => c.name == event).value = 1;
    this.isContain = true;
  }

  //操作箱型数量
  operationCount(event: any, type: string) {
    switch (type) {
      case 'add':
        this.containList.find((c) => c.name == event).value++;
        if (this.containList.filter((c) => c.value > 0).length > 0) this.isContain = true;
        else this.isContain = false;

        break;
      case 'less':
        if (this.containList.find((c) => c.name == event).value <= 0) return;
        this.containList.find((c) => c.name == event).value--;
        if (this.containList.filter((c) => c.value > 0).length > 0) this.isContain = true;
        else this.isContain = false;
        break;
      default:
        break;
    }
    this.containHavedataList = this.containList.filter((c) => c.value > 0);
  }

  addContainer(num, name) {
    let index = this.containList.filter((c) => c.name == num + name).length;
    if (index == 0) this.containList.push({ value: 0, name: num + name });
    this.containHavedataList = this.containList.filter((c) => c.value > 0);
  }

  deleteContainer(item: any) {
    if (this.containList.find((c) => c.name == item.name)) this.containList.find((c) => c.name == item.name).value = 0;
    let index = this.containList.findIndex((c) => (c.name = item.name));
    this.containList.splice(index, 1);
    this.containHavedataList = this.containList.filter((c) => c.value > 0);
  }

  //获取贸易类型
  getTradeTypes() {
    this.quotesService.getTradeTypes().subscribe(
      (res: any[]) => {
        this.tradeTypeList = res;
        this.quoteinfo.tradeType = res[0].value;
      },
      (error) => {
        // this.message.info('Data loading failed');
        this.message.info(this.translate.instant('Data loading failed'));
      },
    );
  }

  //渠道
  channelsel(event: any) {
    if (event == 1) {
      this.quoteinfo.isClearance = true;
      this.quoteinfo.isDeclaration = true;
      this.quoteinfo.isInsurance = true;
    } else if (event == 2) {
      this.quoteinfo.isClearance = true;
      this.quoteinfo.isDeclaration = false;
      this.quoteinfo.isInsurance = false;
    } else if (event == 3) {
      this.quoteinfo.isDeclaration = true;
      this.quoteinfo.isClearance = false;
      this.quoteinfo.isInsurance = false;
    } else if (event == 4) {
      this.quoteinfo.isInsurance = true;
      this.quoteinfo.isDeclaration = false;
      this.quoteinfo.isClearance = false;
    } else if (event == 5) {
      //双清
      this.quoteinfo.isInsurance = true;
      this.quoteinfo.isDeclaration = true;
      this.quoteinfo.isClearance = false;
    } else if (event == 6) {
      //清关+保险
      this.quoteinfo.isInsurance = true;
      this.quoteinfo.isDeclaration = false;
      this.quoteinfo.isClearance = true;
    } else if (event == 7) {
      //报关+保险
      this.quoteinfo.isInsurance = true;
      this.quoteinfo.isDeclaration = true;
      this.quoteinfo.isClearance = false;
    } else if (event == 8) {
      this.quoteinfo.isClearance = true;
      this.quoteinfo.isDeclaration = true;
      this.quoteinfo.isTaxIncluded = true;
    } else if (event == 9) {
      this.quoteinfo.isClearance = true;
      this.quoteinfo.isDeclaration = true;
      this.quoteinfo.isTaxIncluded = false;
    }
  }

  GetOwnerCustomers() {
    this.quotesService.GetOwnerCustomers().subscribe((c) => {
      this.cachedcustomerlist = c.items;
    });
  }

  //CRM获取客户最近5条数据联动用户
  GetCRMCustomerBindUserHistorys() {
    this.quotesService.GetCRMCustomerBindUserHistorys().subscribe((c) => {
      this.historylist = c.items;
      this.customerlist = c.items;
    });
  }

  //询价客户搜索
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
    this.quoteinfo.ownerUserId = null;
    this.quoteinfo.originAddressId = null;
    this.quoteinfo.destinationAddressId = null;
  }

  //计费方式选中后计算（空运散货计算）
  calculatetotal(data: any) {
    if (data.unitPrice) {
      if (data.computeFormula == 1) {
        //实际重量
        data.totalPrice = data.unitPrice * this.quoteinfo.weight;
        data.quantity = this.quoteinfo.weight;
      } else {
        //计费重量
        data.totalPrice = data.unitPrice * this.quoteinfo.volume * 167;
        data.quantity = this.quoteinfo.volume * 167;
      }
    }
  }

  //重量改变
  changeWeight(event: any) {
    this.basiccost.forEach((c) => {
      if (this.quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this.quoteinfo.shipmentType == 1) {
        this.handlequotesComponent.bulkcargo(c);
      } else if (this.quoteinfo.freightMethodType == this.freightMethodTypeValue.Air) {
        this.calculatetotal(c);
      }
    });
  }

  // changeUnitCode(event: any) {
  //   switch (event) {
  //     case WeightUnitCode.LBS:
  //       this.quoteinfo.volumeUnitCode = VolumeUnitCode.CFT;
  //       break;
  //     case WeightUnitCode.KGS:
  //       this.quoteinfo.volumeUnitCode = VolumeUnitCode.CBM;
  //       break;
  //     case VolumeUnitCode.CFT:
  //       this.quoteinfo.weightUnitCode = WeightUnitCode.LBS;
  //       break;
  //     case VolumeUnitCode.CBM:
  //       this.quoteinfo.weightUnitCode = WeightUnitCode.KGS;
  //       break;
  //     default:
  //       break;
  //   }
  // }

  changeUnitCode(event: any) {
    switch (event) {
      case WeightUnitCode.LBS:
        this.quoteinfo.volumeUnitCode = VolumeUnitCode.CFT;
        break;
      case WeightUnitCode.KGS:
        this.quoteinfo.volumeUnitCode = VolumeUnitCode.CBM;
        break;
      case VolumeUnitCode.CFT:
        this.quoteinfo.weightUnitCode = WeightUnitCode.LBS;
        break;
      case VolumeUnitCode.CBM:
        this.quoteinfo.weightUnitCode = WeightUnitCode.KGS;
        break;
      default:
        break;
    }
  }

  //体积改变
  changeVolume(event: any) {
    this.basiccost.forEach((c) => {
      if (this.quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this.quoteinfo.shipmentType == 1) {
        this.handlequotesComponent.bulkcargo(c);
      } else if (this.quoteinfo.freightMethodType == this.freightMethodTypeValue.Air) {
        this.calculatetotal(c);
      }
    });
  }

  //获取起始port
  GetAllOrginalPort(name: string = '') {
    this.quotesService
      .getAllPost({
        name: name,
        isAir: this.quoteinfo.freightMethodType === this.freightMethodTypeValue.Air,
        isOcean: this.quoteinfo.freightMethodType === this.freightMethodTypeValue.Ocean,
      })
      .subscribe(
        (res) => {
          this.OriginPortList = res.items;
        },
        (error) => {
          // this.message.info('Data loading failed');
          this.message.info(this.translate.instant('Data loading failed'));
        },
      );
  }

  //获取目的port
  GetAllDesitinaPort(name: string = '') {
    this.quotesService
      .getAllPost({
        name: name,
        isAir: this.quoteinfo.freightMethodType === this.freightMethodTypeValue.Air,
        isOcean: this.quoteinfo.freightMethodType === this.freightMethodTypeValue.Ocean,
      })
      .subscribe(
        (res) => {
          this.DesinationPortList = res.items;
        },
        (error) => {
          // this.message.info('Data loading failed');
          this.message.info(this.translate.instant('Data loading failed'));
        },
      );
  }

  @debounce(200)
  //搜索origin港口
  portOriginsearch(event: any) {
    if (event.length >= 2) this.GetAllOrginalPort(event);
  }

  @debounce(200)
  //搜索origin港口
  portDesinationsearch(event: any) {
    if (event.length >= 2) this.GetAllDesitinaPort(event);
  }

  comparePort(event: any, portId: string, type: string) {
    switch (type) {
      case 'origin':
        if (portId == this.quoteinfo.destinationPortId) {
          event.stopPropagation;
          this.isSamePort = false;
        } else {
          this.isSamePort = true;
        }
        break;
      case 'destination':
        if (portId == this.quoteinfo.originPortId) {
          event.stopPropagation;
          this.isSamePort = false;
        } else {
          this.isSamePort = true;
        }
        break;
      default:
        break;
    }
  }

  //选择单位类型
  selectUnit(event: any) {
    if (event == 0) {
      this.quoteinfo.weightUnitCode = WeightUnitCode.KGS;
      this.quoteinfo.volumeUnitCode = VolumeUnitCode.CBM;
    } else {
      this.quoteinfo.weightUnitCode = WeightUnitCode.LBS;
      this.quoteinfo.volumeUnitCode = VolumeUnitCode.CFT;
    }
  }

  selFreightType() {
    //根据CY  DOOR判断运输类型
    if (this.quoteinfo.originIsRequireTruck && this.quoteinfo.destinationIsRequireTruck) {
      this.quoteinfo.freightType = freightType.DOORDOOR;
    } else if (this.quoteinfo.originIsRequireTruck && !this.quoteinfo.destinationIsRequireTruck) {
      this.quoteinfo.freightType = freightType.DOORCY;
    } else if (!this.quoteinfo.originIsRequireTruck && this.quoteinfo.destinationIsRequireTruck) {
      this.quoteinfo.freightType = freightType.CYDOOR;
    } else if (!this.quoteinfo.originIsRequireTruck && !this.quoteinfo.destinationIsRequireTruck) {
      this.quoteinfo.freightType = freightType.CYCY;
    }
  }

  //运输条款
  freightTypesel(event: any) {
    if (event == 1) {
      this.quoteinfo.originIsRequireTruck = false;
      this.quoteinfo.destinationIsRequireTruck = false;
    } else if (event == 2) {
      this.quoteinfo.originIsRequireTruck = false;
      this.quoteinfo.destinationIsRequireTruck = true;
    } else if (event == 3) {
      this.quoteinfo.originIsRequireTruck = true;
      this.quoteinfo.destinationIsRequireTruck = false;
    } else if (event == 4) {
      this.quoteinfo.originIsRequireTruck = true;
      this.quoteinfo.destinationIsRequireTruck = true;
    }
  }

  //贸易类型选择
  tradeTypeChange(event: any) {
    if (event == 2 || event == 3) {
      this.quoteinfo.shipmentType = 1;
      this.quoteinfo.freightMethodType = this.freightMethodTypeValue.Air;
      this.quoteinfo.originPortId = null;
      this.quoteinfo.destinationPort = null;
      this.quoteinfo.originAddressId = null;
      this.quoteinfo.destinationAddressId = null;
      this.quoteinfo.originIsRequireTruck = false;
      this.quoteinfo.destinationIsRequireTruck = false;
      this.quoteinfo.freightType = freightType.DOORDOOR;
    } else {
      this.quoteinfo.shipmentType = 0;
      this.quoteinfo.freightMethodType = this.freightMethodTypeValue.Ocean;
      this.quoteinfo.originAddressId = null;
      this.quoteinfo.freightType = freightType.CYCY;
    }
    this.isLocationSame = true;
    this.isSamePort = true;
  }

  //运输方式选择
  selfreightMethodType(event: any) {
    if (event == 1) {
      this.quoteinfo.shipmentType = 0;
    } else {
      this.quoteinfo.shipmentType = 1;
    }
  }

  selLocation(event: any, locationId: string, type: string) {
    switch (type) {
      case 'originLocation':
        if (locationId == this.quoteinfo.destinationAddressId) {
          event.stopPropagation();
          this.isLocationSame = false;
        } else {
          this.isLocationSame = true;
        }
        break;
      case 'destinationLocation':
        if (locationId == this.quoteinfo.originAddressId) {
          event.stopPropagation();
          this.isLocationSame = false;
        } else {
          this.isLocationSame = true;
        }
        break;
      default:
        break;
    }
  }

  selMapLication(event: any, item: any, type: string) {
    switch (type) {
      case 'originLocation':
        if (item.id == this.quoteinfo.destinationAddressId) {
          event.stopPropagation();
          this.isLocationSame = false;
        } else {
          this.isLocationSame = true;
        }

        break;
      case 'destinationLocation':
        if (item.id == this.quoteinfo.originAddressId) {
          event.stopPropagation();
          this.isLocationSame = false;
        } else {
          this.isLocationSame = true;
        }
        break;
      default:
        break;
    }
  }

  //清空数据
  clearDate() {
    this.quoteinfo = {};
    this.basiccost = [{ tradeType: 0, shipmentType: 0, freightType: freightType.CYCY, validDateRange: [this.today] }];
    this.endplace = [{}, {}];
    this.startingplace = [{}, {}];
  }

  //不可用时间
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

  handContainer(event: any) {
    if (event.length > 0) {
      this.containList = event;
      this.containHavedataList = event;
      this.isContain = true;
    }
  }

  //获取FBA地址
  amazonList: any[] = [];
  GetAmazonAll(isCityocean: boolean) {
    this.quotesService.GetFBALocations(isCityocean).subscribe((c) => {
      this.amazonList = c.items;
    });
  }

  // onWeightChange(): void {
  //   if (!isNaN(this.quoteinfo.weight)) {
  //     this.quoteinfo.weight = null;
  //   }
  // }

  // formatNumber(value: string): string {
  //   const stringValue = `${value}`;
  //   const list = stringValue.split('.');
  //   const prefix = list[0].charAt(0) === '-' ? '-' : '';
  //   let num = prefix ? list[0].slice(1) : list[0];
  //   let result = '';
  //   while (num.length > 3) {
  //     result = `,${num.slice(-3)}${result}`;
  //     num = num.slice(0, num.length - 3);
  //   }
  //   if (num) {
  //     result = num + result;
  //   }
  //   return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
  // }

  //搜索港前拖车地址（地图）
  originLocationsearch(event: any) {
    this.locations = this.locations.filter(
      (b) => (b.name && b.name.match(event)) || (b.streetAddress && b.streetAddress.match(event)) || (b.city && b.city.match(event)),
    );
    if (event) {
      if (this.locations.length <= 0) {
        this.mapSearch(event);
      } else {
        this.mapList = [];
        this.locations = this.cacheLocations;
      }
    } else {
      this.mapList = [];
      this.locations = this.cacheLocations;
    }
  }
  handLocation(event: any, type: string) {
    if (!event) {
      this.mapList = [];
      this.locations = this.cacheLocations;
      this.isLocationSame = true;
      if (type == 'origin') this.quoteinfo.originAddressId = null;
      if (type == 'desination') this.quoteinfo.destinationAddressId = null;
      return;
    }
    if (!event.key) {
      //非地图数据组装
      let name = '';
      if (event.name) {
        name += event.name + ',';
      }
      if (event.streetAddress) {
        name += event.streetAddress + ',';
      }
      if (event.city) {
        name += event.city + ',';
      }
      if (event.province) {
        name += event.province + ',';
      }
      if (event.country) {
        name += event.country;
      }
      if (type == 'origin') {
        this.quoteinfo.originAddressName = name;
        this.quoteinfo.originAddress.cityId = event.cityId;
      } else {
        this.quoteinfo.destinationAddressName = name;
        this.quoteinfo.destinationAddress.cityId = event.cityId;
      }
    } else {
      if (type == 'origin') {
        this.quoteinfo.originPlaceId = event.placeId;
      } else {
        this.quoteinfo.desinationPlaceId = event.placeId;
      }
    }
    if (type == 'origin') {
      this.quoteinfo.originAddressId = event.id;
    } else {
      this.quoteinfo.destinationAddressId = event.id;
    }
  }
  //地图搜索地址
  mapList: any[] = [];
  mapSearch(input: any) {
    this.amapService.mapSearch(input).subscribe((res) => {
      this.mapList = res.predictions;
      this.locations = this.mapList.map((map) => {
        return {
          name: map.description,
          id: map.description,
          // streetAddress: map.description,
          key: map.place_id,
          placeId: map.place_id,
        };
      });
    });
  }

  clearPort(event: any) {
    if (!event) this.isSamePort = true;
  }

  //创建create
  ngSubmit() {
    //触发验证
    this.isClosed.emit(true);
    this.quotesService.submit(this.formData);
    if (
      !this.handlequotesComponent.verification() ||
      !this.formData.valid ||
      (this.quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this.quoteinfo.shipmentType == 0 && !this.isContain) ||
      !this.isSamePort ||
      !this.isSamePort
    ) {
      this.isClosed.emit(false);
      this.isSubmitted = true;
      setTimeout(() => {
        (document.querySelector('.alert-danger') as any).scrollIntoView({ block: 'end', mode: 'smooth' });
      }, 0);
      return false;
    }
    this.initiaveQuoteStatus.emit(true);
    this.quoteReplys.carrierId = this.basiccost[0].carrierId;
    this.quoteReplys.quoteEnquiryId = this.quoteinfo.id;
    this.quoteReplys.transitTime = this.basiccost[0].transitTime;
    if (this.basiccost[0].validDateRange) {
      this.quoteReplys.validEndDate = this.basiccost[0].validDateRange[1];
      this.quoteReplys.validStartDate = this.basiccost[0].validDateRange[0];
    }
    //判断海运散货 海运整柜 空运散货得报价添加
    if (this.quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this.quoteinfo.shipmentType == 0) {
      //海运整柜
      this.containHavedataList.forEach((c) => {
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
          this.containHavedataList.forEach((b) => {
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
          this.containHavedataList.forEach((b) => {
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
    if (this.quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this.quoteinfo.shipmentType == 1) {
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
          c.quantity = this.quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this.quoteinfo.volume;
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
          c.quantity = this.quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this.quoteinfo.volume;
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
    if (this.quoteinfo.freightMethodType == this.freightMethodTypeValue.Air) {
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
          c.quantity = this.quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this.quoteinfo.volume;
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
          c.quantity = this.quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this.quoteinfo.volume;
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
    this.quoteinfo.containerType = JSON.stringify(this.containList);
    this.quoteinfo.quoteReplys.push(this.quoteReplys);

    //判断CY-DOOR
    if (!this.quoteinfo.originIsRequireTruck && this.quoteinfo.tradeType == 1) {
      this.quoteinfo.originAddressId = null;
      this.quoteinfo.originAddressName = null;
    }
    //判断CY-DOOR
    if (!this.quoteinfo.destinationIsRequireTruck && this.quoteinfo.tradeType == 1) {
      this.quoteinfo.destinationAddressId = null;
      this.quoteinfo.destinationAddressName = null;
    }
    this.copyquoteInfo = cloneDeep(this.quoteinfo); //拷贝对象
    //判断起始地 目的地是字符串还是数字类型
    if (this.copyquoteInfo.originAddressId && !this.copyquoteInfo.originAddressId.match(this.reg)) {
      this.copyquoteInfo.originAddressName = this.copyquoteInfo.originAddressId;
      this.copyquoteInfo.originAddressId = '';
    }
    if (this.copyquoteInfo.destinationAddressId && !this.copyquoteInfo.destinationAddressId.match(this.reg)) {
      this.copyquoteInfo.destinationAddressName = this.copyquoteInfo.destinationAddressId;
      this.copyquoteInfo.destinationAddressId = '';
    }

    this.quotesService.initiaivecreate(this.copyquoteInfo).subscribe(
      (c) => {
        this.isSuccessfully.emit(true);
        this.initiaveQuoteStatus.emit(false);
      },
      (error) => {
        this.isSuccessfully.emit(false);
        this.initiaveQuoteStatus.emit(false);
      },
    );
  }

  i = 1;
  @ViewChild('freight') freight: ElementRef;
  onGoDetial(data: any) {
    this.i = data;
    if (data === 1) {
      this.freight.nativeElement.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'start' });
    } else if (data === 2) {
      this.handlequotesComponent.basicFee.nativeElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'start',
      });
    } else if (data === 3) {
      this.handlequotesComponent.originFee.nativeElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'start',
      });
    } else if (data === 4) {
      this.handlequotesComponent.desitionFee.nativeElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'start',
      });
    } else if (data === 5) {
      this.handlequotesComponent.validDateDiv.nativeElement.scrollIntoView({
        behavior: 'auto',
        block: 'start',
        inline: 'start',
      });
    }
  }
}
