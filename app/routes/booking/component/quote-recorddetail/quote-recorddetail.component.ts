import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';
import { groupBy } from 'lodash';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { CRMQuoteEnquiryService, CRMQuoteEnquiryDto, CRMCustomerService } from 'apps/crm/app/services/crm';
import { PUBChargingCodeService, PUBCurrencyService } from '@co/cds';
import { Observable } from 'rxjs';
import { CSPBookingService } from 'apps/crm/app/services/csp';
import { FreightMethodType } from '../../../../shared/types/booking/FreightMethodType';
import { quoteReplys } from '../../../../shared/compoents/booking/class/quoteEntity';
import { QuoteSimpleInfoComponent } from '../../../quotes/component/quote-simple-info/quote-simple-info.component';

@Component({
  selector: 'booking-quote-recorddetail',
  templateUrl: './quote-recorddetail.component.html',
  styleUrls: ['./quote-recorddetail.component.less'],
})
export class QuoteRecorddetailComponent implements OnInit {
  //基础费用
  basiccost: any[] = [{}];
  //目的地费用
  endplace: any[] = [{ NO: 1 }];
  //起始地费用
  startingplace: any[] = [{ NO: 1 }];
  _quoteinfo: CRMQuoteEnquiryDto = {}; //询价实体
  @Input() isShowtab = false;
  @Input() bookingId: string;
  @Input() set quoteinfo(data: any) {
    this._quoteinfo = data;
    this.quote_copy = data;
    if (this.quote_copy.containerType) this.containHavedataList = JSON.parse(this.quote_copy.containerType);
    this.containHavedataList = this.containHavedataList.filter((c) => c.value > 0);
  }
  freightMethodTypeValue: typeof FreightMethodType = FreightMethodType;
  selectIndex = 0;
  @Input() relateQuotelist: Array<any> = [];
  @Input() filterrelateQuotelist: Array<any> = [];
  @ViewChild('basicData') basicData: NgForm;
  @ViewChild('startingplacData') startingplacData: NgForm;
  @ViewChild('endplaceplacData') endplaceplacData: NgForm;
  @ViewChild('formData') formData: NgForm;
  @ViewChild('vaildDate') vaildDate: NgForm;
  @ViewChild('personData') personData: NgForm;
  emptyGuid = '00000000-0000-0000-0000-000000000000';
  @Output() selSelectIndex = new EventEmitter<number>();
  releteStatus: boolean = false;
  constructor(
    private crmCustomerService: CRMCustomerService,
    private crmQuoteEnquiryService: CRMQuoteEnquiryService,
    private pubChargingCodeService: PUBChargingCodeService,
    private pubCurrencyService: PUBCurrencyService,
    private cspBookingService: CSPBookingService,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    this.getCarrierList();
    this.getAirList();
    this.getAllCurrency();
    this.getCostAll({});
    this.GetCustomerBindUserForCRM(this.bookingId);
  }

  selIndex(event: any) {
    this.selSelectIndex.emit(event.index);
  }

  customerList: any[] = [];
  contacts: any[] = [];
  GetCustomerBindUserForCRM(Id: string) {
    this.cspBookingService
      .getCustomerBindUserForCRM({
        id: Id,
      })
      .subscribe((res) => {
        this.customerList = res.list;
        this._quoteinfo.ownerCustomerId = res.customerId;
        this.selCustomer(this._quoteinfo.ownerCustomerId);
        if (res.userId == 0) this._quoteinfo.ownerUserId = null;
        else this._quoteinfo.ownerUserId = res.userId;
      });
  }

  isSelSameCustomer: boolean = false;
  selCustomer(event: any) {
    //重新选中之后将接收人清空
    this._quoteinfo.ownerUserId = null;
    if (this._quoteinfo.ownerCustomerId == event) this.isSelSameCustomer = true;
    else this.isSelSameCustomer = false;
    let customerobj = this.customerList.filter((c) => c.id == event);
    if (customerobj) {
      this.contacts = customerobj[0].contacts;
    }
  }

  isSelSameContact: boolean = false;
  selContacts(event: any) {
    if (this._quoteinfo.ownerUserId == event) this.isSelSameContact = true;
    else this.isSelSameContact = false;
  }

  //复制
  quote_copy: CRMQuoteEnquiryDto = {};
  //最终有数据的箱型
  containHavedataList: Array<any> = [];
  copy(data) {
    this.crmQuoteEnquiryService.getForCRM({ id: data.id }).subscribe((res) => {
      //获取详情
      this.quote_copy = res;
      if (this.quote_copy.containerType) this.containHavedataList = JSON.parse(this.quote_copy.containerType);
      this.containHavedataList = this.containHavedataList.filter((c) => c.value > 0);
      this.copyData(this.quote_copy);
    });
  }

  //复制询报价
  copyData(quoteinfo: any) {
    this.basiccost = [];
    this.startingplace = [];
    this.endplace = [];
    let data = {
      freightList: [],
      DestinationList: [],
      OriginList: [],
      validEndDate: '',
      validStartDate: '',
      transitTime: '',
      carrierId: this.emptyGuid,
      sailSchedule: '',
    };
    if (quoteinfo.quoteReplys.length > 0) {
      data.validEndDate = quoteinfo.quoteReplys[0].validEndDate;
      data.validStartDate = quoteinfo.quoteReplys[0].validStartDate;
      data.transitTime = quoteinfo.quoteReplys[0].transitTime;
      data.carrierId = quoteinfo.quoteReplys[0].carrierId;
      data.sailSchedule = quoteinfo.quoteReplys[0].sailSchedule;
      data.freightList = quoteinfo.quoteReplys[0].quoteReplyItems.filter((c) => c.priceProduceNode == 1);
      data.OriginList = quoteinfo.quoteReplys[0].quoteReplyItems.filter((c) => c.priceProduceNode == 2);
      data.DestinationList = quoteinfo.quoteReplys[0].quoteReplyItems.filter((c) => c.priceProduceNode == 3);
    }
    //1.处理组装报价数据
    //基础费用组装   海运整柜
    //起始地费用组装
    //目的地费用组装
    if (quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && quoteinfo.shipmentType == 0) {
      let unitType = '';
      let currencyId = '';
      if (data.freightList && data.freightList.length > 0) {
        unitType = data.freightList[0].unitType;
        currencyId = data.freightList[0].currencyId;
      }
      let startObj = {
        unitType: unitType,
        currencyId: currencyId,
        validEndDate: data.validEndDate,
        validStartDate: data.validStartDate,
        transitTime: data.transitTime,
        carrierId: data.carrierId,
      };
      if (data.freightList && data.freightList.length > 0) {
        data.freightList.forEach((c) => {
          if (c.unitType == 1) {
            //按箱
            this.containHavedataList.forEach((element) => {
              if (c.containerCode == element.name) {
                startObj[c.containerCode] = c.unitPrice;
              }
            });
          }
        });
      }
      this.basiccost.push(startObj);
      //起始地组装
      let listOfOriginDataGROUP = groupBy(data.OriginList, 'chargingCodeId');
      let originList = this.objToArray(listOfOriginDataGROUP);
      originList.forEach((c) => {
        //5
        if (!c.list[0]) return;
        if (c.list[0].unitType == 1) {
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
      let listOfDestinaDataGROUP = groupBy(data.DestinationList, 'chargingCodeId');
      let destinationList = this.objToArray(listOfDestinaDataGROUP);
      destinationList.forEach((c) => {
        //5
        if (!c.list[0]) return;
        if (c.list[0].unitType == 1) {
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
    }
    //基础费用组装   海运散货 空运散货
    //起始地费用组装
    //目的地费用组装
    if (
      (quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && quoteinfo.shipmentType == 1) ||
      quoteinfo.freightMethodType == this.freightMethodTypeValue.Air
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
          currencyId: c.currencyId,
          carrierId: data.carrierId,
          transitTime: data.transitTime,
          sailSchedule: data.sailSchedule,
          validEndDate: data.validEndDate,
          remark: c.remark,
          validStartDate: data.validStartDate,
        });
      });
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
    }
    if (this.basiccost.length <= 0) this.basiccost = [{}];
    if (this.startingplace.length <= 0) this.startingplace = [{ NO: 1 }];
    if (this.endplace.length <= 0) this.endplace = [{ NO: 1 }];
    this.selectIndex = 1;
    this.selSelectIndex.emit(1);
  }

  //搜索询价
  searchQuote(event: any) {
    if (event) {
      this.relateQuotelist = this.filterrelateQuotelist.filter(
        (c) => c.quoteNo.includes(event) || c.quoteReplys.find((o) => o.replyNo.includes(event)),
      );
    } else {
      this.relateQuotelist = this.filterrelateQuotelist;
    }
  }

  //关联询报价
  releteQuoteInfo: CRMQuoteEnquiryDto = {};
  releteQuote(quoteinfo: any) {
    this.releteQuoteInfo = quoteinfo;
    this._quoteinfo.id = quoteinfo.id;
    this.isShowReleteTab = true;
  }

  isShowReleteTab: boolean = false;
  releteQuoteOk() {
    this.releteStatus = true;
    let isCustomerReceive: boolean = false;
    if (!this.personData.valid) return false;
    if (!this.isSelSameCustomer && !this.isSelSameContact) {
      if (this._quoteinfo.status == 1) isCustomerReceive = true;
      //关联得客户是一样 就是更新
      this.CRMBookingBindQuote(this.bookingId, this._quoteinfo.id, isCustomerReceive);
    } else {
      this._quoteinfo.id = ''; //关联得客户是不一样 就是新增报价
      this.save(this.releteQuoteInfo);
    }
  }

  @ViewChild(QuoteSimpleInfoComponent)
  QuoteSimpleInfoComponent: QuoteSimpleInfoComponent;
  @Output() isClosedRecord = new EventEmitter<boolean>();
  //CRM订舱绑定报价
  CRMBookingBindQuote(bookingId: string, quoteEnquiryId: string, isCustomerReceive: boolean) {
    this.cspBookingService
      .cRMBookingBindQuote({
        bookingId: bookingId,
        quoteEnquiryId: quoteEnquiryId,
        isCustomerReceive: isCustomerReceive,
      })
      .subscribe(
        (res) => {
          this.message.info('关联成功');
          this.isShowReleteTab = false;
          this.isClosedRecord.emit(true);
          this.releteStatus = false;
        },
        (error) => {
          this.message.error('关联失败');
          this.isClosedRecord.emit(false);
          this.releteStatus = false;
        },
      );
  }

  //若关联选择的报价人不是当前登陆人就新增报价
  save(quoteInfo: any) {
    //将所有关联的ID置为0
    quoteInfo.bookngId = this.bookingId;
    quoteInfo.id = this.emptyGuid;
    quoteInfo.quoteReplys.forEach((element) => {
      element.id = this.emptyGuid;
      element.quoteEnquiryId = this.emptyGuid;
      element.quoteReplyItems.forEach((b) => {
        b.id = this.emptyGuid;
        b.quoteReplyId = this.emptyGuid;
      });
    });
    this.crmQuoteEnquiryService.create(quoteInfo).subscribe(
      (c) => {
        this.isSuccessfully.emit(true);
        this.isShowReleteTab = false;
        this.isClosedRecord.emit(true);
        this.releteStatus = false;
      },
      (error) => {
        this.isSuccessfully.emit(false);
        this.isClosedRecord.emit(false);
        this.releteStatus = false;
      },
    );
  }

  //获取船东信息
  carrierList: any[] = [];
  getCarrierList() {
    this.crmCustomerService
      .getCustomerByType({
        customerType: 1,
        sorting: 'code',
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
        customerType: 1,
        sorting: 'code',
      })
      .subscribe((res: any) => {
        this.airList = res.items;
      });
  }

  //计费方式选中后计算（空运散货计算）
  calculatetotal(event: any, data: any) {
    if (data.unitPrice) {
      if (event == 1) {
        //实际重量
        data.totalPrice = data.unitPrice * this.quote_copy.weight;
        data.quantity = this.quote_copy.weight;
      } else {
        //计费重量
        data.totalPrice = data.unitPrice * this.quote_copy.volume * 167;
        data.quantity = this.quote_copy.volume * 167;
      }
    }
  }

  //海运散货计算
  bulkcargo(event: any, data: any) {
    if (data.unitPrice && data.unitType && data.computeFormula) {
      if (data.unitType == 4 && data.computeFormula == 3) {
        //收费单位是体积 计费方式是实际体积
        data.quantity = this.quote_copy.volume;
        data.totalPrice = data.quantity * data.unitPrice;
      } else if (data.unitType == 4 && data.computeFormula == 4) {
        //收费单位是体积 计费方式是计费吨
        if (this.basiccost[0].computeMode == 1) data.quantity = this.quote_copy.weight / 167;
        else if (this.basiccost[0].computeMode == 2) data.quantity = this.quote_copy.weight / 363;
        else if (this.basiccost[0].computeMode == 3) data.quantity = this.quote_copy.weight / 500;
        else if (this.basiccost[0].computeMode == 4) data.quantity = this.quote_copy.weight / 750;
        else if (this.basiccost[0].computeMode == 5) data.quantity = this.quote_copy.weight / 1000;
        else data.quantity = this.quote_copy.weight / 167;
        data.quantity = Math.round(data.quantity * 1000) / 1000;
        if (data.quantity) data.quantity = data.quantity.toFixed(3);
      } else if (data.unitType == 3 && data.computeFormula == 1) {
        data.quantity = this.quote_copy.weight;
      } else if (data.unitType == 3 && data.computeFormula == 4) {
        if (this.basiccost[0].computeMode == 1) data.quantity = this.quote_copy.volume * 167;
        else data.quantity = this.quote_copy.volume * 167;
      }
      data.totalPrice = data.quantity * data.unitPrice;
      data.totalPrice = Math.round(data.totalPrice * 1000) / 1000;
      if (data.totalPrice) data.totalPrice = data.totalPrice.toFixed(3);
    }
  }

  //对象转数组
  objToArray(list: any) {
    let array = Array<any>();
    for (let key in list) {
      array.push({
        chargeId: key,
        list: list[key],
      });
    }
    return array;
  }

  //获取费用代码信息
  costItemList: any[] = [];
  getCostAll(costObj: { groupId?: string; text?: string; isValid?: boolean }) {
    this.pubChargingCodeService.getAll(costObj).subscribe((res) => {
      this.costItemList = res.items;
    });
  }

  //币别列表
  currencyList: Array<any> = new Array<any>();
  getAllCurrency() {
    this.pubCurrencyService.getAll({}).subscribe((c) => {
      this.currencyList = c.items;
    });
  }

  //日期yanzheng
  //日期验证
  isDateMatch = true;
  //起始地验证费用代码
  isSameChargeCode = false;
  sameIndex: number;
  //目的地验证费用代码
  isSameChargeCodeByEnd = false;
  sameEndIndex: number;
  //新增起始地费用
  tableIndex = 1;
  compareDate(start: Date, end: Date) {
    if (start && end) {
      let num = differenceInCalendarDays(start, end);
      if (num > 0) this.isDateMatch = false;
      else this.isDateMatch = true;
    }
  }

  //校验费用代码
  verificationChargestartplace(event: any, data: any) {
    this.sameIndex = data.NO;
    if (this.startingplace.filter((c) => c.chargingCodeId == event && c.NO != data.NO).length > 0) {
      this.isSameChargeCode = true;
    } else {
      this.isSameChargeCode = false;
    }
  }

  verificationChargeendplace(event: any, data: any) {
    this.sameEndIndex = data.NO;
    if (this.endplace.filter((c) => c.chargingCodeId == event && c.NO != data.NO).length > 0) {
      this.isSameChargeCodeByEnd = true;
    } else {
      this.isSameChargeCodeByEnd = false;
    }
  }

  //清空数据
  clearDate() {
    this.basiccost = [{}];
    this.endplace = [{}, {}];
    this.startingplace = [{}, {}];
  }

  //删除起始地费用
  deleteOrigin(index: number) {
    if (index > 0) this.startingplace.splice(index, 1);
  }

  deleteDestination(index: number) {
    if (index > 0) this.endplace.splice(index, 1);
  }

  addOrigin() {
    let i = this.startingplace.length > 0 ? this.startingplace.length : this.tableIndex;
    i++;
    this.startingplace.push({ NO: i });
  }

  addDestination() {
    let i = this.endplace.length > 0 ? this.endplace.length : this.tableIndex;
    i++;
    this.endplace.push({ NO: i });
  }

  trackByIndex(index: number) {
    return index;
  }

  //创建create
  @Output() isSuccessfully = new EventEmitter<boolean>();
  @Output() isClosed = new EventEmitter<boolean>();
  @Output() isQuoteRecordStatus = new EventEmitter<boolean>();
  quoteReplys: quoteReplys = {
    quoteReplyItems: [],
  };

  checkContaniner(list: any[]) {
    let even: any;
    if (list.length > 0) {
      even = (element) => element.unitType === 1;
    }
    return list.some(even);
  }

  checkTicket(list: any) {
    if (list.length <= 0) return;
    let even = (element) => element.unitType === 2;
    return list.some(even);
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

  today = new Date();
  //不可用时间
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };

  submit(formData: any): Observable<any> {
    for (const i in formData.controls) {
      formData.controls[i].markAsDirty();
      formData.controls[i].updateValueAndValidity();
      if (!formData.controls[i].valid) return;
    }
    return null;
  }

  ngSubmit() {
    //触发验证
    //先清空之前得报价值
    this._quoteinfo.quoteReplys = [];
    this.submit(this.basicData);
    this.submit(this.startingplacData);
    this.submit(this.endplaceplacData);
    this.submit(this.vaildDate);
    this.submit(this.formData);
    this.isClosed.emit(true);
    if (
      !this.basicData.valid ||
      !this.startingplacData.valid ||
      !this.endplaceplacData.valid ||
      !this.vaildDate.valid ||
      !this.formData.valid ||
      !this.isDateMatch ||
      this.isSameChargeCode ||
      this.isSameChargeCodeByEnd
    ) {
      this.isClosed.emit(false);
      return false;
    }
    if (!this.basiccost[0].validStartDate || !this.basiccost[0].validEndDate) {
      this.isClosed.emit(false);
      return false;
    }
    this.isQuoteRecordStatus.emit(true);
    this.quoteReplys.carrierId = this.basiccost[0].carrierId;
    this.quoteReplys.quoteEnquiryId = this.quote_copy.id;
    this.quoteReplys.transitTime = this.basiccost[0].transitTime;
    this.quoteReplys.validEndDate = this.basiccost[0].validEndDate;
    this.quoteReplys.validStartDate = this.basiccost[0].validStartDate;
    //判断海运散货 海运整柜 空运散货得报价添加
    if (this.quote_copy.freightMethodType == this.freightMethodTypeValue.Ocean && this.quote_copy.shipmentType == 0) {
      //海运整柜
      this.containHavedataList.forEach((c) => {
        if (this.basiccost[0][c.name]) {
          //基础费用
          this.quoteReplys.quoteReplyItems.push({
            // currencyId: this.basiccost[0].currencyId,
            currencyId: this.emptyGuid,
            unitPrice: this.basiccost[0][c.name],
            priceProduceNode: 1,
            unitType: 1, //整柜默认传箱 单位
            quantity: c.value,
            totalPrice: c.value * this.basiccost[0][c.name],
            containerCode: c.name,
          });
        }
      });
      this.startingplace.forEach((c) => {
        //起始地
        if (c.unitType == 1) {
          //按箱
          this.containHavedataList.forEach((b) => {
            if (c[b.name]) {
              this.quoteReplys.quoteReplyItems.push({
                currencyId: c.currencyId,
                unitPrice: c[b.name],
                priceProduceNode: 2,
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
              priceProduceNode: 2,
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
        if (c.unitType == 1) {
          //按箱
          this.containHavedataList.forEach((b) => {
            if (c[b.name]) {
              this.quoteReplys.quoteReplyItems.push({
                currencyId: c.currencyId,
                unitPrice: c[b.name],
                priceProduceNode: 3,
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
              priceProduceNode: 3,
              unitType: c.unitType,
              chargingCodeId: c.chargingCodeId,
              quantity: 1,
              totalPrice: 1 * c.unitPrice,
              remark: c.remark,
            });
        }
      });
    }
    if (this.quote_copy.freightMethodType == this.freightMethodTypeValue.Ocean && this.quote_copy.shipmentType == 1) {
      //海运散货
      this.quoteReplys.sailSchedule = this.basiccost[0].sailSchedule;
      this.quoteReplys.quoteReplyItems.push({
        unitPrice: this.basiccost[0].unitPrice,
        currencyId: this.basiccost[0].currencyId,
        unitType: this.basiccost[0].unitType,
        priceProduceNode: 1,
        totalPrice: this.basiccost[0].totalPrice,
        computeMode: this.basiccost[0].computeMode,
        computeFormula: this.basiccost[0].computeFormula,
        remark: this.basiccost[0].remark,
        // sailSchedule: this.basiccost[0].sailSchedule,
        quantity: this.basiccost[0].quantity,
      });

      this.startingplace.forEach((c) => {
        //起始地
        if (c.unitType == 2) {
          //票
          c.quantity = 1;
        } else if (c.unitType == 3) {
          //重量

          c.quantity = this.quote_copy.weight;
        } else if (c.unitType == 4) {
          //体积
          c.quantity = this.quote_copy.volume;
        }
        if (c.unitPrice) {
          this.quoteReplys.quoteReplyItems.push({
            currencyId: c.currencyId,
            unitPrice: c.unitPrice,
            priceProduceNode: 2,
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
        if (c.unitType == 2) {
          //票
          c.quantity = 1;
        } else if (c.unitType == 3) {
          //重量
          c.quantity = this.quote_copy.weight;
        } else if (c.unitType == 4) {
          //体积
          c.quantity = this.quote_copy.volume;
        }
        if (c.unitPrice) {
          this.quoteReplys.quoteReplyItems.push({
            currencyId: c.currencyId,
            unitPrice: c.unitPrice,
            priceProduceNode: 3,
            unitType: c.unitType,
            chargingCodeId: c.chargingCodeId,
            quantity: c.quantity,
            totalPrice: c.quantity * c.unitPrice,
            remark: c.remark,
          });
        }
      });
    }
    if (this.quote_copy.freightMethodType == this.freightMethodTypeValue.Air) {
      //空运散货
      this.quoteReplys.quoteReplyItems.push({
        unitPrice: this.basiccost[0].unitPrice,
        currencyId: this.basiccost[0].currencyId,
        unitType: 3, //写死
        priceProduceNode: 1,
        totalPrice: this.basiccost[0].totalPrice,
        computeMode: this.basiccost[0].computeMode,
        computeFormula: this.basiccost[0].computeFormula,
        quantity: this.basiccost[0].quantity,
        remark: this.basiccost[0].remark,
      });
      this.startingplace.forEach((c) => {
        //起始地
        if (c.unitType == 2) {
          //票
          c.quantity = 1;
        } else if (c.unitType == 3) {
          //重量

          c.quantity = this.quote_copy.weight;
        } else if (c.unitType == 4) {
          //体积
          c.quantity = this.quote_copy.volume;
        }
        if (c.unitPrice) {
          this.quoteReplys.quoteReplyItems.push({
            currencyId: c.currencyId,
            unitPrice: c.unitPrice,
            priceProduceNode: 2,
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
        if (c.unitType == 2) {
          //票
          c.quantity = 1;
        } else if (c.unitType == 3) {
          //重量

          c.quantity = this.quote_copy.weight;
        } else if (c.unitType == 4) {
          //体积
          c.quantity = this.quote_copy.volume;
        }
        if (c.unitPrice) {
          this.quoteReplys.quoteReplyItems.push({
            currencyId: c.currencyId,
            unitPrice: c.unitPrice,
            priceProduceNode: 3,
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
    this._quoteinfo.bookngId = this.bookingId;
    this._quoteinfo.quoteReplys.push(this.quoteReplys);
    this.crmQuoteEnquiryService.create(this._quoteinfo).subscribe(
      (c) => {
        this.isSuccessfully.emit(true);
        this.isQuoteRecordStatus.emit(false);
      },
      (error) => {
        this.isSuccessfully.emit(false);
      },
    );
  }
}
