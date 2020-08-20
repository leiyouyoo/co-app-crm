import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { differenceInCalendarDays } from 'date-fns';
import { FreightMethodType } from '../../../../shared/types/booking/FreightMethodType';
import { PUBChargingCodeService, PUBCurrencyService } from '@co/cds';
import { CRMCustomerService, CRMQuoteReplyService, CRMQuoteReplyDto } from 'apps/crm/app/services/crm';
import { CSPBookingService } from 'apps/crm/app/services/csp';
import { Observable } from 'rxjs';

@Component({
  selector: 'booking-updatequotes',
  templateUrl: './updatequotes.component.html',
  styleUrls: ['./updatequotes.component.less'],
})
export class UpdatequotesComponent implements OnInit {
  _quoteinfo: any = {}; //询价实体
  quoteReplys: CRMQuoteReplyDto;
  @Input() bookingId: string;
  @Input() set quoteinfo(data: any) {
    this._quoteinfo = data;
    if (this._quoteinfo.containerType) {
      let list = JSON.parse(this._quoteinfo.containerType);
      this.containHavedataList = list.filter((c) => c.value > 0);
    }
  }
  constructor(
    private pubChargingCodeService: PUBChargingCodeService,
    private pubCurrencyService: PUBCurrencyService,
    private crmCustomerService: CRMCustomerService,
    private cspBookingService: CSPBookingService,
    private crmQuoteReplyService: CRMQuoteReplyService,
  ) {}

  //基础费用
  basiccost: any[] = [{}];
  //目的地费用
  endplace: any[] = [{ NO: 1 }];
  //起始地费用
  startingplace: any[] = [{ NO: 1 }];
  //显示其他箱型
  isShowOtherContainer = false;
  dateFormat = 'yyyy/MM/dd';
  carrierList: any[] = [];
  @ViewChild('basicData', { static: true }) basicData: NgForm;
  @ViewChild('startingplacData', { static: true }) startingplacData: NgForm;
  @ViewChild('endplaceplacData', { static: true }) endplaceplacData: NgForm;
  @ViewChild('vaildDate', { static: true }) vaildDate: NgForm;
  @Output() isSuccessfully = new EventEmitter<any>();
  @Output() isClosed = new EventEmitter<boolean>();
  @Output() isUpdateQuoteStatus = new EventEmitter<boolean>();
  //最终有数据的箱型
  containHavedataList: Array<any> = [];
  costItemList: any[] = [];
  //币别列表
  currencyList: Array<any> = new Array<any>();
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
  freightMethodTypeValue: typeof FreightMethodType = FreightMethodType;
  emptyGuid = '00000000-0000-0000-0000-000000000000';
  ngOnInit() {
    this.getAllCurrency();
    this.getCarrierList();
    this.getAirList();
    this.getCostAll({});
    if (this.bookingId) {
      this.GetCustomerBindUserForCRM(this.bookingId);
    }
  }
  //获取费用代码信息
  getCostAll(costObj: { GroupId?: number; Text?: string; isValid?: boolean }) {
    this.pubChargingCodeService.getAll(costObj).subscribe((res) => {
      this.costItemList = res.items;
    });
  }

  //获取币别
  getAllCurrency() {
    this.pubCurrencyService.getAll({}).subscribe((c) => {
      this.currencyList = c.items;
    });
  }

  //获取船东信息
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
        customerType: 2,
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
  bulkcargo(event: any, data: any) {
    if (data.unitPrice && data.unitType && data.computeFormula) {
      if (data.unitType == 4 && data.computeFormula == 3) {
        //收费单位是体积 计费方式是实际体积
        data.quantity = this._quoteinfo.volume;
        data.totalPrice = data.quantity * data.unitPrice;
      } else if (data.unitType == 4 && data.computeFormula == 4) {
        //收费单位是体积 计费方式是计费吨
        if (this.basiccost[0].computeMode == 1) data.quantity = this._quoteinfo.weight / 167;
        else if (this.basiccost[0].computeMode == 2) data.quantity = this._quoteinfo.weight / 363;
        else if (this.basiccost[0].computeMode == 3) data.quantity = this._quoteinfo.weight / 500;
        else if (this.basiccost[0].computeMode == 4) data.quantity = this._quoteinfo.weight / 750;
        else if (this.basiccost[0].computeMode == 5) data.quantity = this._quoteinfo.weight / 1000;
        else data.quantity = this._quoteinfo.weight / 167;
        data.quantity = Math.round(data.quantity * 1000) / 1000;
        if (data.quantity) data.quantity = data.quantity.toFixed(3);
      } else if (data.unitType == 3 && data.computeFormula == 1) {
        data.quantity = this._quoteinfo.weight;
      } else if (data.unitType == 3 && data.computeFormula == 4) {
        if (this.basiccost[0].computeMode == 1) data.quantity = this._quoteinfo.volume * 167;
        else data.quantity = this._quoteinfo.volume * 167;
      }
      data.totalPrice = data.quantity * data.unitPrice;
      data.totalPrice = Math.round(data.totalPrice * 1000) / 1000;
      if (data.totalPrice) data.totalPrice = data.totalPrice.toFixed(3);
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

  compareDate(start: Date, end: Date) {
    if (start && end) {
      let num = differenceInCalendarDays(start, end);
      if (num > 0) this.isDateMatch = false;
      else this.isDateMatch = true;
    }
  }

  today = new Date();
  //不可用时间
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) < 0;
  };
  //清空数据
  clearDate() {
    this.basiccost = [{}];
    this.endplace = [{}, {}];
    this.startingplace = [{}, {}];
  }

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

  //删除起始地费用
  deleteOrigin(index: number) {
    if (this.startingplace.length > 0) this.startingplace.splice(index, 1);
  }

  deleteDestination(index: number) {
    if (this.endplace.length > 0) this.endplace.splice(index, 1);
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

  customerList: any[] = [];
  contacts: any[] = [];
  GetCustomerBindUserForCRM(Id: string) {
    this.cspBookingService
      .getCustomerBindUserForCRM({
        id: Id,
      })
      .subscribe((res) => {
        this.customerList = res.list;
        this.contacts = res.list[0].contacts;
        this._quoteinfo.ownerCustomerId = res.customerId;
        this._quoteinfo.ownerUserId = res.userId;
      });
  }

  selCustomer(event: any) {
    let customerobj = this.customerList.filter((c) => c.id == event);
    if (customerobj) {
      this.contacts = customerobj[0].contacts;
    }
  }

  submit(formData: any): Observable<any> {
    for (const i in formData.controls) {
      formData.controls[i].markAsDirty();
      formData.controls[i].updateValueAndValidity();
      if (!formData.controls[i].valid) return;
    }
    return null;
  }

  //创建create
  ngSubmit() {
    //触发验证
    //先清空之前得报价值
    this._quoteinfo.quoteReplys = [];
    this.submit(this.basicData);
    this.submit(this.startingplacData);
    this.submit(this.endplaceplacData);
    this.submit(this.vaildDate);
    this.isClosed.emit(true);
    if (
      !this.basicData.valid ||
      !this.startingplacData.valid ||
      !this.endplaceplacData.valid ||
      !this.vaildDate.valid ||
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
    this.isUpdateQuoteStatus.emit(true);
    this.quoteReplys.quoteEnquiryId = this._quoteinfo.id;
    this.quoteReplys.carrierId = this.basiccost[0].carrierId;
    this.quoteReplys.transitTime = this.basiccost[0].transitTime;
    this.quoteReplys.validEndDate = this.basiccost[0].validEndDate;
    this.quoteReplys.validStartDate = this.basiccost[0].validStartDate;
    //判断海运散货 海运整柜 空运散货得报价添加
    if (this._quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this._quoteinfo.shipmentType == 0) {
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
    if (this._quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this._quoteinfo.shipmentType == 1) {
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
        quantity: this.basiccost[0].quantity,
      });

      this.startingplace.forEach((c) => {
        //起始地
        if (c.unitType == 2) {
          //票
          c.quantity = 1;
        } else if (c.unitType == 3) {
          //重量

          c.quantity = this._quoteinfo.weight;
        } else if (c.unitType == 4) {
          //体积
          c.quantity = this._quoteinfo.volume;
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
          c.quantity = this._quoteinfo.weight;
        } else if (c.unitType == 4) {
          //体积
          c.quantity = this._quoteinfo.volume;
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
    if (this._quoteinfo.freightMethodType == this.freightMethodTypeValue.Air) {
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

          c.quantity = this._quoteinfo.weight;
        } else if (c.unitType == 4) {
          //体积
          c.quantity = this._quoteinfo.volume;
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

          c.quantity = this._quoteinfo.weight;
        } else if (c.unitType == 4) {
          //体积
          c.quantity = this._quoteinfo.volume;
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
    // this._quoteinfo.quoteReplys.push(this.quoteReplys);
    this.crmQuoteReplyService.create(this.quoteReplys).subscribe(
      (c) => {
        this.isSuccessfully.emit(true);
        this.isUpdateQuoteStatus.emit(false);
      },
      (error) => {
        this.isSuccessfully.emit(false);
      },
    );
  }
}
