import { Component, OnInit, ViewChild, ElementRef, Inject, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { forkJoin, Observable } from 'rxjs';
import { differenceInCalendarDays } from 'date-fns';
import { PackingListComponent } from '../packing-list/packing-list.component';
import { UploadXHRArgs, NzModalService, NzMessageService } from 'ng-zorro-antd';
import { HttpRequest } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LocationFormModalComponent, UserFormModalComponent } from '@co/cbc';
import { isArray } from 'lodash';
import {
  AttachmentType,
  BusinessType,
  FreightMethodType,
  RecentlyUsed,
  FbaFreightMethod,
  BookingEntity,
  bookingStatus,
  VolumeUnitCode,
  WeightUnitCode,
  DictionaryType,
  OriginalOrTelex,
} from '../class';

import {
  CSPAttachmentService,
  CSPBookingService,
  CSPBookingTemplateService,
  CSPPurchaseOrderService,
  CSPPubService,
  CSPCityOceanService,
} from '../../../../services/csp';
import {
  CRMPartnerExternalService,
  CRMContactService,
  CRMContactExternalService,
  CRMCustomerExternalService,
  CRMCustomerService,
  CRMQuoteEnquiryService,
  CRMLocationExternalService,
  CRMCustomerDto,
} from '../../../../services/crm';
import { _HttpClient } from '@co/common';
import { CO_SESSIONSERVICE_TOKEN, CoConfigManager, CoPageBase, ISessionService } from '@co/core';
import { PlatformCompanyConfigureService, PUBDataDictionaryService, PUBPlaceService } from '@co/cds';
import { RatesOceanService, RatesQuoteEnquiryService } from 'apps/crm/app/services/rates';
import { NewPackingListComponent } from '../../new-packing-list/new-packing-list.component';

const emptyGuid = '00000000-0000-0000-0000-000000000000';

@Component({
  selector: 'createBooking-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.less'],
})
export class CreateBookingComponent extends CoPageBase implements OnInit {
  //booking??????
  bookingObj: BookingEntity = {
    weightUnitId: null,
    volumeUnitId: null,
    quantityUnitId: null,
    isTaxIncluded: true,
    freightMethodType: FreightMethodType.Ocean,
    shipmentType: 0,
    cargoReadyDate: null,
    isClearance: false,
    destinationIsRequireTruck: false,
    isInsurance: false,
    isDeclaration: null,
    originIsRequireTruck: false,
    quantityUnitCode: 'ctn',
    weightUnitCode: WeightUnitCode.KGS,
    weightUnitString: 'kg',
    volumeUnitCode: VolumeUnitCode.CBM,
    volumeUnitString: 'cbm',
    dimensionsUnitId: 1,
    unitConvertType: 0,
    deliveryMethodType: null,
    packingLists: [],
    cusClearanceInvoices: [],
    customsDeclarationDocumentIds: [],
    containerType: '',
    containsSpecialGoodsTypes: '',
    deliveryDate: '',
    description: '',
    destinationPortId: null,
    shipperLocationId: null,
    destinationPort: null,
    destinationAddressId: null,
    originPortId: null,
    originPort: null,
    quantity: null,
    weight: null,
    volume: null,
    tradeType: 1,
    originAddressId: null,
    specialInstructions: '',
    isContainsSpecialGoods: null,
    consigneePartnerId: null,
    shipperPartnerId: null,
    airOwner: '', // ????????????
    airOwnerName: '', // ???????????????
    hsCode: '', // ??????????????????
    needMBL: false, // ??????MBL
    requestMBL: '', // MBL????????????
    originalOrTelex: '', // ????????????
    quoteNo: '', // ?????????
    remark: '', // ????????????
    shipOwner: '', // ?????????
    shipOwnerName: '', // ????????????
    estDelivery: '', //?????????
  };
  cusClearanceInvoicesGroup: Array<any> = new Array<any>();
  //bookingOrderNo
  bookingOrderNoList: Array<any> = new Array<any>();
  //??????other
  other = null;
  //??????
  isShowTemplate: boolean;
  //????????????(??????)
  OriginPortList: Array<any> = new Array<any>();
  //????????????(??????)
  DesinationPortList: Array<any> = new Array<any>();
  //????????????
  locationList: Array<any> = new Array<any>();
  //????????????????????????
  customerAndPartnerList = [];
  //??????????????????????????????
  shiplist: Array<any> = new Array<any>();
  //???????????????????????????
  companyContactlist: Array<any> = new Array<any>();
  //??????????????????????????????
  contactlist: Array<any> = new Array<any>();
  //special goods
  dictionaryList: Array<any> = new Array<any>();
  //??????list
  unitList: Array<any> = new Array<any>();
  //????????????
  tradeTypeList: any[] = [];
  //????????????
  incotermsList: Array<any> = new Array<any>();
  otherList: Array<any> = new Array<any>();
  //????????????
  BusinessId: string = emptyGuid;
  BusinessType: number = BusinessType.Booking;
  //????????????
  isSubmitted = false;
  //packlist??????????????????
  verificationPassed: boolean;
  today = new Date();
  readonly unitBasic = {
    quantityUnitCode: 'ctn',
    weightUnitCode: WeightUnitCode.KGS,
    weightUnitString: 'kg',
    volumeUnitCode: VolumeUnitCode.CBM,
    volumeUnitString: 'cbm',
  };
  //????????????
  uploadUrl = CoConfigManager.getValue('uploadUrl');
  cannotDeactivate = true;
  readonly VolumeUnitCode = VolumeUnitCode;
  readonly WeightUnitCode = WeightUnitCode;
  readonly OriginalOrTelex = OriginalOrTelex;

  @ViewChild(NewPackingListComponent) newPackingListComponent: NewPackingListComponent;
  @ViewChild(PackingListComponent) PackingListComponent: PackingListComponent;
  @ViewChild(LocationFormModalComponent, { static: true }) LocationFormModalComponent: LocationFormModalComponent;
  @ViewChild(UserFormModalComponent, { static: true }) UserFormModalComponent: UserFormModalComponent;
  FreightMethodType = FreightMethodType;
  bookingNameSelectCloseFlag = false; // for check if need clear booking name
  readonly fbaFreightMethodIdMap = FbaFreightMethod;
  submitting = false;
  submittingDraft = false;
  OriginPortListFromRates: any[] = [];
  DesitinaPortListFromRates: any[] = [];
  currentCustomer: CRMCustomerDto;
  readonly ShipmentType = {
    FCL: 0,
    LCL: 1,
  };
  isCRM = false; //?????????CRM??????
  airOwnerList: any[] = []; //????????????
  shippeOwnerList: any[] = []; //?????????
  quoteNoList: any[] = []; //?????????
  constructor(
    public activeRoute: ActivatedRoute,
    public location: Location,
    public router: Router,
    public _httpClient: _HttpClient,
    public crmQuoteEnquiryService: CRMQuoteEnquiryService,
    public cspBookingTemplateService: CSPBookingTemplateService,
    public cspBookingService: CSPBookingService,
    public cspPurchaseOrderService: CSPPurchaseOrderService,
    public cspAttachmentService: CSPAttachmentService,
    public cspPubService: CSPPubService,
    public ratesOceanServiceService: RatesOceanService,
    public ratesQuoteEnquiryService: RatesQuoteEnquiryService,
    public cspCityOceanService: CSPCityOceanService,
    public modalService: NzModalService,
    // todo I18nMessageService
    private message: NzMessageService,
    private crmPartnerExternalService: CRMPartnerExternalService,
    private crmContactExternalService: CRMContactExternalService,
    private crmCustomerExternalService: CRMCustomerExternalService,
    private crmLocationExternalService: CRMLocationExternalService,
    private crmCustomerService: CRMCustomerService,
    private translate: TranslateService,
    private pubDataDictionaryService: PUBDataDictionaryService,
    private pubPlaceService: PUBPlaceService,
    private platformCompanyConfigureService: PlatformCompanyConfigureService,
    @Inject(CO_SESSIONSERVICE_TOKEN) private sessionService: ISessionService,
    injector: Injector,
  ) {
    super(injector);
  }
  //???????????????????????????
  DetailId: string;
  BookingId: string;
  isEdit = 'true';
  isTemplate = 'false';
  QuotesId: string;
  TemplateId: string;
  result: any;
  orderParam: any;
  originalPortName: string = '';
  desinationPortName: string = '';
  nameList: any;
  isRepeat = false;
  operationPortlist = []; // ??????
  shipperList = []; //shipper
  consigneeList = []; //consignee
  originOr = null;
  defaultShipperId = null; // ??????????????????????????????ID
  defaultConsigneeId = null; //??????????????????????????????ID
  isDraft = false;
  FbmList = [];
  isOpen: boolean = true;

  ngOnInit() {
    super.ngOnInit();
    const id = this.activeRoute.snapshot.params.id;
    if (isNaN(+id)) {
      this.BookingId = id;
      this.BusinessId = this.BookingId;
    }
    this.activeRoute.queryParams.subscribe((params) => {
      if (params['TemplateId']) {
        //??????????????????Id
        this.TemplateId = params['TemplateId'];
      }
      if (params['isTemplate']) {
        //?????????????????????????????????
        this.isTemplate = params['isTemplate'];
      }
      if (params['isEdit']) {
        //????????????booking
        this.isEdit = params['isEdit'];
      }
      if (params['DetailId']) {
        //booking????????????
        this.DetailId = params['DetailId'];
      }
      if (params['originPortId']) {
        Object.assign(this.bookingObj, { originPortId: params['originPortId'] });
      }
      if (params['deliveryPortId']) {
        Object.assign(this.bookingObj, { destinationPortId: params['deliveryPortId'] });
      }
      if (params['QuotesId']) {
        //booking????????????
        this.QuotesId = params['QuotesId'];
      }
      if (params['orderId']) {
        //???????????????booking
        const result = params['orderId'];
        if (result) {
          this.isEdit = 'false';
          this.orderParam = JSON.parse(result);
        }
      }
      if (params['orderShipperId']) {
        //???????????????booking
        this.defaultShipperId = params['orderShipperId'];
      }
      if (params['orderConsigneeId']) {
        //???????????????booking
        this.defaultConsigneeId = params['orderConsigneeId'];
      }
      if (params['mode']) {
        //?????????????????????????????????
        this.bookingObj.freightMethodType = Number(params['mode']);
      }
      if (params['CRM']) {
        this.isCRM = true;
      }
    });
    const queryParams = this.activeRoute.snapshot.queryParams;
    if (this.TemplateId) {
      this.GetBookingInfoByTemplate(this.TemplateId); //???????????????this.getTradeTypeDictionary('006')
    }
    //#region ????????????, ??????id ??????booking ??????
    const initialDataRequestList = [this.getAllDictionary('095'), this.getUnitDictionary('003'), this.getTradeTypes()];
    switch (true) {
      case !!queryParams.QuotesId:
        initialDataRequestList.push(this.getqueteDetail(this.QuotesId));
        break;
      case !!queryParams.DetailId:
        initialDataRequestList.push(this.GetBookingForUpdate(this.DetailId));
        break;
      case !!this.BookingId:
        initialDataRequestList.push(this.GetBookingForUpdate(this.BookingId));
        break;
      case !!this.orderParam:
        initialDataRequestList.push(this.UseOrderForBooking(this.orderParam));
        break;
      default:
    }
    //#endregion
    forkJoin(initialDataRequestList).subscribe((res) => {
      //???????????????????????????
      this.GetRecentlyUsed(this.bookingObj.tradeType); //??????????????????
    });
    // forkJoin([this.getAllCompanyContact()]).subscribe((res: any) => {});
    this.getMyCustomerAndPartner();
    this.GetTenentAllLocation(); //???????????????????????????
    this.getOrder(); //????????????
    this.GetAmazonAll(false); //??????????????????
    this.GetCityoceanAll(true); //??????????????????
    this.getFbaFreightMethod(DictionaryType.FreightMethod); //??????FBA????????????
    this.getChannel();
    this.getCurrentCustomer();
    this.getByPlaceOrLocation();
    this.getCrmAllForUiPicker(1);
    this.getCrmAllForUiPicker(2);
  }

  // ???????????????
  getQuoteNo(searchText?: string) {
    this.ratesQuoteEnquiryService.getQuoteNo({ searchText }).subscribe((c: any) => {
      this.quoteNoList = c;
    });
  }

  // ??????????????????
  getCrmAllForUiPicker(customerType?: number, searchText?: string) {
    this.crmCustomerService.getAllForUiPicker({ searchText, customerType, sorting: 'code' }).subscribe((c: any) => {
      customerType === 1 ? (this.shippeOwnerList = c.items) : (this.airOwnerList = c.items);
    });
  }
  //??????????????????
  getOrder(searchKey?: string) {
    this.cspPurchaseOrderService.bookingSearch({ searchKeyword: searchKey }).subscribe((c: any) => {
      this.bookingOrderNoList = c.items;
      if (c.items.length <= 0 || !searchKey) {
        // ???????????????????????????????????????booking name
        if (this.bookingNameSelectCloseFlag) {
          this.bookingNameSelectCloseFlag = false;
        } else if (searchKey !== void 0) {
          this.bookingObj.name = searchKey;
          this.bookingCheck();
        }
      } else {
        this.bookingObj.name = '';
      }
    });
  }

  orderChange(event: any) {
    //????????????
    this.nameList = event;
    this.isSubmitted = false;
    let arr = [];
    if (isArray(event)) {
      event.forEach((e) => {
        this.bookingOrderNoList.forEach((ele) => {
          if (e === ele.id) {
            arr.push(ele.orderNumber);
          }
        });
      });
    }
    this.bookingObj.name = arr.join(',');
    this.bookingObj.purchaseOrderIds = [...event];
    if (event.length <= 0) this.isRepeat = false;
  }

  bookingCheck() {
    return new Promise((resolve, reject) => {
      const param = {
        purchaseOrderIds: this.bookingObj.purchaseOrderIds,
        name: this.bookingObj.name,
        id: this.bookingObj.shipperCustomerId,
        shipperCustomerId: this.bookingObj.id,
        consigneeCustomerId: this.bookingObj.consigneeCustomerId,
      };
      //?????????????????????????????????
      this.cspBookingService.isExists(param).subscribe((c: any) => {
        this.isRepeat = c;
        resolve(this.isRepeat);
      });
    });
  }

  onClose() {
    //????????????
    this.bookingObj.name = null;
    this.isRepeat = false;
  }

  //????????????????????????
  getAllDictionary(typeId: string) {
    return new Observable((ob) => {
      this.pubDataDictionaryService.getAll({ typeCode: typeId }).subscribe(
        (res) => {
          this.dictionaryList = res.items;
          this.dictionaryList.forEach((c) => {
            c.checked = false;
          });
          ob.next(this.dictionaryList);
          ob.complete();
        },
        (error) => {
          this.message.info('Data loading failed');
        },
      );
    });
  }

  //????????????
  getUnitDictionary(typeCode: string) {
    return new Observable((ob) => {
      this.pubDataDictionaryService.getAll({ typeCode }).subscribe(
        (res) => {
          this.unitList = res.items;
          ob.next(this.unitList);
          ob.complete();
        },
        (error) => {
          this.message.info('Data loading failed');
        },
      );
    });
  }

  getMyCustomerAndPartner() {
    if (this.isCRM) {
      // CRM??????
      this.crmCustomerService.getMyCustomerAndPartners({}).subscribe((data: any) => {
        this.customerAndPartnerList = data.items;
        this.shipperList = [...this.customerAndPartnerList];
        this.consigneeList = [...this.customerAndPartnerList];
      });
    } else {
      this.crmPartnerExternalService.getMyCustomerAndPartners({}).subscribe((data) => {
        this.customerAndPartnerList = data as any;
        this.shipperList = [...this.customerAndPartnerList];
        this.consigneeList = [...this.customerAndPartnerList];
      });
    }
  }

  getqueteDetail(id: string) {
    return this.crmQuoteEnquiryService.getForCRM({ id }).pipe(
      tap((res) => {
        for (let item in this.bookingObj) {
          if (res[item] != undefined) {
            this.bookingObj[item] = res[item];
          }
        }
        this.bookingObj.quoteEnquiryId = id;
        this.bookingObj.id = null;
        this.GetIncotermsByTradeType(this.bookingObj.tradeType);
        this.handleEditInfo();
      }),
    );
  }

  //??????????????????
  getTradeTypes() {
    return new Observable((ob) => {
      this.pubDataDictionaryService.getTradeTypes({}).subscribe(
        (res: any[]) => {
          this.tradeTypeList = res;
          if (this.isEdit == 'false' && this.isTemplate == 'false') {
            //?????????????????????????????????????????????????????????????????????????????????????????????
            this.bookingObj.tradeType = res[0].value;
            this.GetIncotermsByTradeType(this.bookingObj.tradeType);
          }
          ob.next(this.tradeTypeList);
          ob.complete();
        },
        (error) => {
          this.message.info('Data loading failed');
        },
      );
    });
  }

  //??????FBA????????????
  fbaFreightMethodList: Array<any> = new Array<any>();

  getFbaFreightMethod(typeCode: string) {
    this.pubDataDictionaryService.getAll({ typeCode }).subscribe(
      (res) => {
        this.fbaFreightMethodList = res.items;
      },
      (error) => {
        this.message.info('Data loading failed');
      },
    );
  }

  //??????????????????
  // getIncotermsDictionary(tradeType: number) {
  //   this.bookingService.getDataDictionaryInfo(tradeType).subscribe(res => {
  //     this.incotermsList = res.items;
  //     this.otherList = [];
  //     if (typeId == 6) {
  //       this.incotermsList = res.items.splice(0, 2);
  //       this.otherList = res.items.filter(c => !this.incotermsList.includes(c.id));
  //     }
  //     if (this.isEdit == "false") {
  //       if (this.incotermsList.length > 0)
  //         this.bookingObj.incoterms = this.incotermsList[0].id;
  //     }
  //   }, error => {
  //     this.message.info("Data loading failed");
  //   })
  // }

  GetIncotermsByTradeType(tradeType: number) {
    this.pubDataDictionaryService.getIncotermsByTradeType({ tradeType }).subscribe(
      (res: any[]) => {
        this.incotermsList = res;
        this.otherList = [];
        if (tradeType == 1) {
          this.incotermsList = res.splice(0, 2);
          this.otherList = res.filter((c) => !this.incotermsList.includes(c.value));
        }
        if (this.isEdit == 'false' && this.isTemplate !== 'true') {
          if (this.incotermsList.length > 0) this.bookingObj.incotermsId = this.incotermsList[0].value;
        }
      },
      (error) => {
        this.message.info('Data loading failed');
      },
    );
  }

  isIncotermOtherActive() {
    if (this.bookingObj.tradeType !== 1 || !this.incotermsList?.length) return false;

    const hit = this.incotermsList.find((o) => o.value === this.bookingObj.incotermsId);
    if (!hit) return false;

    return !['DDP', 'C&F'].includes(hit.key);
  }

  //????????????????????????
  tradeTypeChange(event: any) {
    if (event == 2 || event == 3) {
      //???????????????FBA??????
      this.bookingObj.shipmentType = 1;
      this.bookingObj.isClearance = true;
      this.bookingObj.isDeclaration = null; //?????????????????????????????????
      this.bookingObj.originPortId = null;
      this.bookingObj.destinationPortId = null;
      this.bookingObj.consigneeCustomerId = null;
      this.shipSame = false;
    } else {
      //?????????????????? ??????????????????FBA??????????????????
      this.bookingObj.isClearance = false;
      this.bookingObj.isDeclaration = null;
      this.bookingObj.shipmentType = 0;
      this.bookingObj.isTaxIncluded = false;
      this.bookingObj.deliveryMethodType = null;
      this.bookingObj.deliveryWarehouseId = null;
      this.bookingObj.fbaFreightMethodId = null;
      this.bookingObj.channelId = null;
      this.bookingObj.contactId = null;
      this.bookingObj.deliveryTimeRange = null;
      this.bookingObj.pickUpTimeRange = null;
    }
    // this.bookingObj.shipperLocationId = null;
    // this.bookingObj.shipperCustomerId = null;
    this.resetDataOnTradeTypeChange();
    this.GetIncotermsByTradeType(event);
    this.GetRecentlyUsed(event);
    if (this.bookingObj.tradeType !== 1) {
      if (this.bookingObj.shipperCustomerId) {
        this.getAllCompanyContact({ customerId: this.bookingObj.shipperCustomerId }, 1);
      }
    }

    this.filterData(null, 1);
  }

  resetSomeData() {
    this.bookingObj.shipperLocationId = null;
    this.bookingObj.shipperCustomerId = null;
    this.bookingObj.consigneeCustomerId = null;
    this.bookingObj.shipperPartnerId = null;
    this.bookingObj.consigneePartnerId = null;
    this.defaultShipperId = null;
    this.defaultConsigneeId = null;
    this.bookingObj.contactPerson = null;
    this.bookingObj.consigneeLocationId = null;
  }

  resetDataOnTradeTypeChange() {
    // validation data
    this.isLocationSame = true;
  }

  //??????FBA??????
  amazonList = [];
  cachedAmazonList = [];

  GetAmazonAll(isCityocean: boolean) {
    this.crmLocationExternalService.getFBALocations({ isCityocean }).subscribe((c: any) => {
      this.cachedAmazonList = c.items;
    });
  }

  onAmazonSearch(event, id = '') {
    if (this.isCRM) {
      this.amazonList = this.cachedAmazonList;
    } else {
      if (event || id || !this.recentlyUsed?.fbaAddresses?.length) {
        this.amazonList = this.cachedAmazonList;
      } else {
        this.amazonList = this.recentlyUsed?.fbaAddresses;
      }
    }
  }

  //Delivery warehouse
  cityoceanList: Array<any> = new Array<any>();

  GetCityoceanAll(isCityocean: boolean) {
    // let id = null;
    // if (this.isCRM) {
    //   id = this.bookingObj.shipperCustomerId || abp.session.user.customerId;
    // } else {
    //   id = abp.session.user.customerId;
    // }
    this.crmLocationExternalService.getFBALocations({ isCityocean }).subscribe((c: any) => {
      this.cityoceanList = c.items;
    });
  }

  //????????????
  //????????????port
  GetAllOrginalPort(name: string = '', id = '') {
    const param = {
      id,
      name,
      isOcean: this.bookingObj.freightMethodType === FreightMethodType.Ocean,
      isAir: this.bookingObj.freightMethodType === FreightMethodType.Air,
      maxResultCount: 10,
    };
    if (!param.isOcean) delete param.isOcean;
    if (!param.isAir) delete param.isAir;
    this.pubPlaceService.getAll(param).subscribe(
      (res: any) => {
        this.OriginPortList = res.items;
        if (id) {
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

  //????????????port
  GetAllDesitinaPort(name: string = '', id = '') {
    const param = {
      id,
      name,
      isOcean: this.bookingObj.freightMethodType === FreightMethodType.Ocean,
      isAir: this.bookingObj.freightMethodType === FreightMethodType.Air,
      maxResultCount: 10,
    };
    if (!param.isOcean) delete param.isOcean;
    if (!param.isAir) delete param.isAir;
    this.pubPlaceService.getAll(param).subscribe(
      (res: any) => {
        this.DesinationPortList = res.items;
        if (id) {
          setTimeout(() => {
            this.portDesinationsearch('');
          });
        }
        this.addFormRatesDesitinaPort();
      },
      (error) => {
        this.message.info('Data loading failed');
      },
    );
  }

  // ?????????rates??????????????????
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

  //??????origin??????
  portOriginsearch(event: any, id = '') {
    if (event.length || id || !this.recentlyUsed?.originPorts?.length) {
      this.GetAllOrginalPort(event, id);
    } else {
      this.OriginPortList = this.recentlyUsed?.originPorts;
      this.addFormRatesOrginalPort();
    }
  }

  // ?????????rates??????????????????
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

  //??????origin??????
  portDesinationsearch(event: any, id = '') {
    if (event.length || id || !this.recentlyUsed?.destinationPorts?.length) {
      this.GetAllDesitinaPort(event, id);
    } else {
      this.DesinationPortList = this.recentlyUsed?.destinationPorts;
      this.addFormRatesDesitinaPort();
    }
  }

  //????????????
  isSamePort: boolean = true;

  comparePort(event: any, portId: string, type: string) {
    switch (type) {
      case 'origin':
        if (portId == this.bookingObj.destinationPortId) {
          event.stopPropagation;
          this.isSamePort = false;
        } else {
          this.isSamePort = true;
        }
        break;
      case 'destination':
        if (portId == this.bookingObj.originPortId) {
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

  //??????????????????????????????
  GetTenentAllLocation(customerId = null) {
    this.crmLocationExternalService.getLocationByCustomer({ customerId }).subscribe(
      (res: any) => {
        this.shiplist = res.items;
      },
      (error) => {
        this.message.info('Data loading failed');
      },
    );
  }

  getFbmData(customer?) {
    this.crmLocationExternalService.getLocationByCustomerOwn({ customerId: customer?.customerId }).subscribe(
      (res: any) => {
        this.FbmList = [...res.items];
      },
      (error) => {
        this.message.info('Data loading failed');
      },
    );
  }

  //?????????????????????????????????
  getAllCompanyContact(customer, type) {
    if (customer) {
      if (type === 1) {
        this.crmContactExternalService.getByCustomerAndPartner({ customerId: customer?.customerId }).subscribe((data: any) => {
          this.contactlist = data.items;
        });
        this.bookingObj.shipperCustomerId = customer?.customerId;
        if (this.bookingObj.tradeType !== 1) {
          // this.bookingObj.contactId = null;
          this.crmLocationExternalService.getLocationByCustomerOwn({ customerId: customer?.customerId }).subscribe(
            (res: any) => {
              this.companyContactlist = [...res.items];
            },
            (error) => {
              this.message.info('Data loading failed');
            },
          );
          this.getFbmData({ customerId: customer?.customerId });
        } else {
          this.GetTenentAllLocation(customer?.customerId);
        }
      } else if (type === 2) {
        this.bookingObj.consigneeCustomerId = customer?.customerId;

        if (this.bookingObj.tradeType === 3) {
          this.crmLocationExternalService.getLocationByCustomerOwn({ customerId: customer?.customerId }).subscribe(
            (res: any) => {
              this.companyContactlist = res.items;
            },
            (error) => {
              this.message.info('Data loading failed');
            },
          );
        } else {
          this.GetTenentAllLocation(customer?.customerId);
        }
      }
    } else {
      if (type === 1) {
        this.bookingObj.shipperCustomerId = null;
      } else {
        this.bookingObj.consigneeCustomerId = null;
      }
    }
  }

  //clearContact???????????????
  clearContact() {
    this.bookingObj.contactId = null;
  }

  getPartnerId(item, type) {
    if (type === 1) {
      this.bookingObj.shipperPartnerId = item?.partnerId;
    } else {
      this.bookingObj.consigneePartnerId = item?.partnerId;
    }
  }

  //??????????????????????????????
  companyChange(shipperLocationId: string) {
    if (this.companyContactlist.find((c) => c.id == shipperLocationId))
      this.contactlist = this.companyContactlist.find((c) => c.id == shipperLocationId).contacts;
  }

  //??????????????????????????????
  tenantChange(event: any, type: string) {
    switch (type) {
      case 'shipper':
        this.bookingObj.shipperLocationId = event.optionValue;
        this.bookingObj.shipperCustomerId = event.groupValue;
        break;
      case 'consignee':
        this.bookingObj.consigneeLocationId = event.optionValue;
        this.bookingObj.consigneeCustomerId = event.groupValue;
        break;
      default:
        break;
    }
  }

  //????????????????????????????????????
  shipSame: boolean = false;
  consiSame: boolean = false;

  seltenent(event: any, customerId: any, type: string) {
    switch (type) {
      case 'shipper':
        if (customerId == this.bookingObj.consigneeCustomerId) {
          event.stopPropagation();
          this.shipSame = true;
        } else {
          this.shipSame = false;
        }

        break;
      case 'consignee':
        if (customerId == this.bookingObj.shipperCustomerId) {
          event.stopPropagation();
          this.consiSame = true;
        } else {
          this.consiSame = false;
        }
        break;
      default:
        break;
    }
  }

  //??????location??????
  isLocationSame: boolean = true;
  fbmTitle = '';
  fbaTitle = '';
  deliveryWarehouseTitle = '';

  selLocation(event: any, locationId: string, type: string, item?, showType?) {
    if (item) {
      switch (showType) {
        case 'FBA':
          this.fbaTitle = `${item.name},${item.streetAddress}`;
          item.cole ? (this.fbaTitle += `,${item.cole}`) : null;
          break;
        case 'FBM':
          this.fbmTitle = `${item.tenantName}-${item.name},${item.streetAddress2},${item.streetAddress},${item.city},${item.province},${item.country}`;
          break;
        case 'DeliveryWarehouse':
          this.deliveryWarehouseTitle = `${item.name}`;
          break;
      }
    }
    switch (type) {
      case 'originLocation':
        if (locationId == this.bookingObj.destinationAddressId) {
          event.stopPropagation();
          this.isLocationSame = false;
        } else {
          this.isLocationSame = true;
        }
        break;
      case 'destinationLocation':
        if (
          (this.bookingObj.tradeType === 1 || (this.bookingObj.tradeType === 3 && this.bookingObj.deliveryMethodType === 1)) &&
          locationId == this.bookingObj.originAddressId
        ) {
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

  //????????????????????????location
  editLocation(event: any, data: any, type) {
    //????????????
    event.stopPropagation();
    let id;
    let pId;
    if (type === 'originLocation') {
      id = this.bookingObj.shipperCustomerId;
      pId = this.bookingObj.shipperPartnerId;
      this.originOr = 1;
    } else {
      id = this.bookingObj.consigneeCustomerId;
      pId = this.bookingObj.consigneePartnerId;
      this.originOr = 2;
    }
    this.LocationFormModalComponent.show(data.id, id, pId);
  }

  addLocation(type) {
    let id;
    let pId;
    if (type === 'originLocation') {
      id = this.bookingObj.shipperCustomerId;
      pId = this.bookingObj.shipperPartnerId;
      this.originOr = 1;
    } else {
      id = this.bookingObj.consigneeCustomerId;
      pId = this.bookingObj.consigneePartnerId;
      this.originOr = 2;
    }
    this.LocationFormModalComponent.show(null, id, pId);
  }

  //?????????????????? ??????????????????
  modalClose(event: any, type, originType?) {
    if (event) {
      this.message.success('create Sussess');
      if (type === 1) {
        if (originType === 1) {
          this.getAllCompanyContact({ customerId: this.bookingObj.shipperCustomerId }, originType);
        } else {
          this.getAllCompanyContact({ customerId: this.bookingObj.consigneeCustomerId }, originType);
        }
      } else {
        this.getAllCompanyContact({ customerId: this.bookingObj.shipperCustomerId }, 1);
      }
    } else this.message.error('create failed');
  }

  //?????????????????????

  addContact() {
    this.UserFormModalComponent.show(null, this.bookingObj.shipperLocationId, this.bookingObj.shipperCustomerId);
  }

  editContact(event: any, data: any) {
    //????????????
    event.stopPropagation();
    this.UserFormModalComponent.show(data.id);
  }

  //????????????
  containList: Array<any> = [
    { value: 0, name: '20GP' },
    { value: 0, name: '40GP' },
    { value: 0, name: '40HQ' },
    { value: 0, name: '45HQ' },
  ];

  operationContainer(event: any) {
    this.containList.find((c) => c.name == event).value = 1;
    this.isContain = true;
  }

  //??????????????????
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
  }

  //??????????????????
  isShowOtherContainer = false;
  otherNum: string = '20';

  changeNum(num: any) {
    this.otherNum = num;
  }

  addContainer(num, name) {
    let index = this.containList.filter((c) => c.name == num + name).length;
    if (index == 0) this.containList.push({ value: 0, name: num + name });
  }

  //??????????????????
  shipmentChange(event: any) {
    if (event == 0) {
      //???????????? ????????????????????????
      this.bookingObj.quantity = null;
      this.bookingObj.weight = null;
      this.bookingObj.volume = null;
    } else {
      //???????????????????????????????????????0
      this.containList.forEach((c) => (c.value = 0));
    }
  }

  //???????????????
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

  //????????????
  isDateMatch = true;

  compareDate(start: Date, end: Date) {
    if (start && end) {
      let num = differenceInCalendarDays(start, end);
      if (num > 0) this.isDateMatch = false;
      else this.isDateMatch = true;
    }
  }

  //FBA????????????
  isDeliveryTimeMatch = true;
  isPickTimeMatch = true;

  //FBA??????????????????
  fbaDateCompare() {
    if (this.bookingObj.pickUpTimeRange) {
      let deliveryTimeRange = this.bookingObj.pickUpTimeRange.substr(0, 10);
      let num = differenceInCalendarDays(new Date(deliveryTimeRange), new Date(this.bookingObj.deliveryDate));
      if (num > 0) this.isPickTimeMatch = false;
      else this.isPickTimeMatch = true;
    }
    if (this.bookingObj.deliveryTimeRange) {
      let pickUpTimeRange = this.bookingObj.deliveryTimeRange.substr(0, 10);
      let num = differenceInCalendarDays(new Date(pickUpTimeRange), new Date(this.bookingObj.deliveryDate));
      if (num > 0) this.isDeliveryTimeMatch = false;
      else this.isDeliveryTimeMatch = true;
    }
  }

  //??????deliveryMethod
  selfbadeliveryMethod(event: any) {
    if (event == 1) {
      this.bookingObj.deliveryTimeRange = '';
      this.isDeliveryTimeMatch = true;
      this.getAllCompanyContact({ customerId: this.bookingObj.shipperCustomerId }, 1);
    } else {
      this.bookingObj.pickUpTimeRange = '';
      this.isPickTimeMatch = true;
    }
  }

  //??????????????????
  selectUnit(event: any) {
    if (event == 0) {
      this.bookingObj.volumeUnitCode = this.VolumeUnitCode.CBM;
      this.bookingObj.volumeUnitString = '(cbm)';
      this.bookingObj.weightUnitCode = this.WeightUnitCode.KGS;
      this.bookingObj.weightUnitString = '(kg)';
    } else {
      this.bookingObj.volumeUnitCode = this.VolumeUnitCode.CFT;
      this.bookingObj.volumeUnitString = '(cbf)';
      this.bookingObj.weightUnitCode = this.WeightUnitCode.LBS;
      this.bookingObj.weightUnitString = '(lb)';
    }
  }

  //??????
  onVolumeBlur(value: number): void {
    if (isNaN(value)) this.bookingObj.volume = null;
  }

  //??????
  onWeightBlur(value: number): void {
    if (isNaN(value)) this.bookingObj.weight = null;
  }

  //??????
  onQuantityBlur(value: number): void {
    if (isNaN(value)) this.bookingObj.quantity = null;
  }

  specialgoodsList: Array<any> = new Array<any>();

  selectSpecialGoods(event: any, data: any) {
    if (event) {
      this.specialgoodsList.push({ id: data.id, Name: data.name, IsSelected: true });
    } else {
      let index = this.specialgoodsList.findIndex((c) => c.id == data.id);
      if (index >= 0) this.specialgoodsList.splice(index, 1);
    }
    if (this.specialgoodsList.length > 0) {
      this.bookingObj.containsSpecialGoodsTypes = JSON.stringify(this.specialgoodsList);
      this.bookingObj.isContainsSpecialGoods = true;
    }
  }

  unContainsSpecialGoods(event: any) {
    if (!event) {
      this.dictionaryList.forEach((c) => (c.checked = false));
      this.bookingObj.containsSpecialGoodsTypes = null;
    }
  }

  bookingTemplateList: [];

  //??????bookingTemplate????????????
  GetAllTemplate(obj: { Sorting?: string; MaxResultCount?: number; SkipCount?: number }) {
    this.cspBookingTemplateService.getAll({}).subscribe((res: any) => {
      this.bookingTemplateList = res.items;
    });
  }

  //????????????????????????
  UseOrderForBooking(orderIds: any[]) {
    return this.cspPurchaseOrderService.booking({ orderIds, toBooking: true }).pipe(
      tap((res: any) => {
        let namelist: any[] = [];
        this.bookingObj = { ...this.bookingObj, ...res.bookingOrder, ...this.unitBasic };
        res.orders.forEach((c) => {
          if (c.children && c.children.length) {
            // sub PO
            c.children.forEach((cc) => {
              namelist.push(cc.orderNumber);
            });
          } else {
            // no sub PO
            namelist.push(c.orderNumber);
          }
        });
        this.bookingObj.name = res.orders.map((o) => o.orderNumber).join(',');
        this.bookingObj.id = null;
        this.bookingObj.freightMethodType = this.activeRoute.snapshot.queryParams.mode || res.bookingOrder.freightMethodType;
        // this.bookingCheck(this.bookingObj.purchaseOrderIds, this.bookingObj.name);
        this.handleEditInfo();
      }),
    );
  }

  //???????????????yanzheng
  isContain: boolean = true; //???????????????
  yanZheng() {
    //????????????
    let isTrue = true;
    if (
      !this.bookingObj.incotermsId ||
      this.bookingObj.incotermsId === -1 ||
      !this.bookingObj.tradeType ||
      (this.bookingObj.freightMethodType == null && this.bookingObj.tradeType === 1) ||
      !this.bookingObj.shipmentType == null
    ) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType != 1 && !this.bookingObj.fbaFreightMethodId) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType != 1 && (this.bookingObj.channelId == null || this.bookingObj.channelId == 0)) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (
      (this.containList.filter((c) => c.value > 0).length <= 0 &&
        this.bookingObj.shipmentType == 0 &&
        this.bookingObj.freightMethodType == FreightMethodType.Ocean &&
        this.bookingObj.tradeType == 1) ||
      (this.containList.filter((c) => c.value > 0).length <= 0 &&
        this.bookingObj.shipmentType == 0 &&
        (this.bookingObj.fbaFreightMethodId == this.fbaFreightMethodIdMap.oceanTruck ||
          this.bookingObj.fbaFreightMethodId == this.fbaFreightMethodIdMap.oceanExpress) &&
        this.bookingObj.tradeType != 1)
    ) {
      this.message.info('Please complete the data');
      isTrue = false;
      this.isContain = false;
    } else if (this.bookingObj.tradeType == 1 && !this.bookingObj.originPortId) {
      //???????????????general?????????(??????)
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType == 1 && !this.bookingObj.destinationPortId) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType == 1 && !this.bookingObj.cargoReadyDate) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType == 1 && this.bookingObj.originIsRequireTruck && !this.bookingObj.originAddressId) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType == 1 && this.bookingObj.destinationIsRequireTruck && !this.bookingObj.destinationAddressId) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (
      this.bookingObj.freightMethodType == FreightMethodType.Ocean &&
      this.bookingObj.shipmentType == 1 &&
      (!this.bookingObj.quantity || !this.bookingObj.weight || !this.bookingObj.volume)
    ) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (
      this.bookingObj.freightMethodType == FreightMethodType.Air &&
      (!this.bookingObj.volume || !this.bookingObj.weight || !this.bookingObj.quantity)
    ) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (!this.bookingObj.shipperCustomerId) {
      //???????????????FBA/FBM?????????(??????)
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType != 1 && !this.bookingObj.contactId) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType != 1 && this.bookingObj.deliveryMethodType == null) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType != 1 && !this.bookingObj.deliveryWarehouseId) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (
      this.bookingObj.tradeType != 1 &&
      (this.bookingObj.isDeclaration == null || (this.bookingObj.isDeclaration && !this.files.length))
    ) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType != 1 && !this.bookingObj.deliveryTimeRange && this.bookingObj.deliveryMethodType == 0) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType != 1 && !this.bookingObj.pickUpTimeRange && this.bookingObj.deliveryMethodType == 1) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.bookingObj.tradeType != 1 && this.bookingObj.deliveryMethodType == 1 && !this.bookingObj.originAddressId) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (
      (this.bookingObj.fbaFreightMethodId == this.fbaFreightMethodIdMap.airExpress ||
        this.bookingObj.fbaFreightMethodId == this.fbaFreightMethodIdMap.express) &&
      (!this.bookingObj.volume || !this.bookingObj.weight || !this.bookingObj.quantity)
    ) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (
      (this.bookingObj.fbaFreightMethodId == this.fbaFreightMethodIdMap.oceanTruck ||
        this.bookingObj.fbaFreightMethodId == this.fbaFreightMethodIdMap.oceanExpress) &&
      this.bookingObj.shipmentType == 1 &&
      (!this.bookingObj.volume || !this.bookingObj.weight || !this.bookingObj.quantity)
    ) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (
      !this.isSamePort ||
      !this.isDateMatch ||
      !this.isLocationSame ||
      this.shipSame ||
      this.consiSame ||
      !this.isPickTimeMatch ||
      !this.isDeliveryTimeMatch
    ) {
      //??????
      this.message.info('data verification error');
      isTrue = false;
    } else if (
      this.bookingObj.isContainsSpecialGoods === null ||
      (this.bookingObj.isContainsSpecialGoods && !this.bookingObj.containsSpecialGoodsTypes)
    ) {
      this.message.info('Please complete the data');
      isTrue = false;
    } else if (this.isRepeat) {
      this.message.info('shipName is used');
      isTrue = false;
    } else if (this.isCRM) {
      if (!this.bookingObj.serviceCompanyId) {
        this.message.info('Please complete the data');
        isTrue = false;
      }
    }
    // else if (this.bookingObj.isContainsSpecialGoods && !this.bookingObj.description) {
    //   this.message.info("Please complete the data"); isTrue = false;
    // }
    return isTrue;
  } //??????FBA FBM???????????????

  //??????booking
  // list = [];
  SubmitBooking() {
    //????????????booing
    this.bookingObj.status = bookingStatus.WaitingForPricing;
    this.save();
  }

  //booking???????????????
  Draft() {
    this.bookingObj.status = bookingStatus.Draft;
    this.save(true);
  }

  //????????????
  save(isDraft = false) {
    this.isDraft = isDraft;
    if (isDraft) {
      if (this.bookingObj.tradeType === 1) {
        if (!this.bookingObj.shipperCustomerId || !this.bookingObj.consigneeCustomerId) {
          this.message.info('Please complete the data');
          return;
        }
      } else {
        if (!this.bookingObj.shipperCustomerId) {
          this.message.info('Please complete the data');
          return;
        }
      }
    } else {
      if (!isDraft && !this.yanZheng()) {
        this.isSubmitted = true;
        setTimeout(() => {
          (document.querySelector('.redborder') as any).scrollIntoView({ block: 'end', mode: 'smooth' });
        }, 0);
        return;
      }
    }

    //?????????????????????????????????????????????????????????
    this.cannotDeactivate = false;
    if (this.TemplateId) {
      this.bookingObj.bookingTemplateId = this.TemplateId;
    }
    //?????????????????????????????????
    // if (this.bookingObj.tradeType != 1) this.PackingListComponent.submitverificationForm();
    // if (!this.verificationPassed && this.bookingObj.tradeType != 1) {
    //   this.isSubmitted = true;
    //   setTimeout(() => {
    //     (document.querySelector('.table-red') as any).scrollIntoView({ block: 'end', mode: 'smooth' });
    //   }, 0);
    //   return;
    // }
    //???????????????
    this.bookingObj.packingLists = [];
    this.cusClearanceInvoicesGroup.forEach((c) => {
      this.bookingObj.packingLists = this.bookingObj.packingLists.concat(c.pageList);
    });
    //??????????????????
    this.bookingObj.containerType = JSON.stringify(this.containList);
    // ??????
    this.bookingObj.customsDeclarationDocumentIds = this.files.map((o) => o.fileId);
    //cuhlishijianduan
    if (this.bookingObj.deliveryMethodType == 0) this.bookingObj.pickUpTimeRange = null;
    else this.bookingObj.deliveryTimeRange = null;
    if (isDraft) {
      this.submittingDraft = true;
    } else {
      this.submitting = true;
    }
    if (this.bookingObj.tradeType != 1) {
      this.bookingObj.consigneeCustomerId = null;
    }

    this.bookingObj.packingProducts = this.newPackingListComponent.datas?.products;
    this.bookingObj.packingCartons = this.newPackingListComponent.datas?.cartons;
    delete this.bookingObj.quantityUnitId;
    delete this.bookingObj.quantityUnitString;
    delete this.bookingObj.volumeUnitId;
    delete this.bookingObj.volumeUnitString;
    delete this.bookingObj.weightUnitId;
    delete this.bookingObj.weightUnitString;
    this.bookingCheck().then((d) => {
      if (!this.isRepeat) {
        if (!this.bookingObj.id) {
          this.cspBookingService
            .create(this.bookingObj as any)
            .pipe(
              finalize(() => {
                this.submitting = false;
                this.submittingDraft = false;
              }),
            )
            .subscribe(
              (res) => {
                this.message.success(this.translate.instant('Successful operation'));
                this.$close();
                this.router.navigate(['/crm/bookings']);
              },
              (error) => {
                this.modalService.confirm({
                  nzTitle: '<i>There was a problem uploading  this request. Please check your internet connection and try again</i>',
                  nzContent: '<b></b>',
                  nzOkText: 'Retry',
                  nzOnOk: () => {
                    this.save();
                  }, //????????????
                });
              },
            );
        } else {
          this.cspBookingService
            .update(this.bookingObj as any)
            .pipe(
              finalize(() => {
                this.submitting = false;
                this.submittingDraft = false;
              }),
            )
            .subscribe(
              (res) => {
                this.message.success(this.translate.instant('Successful operation'));
                if (this.isCRM) {
                  this.router.navigate(['/crm/bookings']);
                } else {
                  this.router.navigate(['/bookings']);
                }
              },
              (error) => {
                this.modalService.confirm({
                  nzTitle: '<i>There was a problem uploading  this request. Please check your internet connection and try again</i>',
                  nzContent: '<b></b>',
                  nzOkText: 'Retry',
                  nzOnOk: () => {
                    this.save();
                  }, //????????????
                });
              },
            );
        }
      } else {
        this.message.info(this.translate.instant('shipName is used'));
        this.submitting = false;
        this.submittingDraft = false;
      }
    });
  }

  recentlyUsed: RecentlyUsed;

  //?????????????????????
  GetRecentlyUsed(tradeType: 0 | 1 | 2 | 3) {
    if (this.isCRM) {
      this.portOriginsearch('', this.bookingObj.originPortId);
      this.portDesinationsearch('', this.bookingObj.destinationPortId);
      this.onAmazonSearch('', this.bookingObj.destinationAddressId);
    } else {
      this.cspBookingService.getRecentlyUsed({ tradeType, freightMethodType: this.bookingObj.freightMethodType }).subscribe((res: any) => {
        this.recentlyUsed = res;
        this.portOriginsearch('', this.bookingObj.originPortId);
        this.portDesinationsearch('', this.bookingObj.destinationPortId);
        this.onAmazonSearch('', this.bookingObj.destinationAddressId);

        if (!res.recentBooking) {
          return;
        }
        const recentBooking = res.recentBooking;

        switch (tradeType) {
          case 1:
            if (this.isTemplate != 'true') {
              //?????????????????????????????????????????????????????????
              this.bookingObj.shipperCustomerId = this.bookingObj.shipperCustomerId || recentBooking.shipperCustomerId;

              this.bookingObj.consigneeCustomerId = this.bookingObj.consigneeCustomerId || recentBooking.consigneeCustomerId;

              this.bookingObj.consigneePartnerId = this.bookingObj.consigneePartnerId || recentBooking.consigneePartnerId;
            }
            this.getAllCompanyContact({ customerId: this.bookingObj.shipperCustomerId }, 1);
            this.getAllCompanyContact({ customerId: this.bookingObj.consigneeCustomerId }, 2);

            break;
          case 2:
          case 3:
            if (this.isTemplate != 'true') {
              //?????????????????????????????????????????????????????????  this.isTemplate == 'true'????????????????????????
              this.bookingObj.shipperCustomerId = this.bookingObj.shipperCustomerId || recentBooking.shipperCustomerId;
              this.bookingObj.originAddressId = this.bookingObj.originAddressId || recentBooking.originAddressId;
            }

            this.getAllCompanyContact({ customerId: this.bookingObj.shipperCustomerId }, 1);
            this.amazonList = this.recentlyUsed.fbaAddresses;
            if (tradeType === 3 && this.isTemplate != 'true') {
              //?????????????????????????????????????????????????????????
              this.bookingObj.destinationAddressId = this.bookingObj.destinationAddressId || recentBooking.destinationAddressId;
            }
            break;
          default:
        }
        if (!this.defaultShipperId) {
          this.defaultShipperId = this.bookingObj.shipperPartnerId || this.bookingObj.shipperCustomerId;
        }
        if (!this.defaultConsigneeId) {
          this.defaultConsigneeId = this.bookingObj.consigneePartnerId || this.bookingObj.consigneeCustomerId;
        }
      });
    }
  }

  useRecently(recentlObj) {
    this.bookingObj.fbaFreightMethodId = recentlObj.fbaFreightMethodId;
    this.bookingObj.channelId = recentlObj.channelId;
    this.getChannel();
    this.bookingObj.isTaxIncluded = recentlObj.isTaxIncluded;
  }

  //????????????
  channelList: Array<any> = new Array<any>();

  getChannel() {
    if (!this.bookingObj.freightMethodType) return;

    this.cspBookingService.getChannelList({ freightMethodType: this.bookingObj.freightMethodType }).subscribe(
      (res: any) => {
        this.channelList = res.items;
      },
      (error) => {
        this.message.error('Data loading failed');
      },
    );
  }

  //???????????????????????????
  GetBookingForUpdate(id: string) {
    return this.cspBookingService.get({ id }).pipe(
      tap((res: any) => {
        this.bookingObj = res;
        this.getQuoteNo(this.bookingObj.quoteNo);
        this.defaultShipperId = this.bookingObj.shipperPartnerId || this.bookingObj.shipperCustomerId;
        this.defaultConsigneeId = this.bookingObj.consigneePartnerId || this.bookingObj.consigneeCustomerId;
        if (this.DetailId) {
          //????????????????????????

          this.bookingObj.id = null;
          this.bookingObj.name = null;
          this.bookingObj.quoteEnquiryId = null;
          this.bookingObj.purchaseOrderIds = [];
          this.bookingObj.bookingNo = null;
          this.bookingObj.serviceCompanyId = null;
          this.bookingObj.weightUnitCode = this.WeightUnitCode.KGS;
          this.bookingObj.volumeUnitCode = this.VolumeUnitCode.CBM;
          this.bookingObj.cusClearanceInvoices.forEach((c) => (c.id = null));
          this.bookingObj.packingLists.forEach((c) => {
            c.id = null;
            c.packingListItems.forEach((c) => (c.id = null));
          });
        }
        //???????????????????????????
        this.handleEditInfo();
      }),
    );
  }

  //???booking?????????????????????????????????
  GetBookingInfoByTemplate(id?: string) {
    this.cspBookingTemplateService.getDetailById({ id }).subscribe((res: any) => {
      if (res) {
        this.bookingObj = res;
        this.bookingObj.name = '';
        this.bookingObj.id = null;
        this.bookingObj.isContainsSpecialGoods = res.isContainsSpecialGoods;
        this.bookingObj.cargoReadyDate = null; //??????????????????
        this.bookingObj.weightUnitCode = this.WeightUnitCode.KGS;
        this.bookingObj.volumeUnitCode = this.VolumeUnitCode.CBM;
        this.bookingObj.freightMethodType = this.bookingObj.freightMethodType || FreightMethodType.Ocean;
        this.bookingObj.quantityUnitCode = this.bookingObj.quantityUnitCode || 'ctn';
        this.bookingObj.unitConvertType = 0;
        this.bookingObj.cusClearanceInvoices = [];
        this.isShowTemplate = false;
        this.tradeTypeChange(this.bookingObj.tradeType);
      }
      //???????????????????????????
      this.handleEditInfo();
    });
  }

  //????????????????????????
  handleEditInfo() {
    if (!this.bookingObj) return;
    if (this.bookingObj.tradeType) this.GetIncotermsByTradeType(this.bookingObj.tradeType);
    //????????????
    if (this.bookingObj.containerType) this.containList = JSON.parse(this.bookingObj.containerType);
    if (this.bookingObj.containsSpecialGoodsTypes) this.specialgoodsList = JSON.parse(this.bookingObj.containsSpecialGoodsTypes);
    if (this.bookingObj.purchaseOrderIds) {
      this.nameList = this.bookingObj.purchaseOrderIds;
    }
    this.specialgoodsList.forEach((c) => {
      this.dictionaryList.forEach((b) => {
        if (c.id == b.id) b.checked = true;
      });
    });
    this.searchFile(1);
  }

  create(fileId: string, fileName: string, extensionName: string) {
    this.cspAttachmentService
      .create({
        isToIcp: true,
        businessId: this.BusinessId,
        businessType: this.BusinessType,
        attachmentType: 1,
        fileId: fileId,
        fileName: fileName,
        extensionName: extensionName,
        // id: abp.session.user.id
      })
      .subscribe(
        (res: any) => {
          if (this.isEdit === 'true') {
            this.searchFile(1);
          } else {
            this.files.push(...res.items);
          }
        },
        (error) => {
          this.searchFile(1);
          console.error('Attachment File Insert DB Error', error);
        },
      );
  }

  //???????????????
  customReq = (item: UploadXHRArgs) => {
    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('id', new Date().getTime().toString());

    this._httpClient.post(item.action!, formData).subscribe(
      (res: any) => {
        this.create(res.fileId, res.fileName, res.extensionName);
      },
      (error) => {
        console.error(error);
      },
    );

    const req = new HttpRequest('POST', item.action!, formData, {
      reportProgress: true,
      withCredentials: true,
    });
  };
  files: Array<any> = new Array<any>();

  searchFile(type: AttachmentType) {
    if (!this.BusinessId) return;
    this.files = [];
    this.cspAttachmentService.getList({ businessId: this.BusinessId, businessType: this.BusinessType, attachmentType: type }).subscribe(
      (res: any) => {
        let list = res;
        if (list.length > 0) {
          list.forEach((element) => {
            this.files.push({
              id: element.id,
              name: element.fileName + '.' + element.extensionName,
              updateBy: element.uploadBy,
              updateTime: element.creationTime,
              fileId: element.fileId,
              downFileUrl: this.uploadUrl + `/Storage/File/GetDownLoadFile?FileId=${element.fileId}&Handler=raw`,
            });
          });
        }
      },
      (error) => {
        console.error('File error', error);
      },
    );
  }

  /**
   * ????????????
   * @param file ??????
   */
  deleteFile(file) {
    this.cspAttachmentService.delete({ id: file.id }).subscribe((res) => {
      this.searchFile(1);
    });
  }

  deleteAllFiles() {
    this.files.forEach((file) => {
      this.cspAttachmentService.delete({ id: file.id }).subscribe((res) => {});
    });
    this.files = [];
  }

  changeUnitCode(event: any) {
    switch (event) {
      case WeightUnitCode.LBS:
        this.bookingObj.volumeUnitCode = VolumeUnitCode.CFT;
        break;
      case WeightUnitCode.KGS:
        this.bookingObj.volumeUnitCode = VolumeUnitCode.CBM;
        break;
      case VolumeUnitCode.CFT:
        this.bookingObj.weightUnitCode = WeightUnitCode.LBS;
        break;
      case VolumeUnitCode.CBM:
        this.bookingObj.weightUnitCode = WeightUnitCode.KGS;
        break;
      default:
        break;
    }
  }

  getCurrentCustomer() {
    this.crmCustomerExternalService.get({ id: this.sessionService.data.session.user.customerId }).subscribe((result: any) => {
      this.currentCustomer = result;
    });
  }

  onChannelChange(id: string) {
    const $event = this.channelList.find((o) => o.channelId === id);
    this.bookingObj.fbaFreightMethodId = $event.fbaFreightMethodId;
    this.bookingObj.isTaxIncluded = $event.isTaxIncluded;
  }

  // ????????????
  getByPlaceOrLocation() {
    this.platformCompanyConfigureService.getByPlaceOrLocation({}).subscribe((res: any) => {
      this.operationPortlist = res.items;
    });
  }

  // ????????????
  filterData(event, type) {
    if (this.isCRM) {
      if (this.bookingObj.tradeType === 3) {
        if (this.customerAndPartnerList.length > 0) {
          this.shipperList = this.customerAndPartnerList.filter((item) => {
            return !item.partnerId; // CRM  FBM  ???????????????
          });
        }
      } else {
        if (!event) {
          this.shipperList = [...this.customerAndPartnerList];
          this.consigneeList = [...this.customerAndPartnerList];
        } else {
          let dataList = [];
          dataList = this.customerAndPartnerList.filter((item) => {
            if (event.partnerId) {
              //?????????????????????????????? ????????????????????????????????????
              return item.customerId === event.partnerCustomerId;
            }
            if (!event.partnerId) {
              // ???????????????????????? ??????????????????????????????
              return item.partnerCustomerId === event.customerId;
            }
          });
          // ?????????
          if (type === 1) {
            if (event.partnerId) {
              // ?????????????????????????????????  ????????????????????????
              this.consigneeList = dataList.filter((item) => {
                return item.partnerId === null;
              });
            } else {
              // ???????????????????????????  ??????????????????????????????
              this.consigneeList = dataList.filter((item) => {
                return item.partnerId !== null;
              });
            }
            if (this.consigneeList.length <= 0) {
              this.bookingObj.consigneeCustomerId = null;
              this.defaultConsigneeId = null;
            } else {
              this.consigneeList.forEach((element) => {
                if (element.partnerId !== this.defaultConsigneeId && element.customerId !== this.defaultConsigneeId) {
                  this.defaultConsigneeId = null;
                }
              });
            }
          } else {
            if (event.partnerId) {
              this.shipperList = dataList.filter((item) => {
                return item.partnerId === null;
              });
            } else {
              this.shipperList = dataList.filter((item) => {
                return item.partnerId !== null;
              });
            }
            if (this.shipperList.length <= 0) {
              this.bookingObj.shipperCustomerId = null;
              this.defaultShipperId = null;
            } else {
              this.shipperList.forEach((element) => {
                if (element.partnerId !== this.defaultShipperId && element.customerId !== this.defaultShipperId) {
                  this.defaultShipperId = null;
                }
              });
            }
          }
        }
      }
    }
  }

  coOnClosing() {
    return new Promise((resolve) => {
      this.modalService.confirm({
        nzContent: this.$L('Whether to leave or not'),
        nzOnOk: () => {
          resolve(true);
        },
      });
    });
  }
}
