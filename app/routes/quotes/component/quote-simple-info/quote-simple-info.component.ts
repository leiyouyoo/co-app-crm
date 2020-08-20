import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { QuoteEnquiry } from 'projects/cityocean/quote-library/src/public-api';
import { QuotesService } from '../../service/quotes.service';
import { FreightMethodType } from '@cityocean/basicdata-library';
import { groupBy } from 'lodash';
import { Observable } from 'rxjs';
import { QuotesrecordComponent } from '../quotesrecord/quotesrecord.component';

@Component({
  selector: 'quote-quote-simple-info',
  templateUrl: './quote-simple-info.component.html',
  styleUrls: ['./quote-simple-info.component.less'],
})
export class QuoteSimpleInfoComponent implements OnInit {
  @Input() quoteObj: QuoteEnquiry = {};
  @Input() record: any = {};
  @Input() Id: string;
  // @Input() quoteData: any = {};
  @Input() isRecord: boolean = false;
  @Output() updateQuote = new EventEmitter<boolean>();
  @Input() isShowQuotesNo: boolean = false;
  @Input() isHalfangle: boolean = false;
  @Input() isDash: boolean = false;
  @Input() isCopy: boolean = false;
  @Input() isShowOpearButton: boolean = true;
  //详情数据
  quoteReplyItems: Array<any> = new Array<any>();
  freightList: Array<any> = new Array<any>();
  OriginList: Array<any> = new Array<any>();
  DestinationList: Array<any> = new Array<any>();
  freightRemarkList: Array<any> = new Array<any>();
  OriginRemarklist: Array<any> = new Array<any>();
  DestinationRemarkList: Array<any> = new Array<any>();
  FreightMethodType = FreightMethodType;
  hisIndexs: number = 0;
  isshowHisFreight = true;
  isshowHisOrigin = true;
  isshowHisDestina = true;
  constructor(public quoteService: QuotesService, public router: Router, private message: NzMessageService) {}
  @ViewChild('QuotesrecordComponent', { static: false }) QuotesrecordComponent: QuotesrecordComponent;

  ngOnInit() {
    this.initData();
  }

  initData() {
    if (!this.isRecord) {
      if (this.Id) {
        this.getQuotesDetail(this.Id).subscribe((c) => {
          this.handleData();
        });
      }
    } else {
      this.getQuotesDetail(this.Id).subscribe((c) => {
        this.quoteObj = c;
        this.quoteObj.quoteReplys = [];
        this.quoteObj.quoteReplys.push(this.record);
        this.handleData();
      });
    }
  }
  //获取详情
  totalChargelist: any[] = [];
  quotestatus: number;
  getQuotesDetail(Id: string) {
    return new Observable((ob) => {
      this.quoteService.getQuoteDetail(Id).subscribe((res) => {
        //获取详情
        this.quoteObj = res;
        ob.next(this.quoteObj);
        ob.complete();
      });
      return;
    });
  }

  updateQuotesDetail(Id: string) {
    this.quoteService.getQuoteDetail(Id).subscribe((res) => {
      //获取详情
      this.quoteObj = res;
      this.handleData();
    });
  }

  //处理数据
  handleData() {
    this.quoteObj.quoteReplys.forEach((quoteReply: any) => {
      quoteReply.freightList = quoteReply.quoteReplyItems.filter((c) => c.priceProduceNode == 1);
      quoteReply.OriginList = quoteReply.quoteReplyItems.filter((c) => c.priceProduceNode == 2);
      quoteReply.OriginRemarklist = this.objToArray(groupBy(quoteReply.OriginList, 'chargingCodeId'));
      quoteReply.DestinationList = quoteReply.quoteReplyItems.filter((c) => c.priceProduceNode == 3);
      quoteReply.DestinationRemarkList = this.objToArray(groupBy(quoteReply.DestinationList, 'chargingCodeId'));
      quoteReply.totalChargelist = JSON.parse(quoteReply.totalCharge);
      quoteReply.totalChargelist.forEach((c) => {
        if (c.Total) c.Total = Number(c.Total);
      });
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

  isShowRemark: boolean = false;
  filterRemark(list: any[]) {
    if (list.filter((c) => c.remark != null).length > 0) return true;
    else return false;
  }
}
