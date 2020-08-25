import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { QuotesService } from '../../service/quotes.service';
import { NgForm } from '@angular/forms';
import { groupBy } from 'lodash';
import { FreightMethodType, unitType, priceProduceNode } from '../../enum/quoteState';
import { Observable } from 'rxjs';
import { HandlequotesComponent } from '../handlequotes/handlequotes.component';

@Component({
  selector: 'quotes-quotesrecord',
  templateUrl: './quotesrecord.component.html',
  styleUrls: ['./quotesrecord.component.less'],
})
export class QuotesrecordComponent implements OnInit {
  @Input() set quoteId(value: string) {
    this._quoteId = value;
    this.loading = true;
    this.getQuotesDetail(this._quoteId).subscribe((c) => {
      this.quoteinfo = c;
      if (this.quoteinfo.containerType) this.containHavedataList = JSON.parse(this.quoteinfo.containerType);
      this.containHavedataList = this.containHavedataList.filter((c) => c.value > 0);
      this.getAllRecordForCRM(this._quoteId);
    });
  }
  freightMethodTypeValue: typeof FreightMethodType = FreightMethodType;

  constructor(private quotesService: QuotesService) {}
  isShowFreightList = true;
  isShowOriginList = false;
  isShowDestination = false;
  isShowCustomdutyList = false;
  isShowAddtionalList = false;
  newfreightList: Array<any> = new Array<any>();
  newOriginList: Array<any> = new Array<any>();
  newDestinationList: Array<any> = new Array<any>();
  newOriginRemarkList: Array<any> = new Array<any>();
  newDestinationRemarkList: Array<any> = new Array<any>();
  today = new Date();
  //基础费用
  basiccost: any[] = [{ validDateRange: [this.today] }];
  //目的地费用
  endplace: any[] = [{ NO: 1, unitType: 1 }];
  //起始地费用
  startingplace: any[] = [{ NO: 1, unitType: 1 }];
  //显示其他箱型
  isShowOtherContainer = false;
  dateFormat = 'yyyy/MM/dd';
  carrierList: any[] = [];
  @Output() isSuccessfully = new EventEmitter<boolean>();
  @Output() isQuoteRecordStatus = new EventEmitter<boolean>();
  @Output() isClosed = new EventEmitter<boolean>();
  quoteReplys: any = {
    quoteReplyItems: [],
  };
  //最终有数据的箱型
  containHavedataList: Array<any> = [];
  @Input() isShowtab = false;
  @Input() quoteinfo: any = { quoteReplys: [] };
  _quoteId: string;
  selectIndex = 0;
  @Output() selSelectIndex = new EventEmitter<number>();
  recordlist: any[] = []; //所有报价记录
  newrecordlist: any[] = []; //最新报价记录
  historyrecordlist: any[] = []; //历史报价记录
  hisIndexs: number;
  isshowHisFreight = true;
  isshowHisOrigin = false;
  isshowHisDestina = false;
  costItemList: any[] = [];
  //币别列表
  currencyList: Array<any> = new Array<any>();

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
  emptyGuid = '00000000-0000-0000-0000-000000000000';
  loading: boolean = false;
  @ViewChild(HandlequotesComponent) handlequotesComponent: HandlequotesComponent;
  ngOnInit() {}

  //获取报价记录
  getAllRecordForCRM(id: string) {
    this.quotesService.getAllRecordForCRM(id).subscribe((c) => {
      this.loading = false;
      this.recordlist = c.items;
      if (this.recordlist.length > 0) {
        //最新报价
        this.newrecordlist = this.recordlist.splice(0, 1);
        this.newfreightList = this.newrecordlist[0].quoteReplyItems.filter((c) => c.priceProduceNode == priceProduceNode.Freight);
        this.newOriginList = this.newrecordlist[0].quoteReplyItems.filter((c) => c.priceProduceNode == priceProduceNode.Origin);
        this.newDestinationList = this.newrecordlist[0].quoteReplyItems.filter((c) => c.priceProduceNode == priceProduceNode.Destination);
        this.newOriginRemarkList = this.objToArray(groupBy(this.newOriginList, 'chargingCodeId'));
        this.newDestinationRemarkList = this.objToArray(groupBy(this.newDestinationList, 'chargingCodeId'));
        //历史报价
        this.historyrecordlist = this.recordlist;
        this.historyData(this.historyrecordlist);
      }
    });
  }

  isShowRemark: boolean = false;
  filterRemark(list: any[]) {
    if (list.filter((c) => c.remark != null).length > 0) return true;
    else return false;
  }

  //获取某一个报价详情
  getQuotesDetail(Id: string) {
    return new Observable((ob) => {
      this.quotesService.getQuoteDetail(Id).subscribe((res) => {
        ob.next(res);
        ob.complete();
      });
    });
  }

  //历史报价数据组合
  historyData(list: any[]) {
    list.forEach((c) => {
      c.freightList = c.quoteReplyItems.filter((b) => b.priceProduceNode == priceProduceNode.Freight);
      c.OriginList = c.quoteReplyItems.filter((b) => b.priceProduceNode == priceProduceNode.Origin);
      c.DestinationList = c.quoteReplyItems.filter((b) => b.priceProduceNode == priceProduceNode.Destination);
      c.newOriginRemarkList = this.objToArray(groupBy(c.OriginList, 'chargingCodeId'));
      c.newDestinationRemarkList = this.objToArray(groupBy(c.DestinationList, 'chargingCodeId'));
    });
  }

  showfreight() {
    if (this.isShowFreightList) {
      this.isShowFreightList = false;
    } else {
      this.isShowFreightList = true;
    }
  }

  showOrigin() {
    if (this.isShowOriginList) {
      this.isShowOriginList = false;
    } else {
      this.isShowOriginList = true;
    }
  }

  showDestination() {
    if (this.isShowDestination) {
      this.isShowDestination = false;
    } else {
      this.isShowDestination = true;
    }
  }

  //复制报价
  copyQuote(data: any) {
    this.basiccost = [];
    this.startingplace = [];
    this.endplace = [];
    if (data.OriginList.length <= 0) this.startingplace = [{ NO: 1 }];
    if (data.DestinationList.length <= 0) this.endplace = [{ NO: 1 }];
    //1.处理组装报价数据
    //基础费用组装   海运整柜
    //起始地费用组装
    //目的地费用组装
    if (this.quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this.quoteinfo.shipmentType == 0) {
      let startObj = {
        unitType: data.freightList[0].unitType,
        currencyId: data.freightList[0].currencyId,
        validEndDate: data.validEndDate,
        validStartDate: data.validStartDate,
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
    }
    //基础费用组装   海运散货 空运散货
    //起始地费用组装
    //目的地费用组装
    if (
      (this.quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this.quoteinfo.shipmentType == 1) ||
      this.quoteinfo.freightMethodType == this.freightMethodTypeValue.Air
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
    this.selectIndex = 1;
    this.selSelectIndex.emit(1);
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

  selIndex(event: any) {
    this.selSelectIndex.emit(event.index);
  }

  //清空数据
  clearDate() {
    this.basiccost = [{}];
    this.endplace = [{}, {}];
    this.startingplace = [{}, {}];
  }

  //创建create
  ngSubmit() {
    //触发验证
    this.isClosed.emit(true);
    if (!this.handlequotesComponent.verification()) {
      this.isClosed.emit(false);
      return false;
    }
    this.isQuoteRecordStatus.emit(true);
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
        quantity: this.quoteinfo.quantity,
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
    this.quotesService.create(this.quoteReplys).subscribe(
      (c) => {
        this.isSuccessfully.emit(true);
        this.isQuoteRecordStatus.emit(false);
      },
      (error) => {
        this.isSuccessfully.emit(false);
        this.isQuoteRecordStatus.emit(false);
      },
    );
  }
}
