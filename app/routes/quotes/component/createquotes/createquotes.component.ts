import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { QuotesService } from '../../service/quotes.service';
import { priceProduceNode, unitType, FreightMethodType } from '../../enum/quoteState';
import { CRMQuoteEnquiryDto } from '../../../../services/crm/crm.types';
import { NgForm } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { HandlequotesComponent } from '../handlequotes/handlequotes.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'quotes-createquotes',
  templateUrl: './createquotes.component.html',
  styleUrls: ['./createquotes.component.less'],
})
export class CreatequotesComponent implements OnInit {
  @Input() set quoteinfo(data: any) {
    this._quoteinfo = data;
    if (this._quoteinfo.containerType) {
      let list = JSON.parse(this._quoteinfo.containerType);
      this.containHavedataList = list.filter((c) => c.value > 0);
    }
  }

  constructor(public quotesService: QuotesService, private message: NzMessageService, private translate: TranslateService) {}
  today = new Date();
  //基础费用
  basiccost: any[] = [{ validDateRange: [this.today] }];
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
  @Output() isQuoteStatus = new EventEmitter<boolean>();
  @Output() isClosed = new EventEmitter<boolean>();
  _quoteinfo: CRMQuoteEnquiryDto = {}; //询价实体
  quoteReplys: any = {
    quoteReplyItems: [],
  };
  //最终有数据的箱型
  containHavedataList: Array<any> = [];
  costItemList: any[] = [];
  //币别列表
  currencyList: Array<any> = new Array<any>();
  freightMethodTypeValue: typeof FreightMethodType = FreightMethodType;
  //空的guid
  emptyGuid = '00000000-0000-0000-0000-000000000000';

  @ViewChild(HandlequotesComponent) handlequotesComponent: HandlequotesComponent;
  ngOnInit() {}

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
    this.isQuoteStatus.emit(true);
    this.quoteReplys.carrierId = this.basiccost[0].carrierId;
    this.quoteReplys.quoteEnquiryId = this._quoteinfo.id;
    this.quoteReplys.transitTime = this.basiccost[0].transitTime;
    if (this.basiccost[0].validDateRange) {
      this.quoteReplys.validEndDate = this.basiccost[0].validDateRange[1];
      this.quoteReplys.validStartDate = this.basiccost[0].validDateRange[0];
    }
    //判断海运散货 海运整柜 空运散货得报价添加
    if (this._quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this._quoteinfo.shipmentType == 0) {
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
    if (this._quoteinfo.freightMethodType == this.freightMethodTypeValue.Ocean && this._quoteinfo.shipmentType == 1) {
      //海运散货
      this.quoteReplys.sailSchedule = this.basiccost[0].sailSchedule;
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
          c.quantity = this._quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this._quoteinfo.volume;
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
          c.quantity = this._quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this._quoteinfo.volume;
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
    if (this._quoteinfo.freightMethodType == this.freightMethodTypeValue.Air) {
      //空运散货
      this.quoteReplys.quoteReplyItems.push({
        unitPrice: this.basiccost[0].unitPrice,
        currencyId: this.basiccost[0].currencyId,
        unitType: 3, //写死
        priceProduceNode: priceProduceNode.Freight,
        totalPrice: this.basiccost[0].totalPrice,
        computeMode: this.basiccost[0].computeMode,
        computeFormula: this.basiccost[0].computeFormula,
        quantity: this.basiccost[0].quantity,
        remark: this.basiccost[0].remark,
      });
      this.startingplace.forEach((c) => {
        //起始地e
        if (c.unitType == unitType.Ticket) {
          //票
          c.quantity = 1;
        } else if (c.unitType == unitType.Weight) {
          //重量
          c.quantity = this._quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this._quoteinfo.volume;
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
          c.quantity = this._quoteinfo.weight;
        } else if (c.unitType == unitType.Volume) {
          //体积
          c.quantity = this._quoteinfo.volume;
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
        this.translate.instant('Create success!');
        this.isSuccessfully.emit(true);
        this.isQuoteStatus.emit(false);
      },
      (error) => {
        this.isSuccessfully.emit(false);
        this.isQuoteStatus.emit(false);
      },
    );
  }
}
