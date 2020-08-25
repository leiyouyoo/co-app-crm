import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { groupBy } from 'lodash';
import { FreightMethodType } from '../../../routes/quotes/enum/quoteState';
import { SSOUserService } from '@co/cds';
import { CRMQuoteEnquiryService } from '../../../services/crm';

@Component({
  selector: 'crm-sharequotes',
  templateUrl: './sharequotes.component.html',
  styleUrls: ['./sharequotes.component.less'],
})
export class SharequotesComponent implements OnInit {
  @Input() Id: string;
  @Input() userId: number;
  @Input() imgUrl: string;
  @ViewChild('copyToImage') copyToImageRef: ElementRef;
  @ViewChild('downToImage') downToImageRef: ElementRef;
  profilePicture: string;
  constructor(public quoteLibraryService: CRMQuoteEnquiryService, public ssoService: SSOUserService) {}
  quoteObj: any = {};
  userInfo: any = {};
  isLoading: boolean = false;
  freightMethodTypeValue: typeof FreightMethodType = FreightMethodType;
  ramark: string;
  ngOnInit(): void {
    this.getQuotesDetail(this.Id);
    this.getCrmInfo(this.userId);
  }

  //获取销售人员信息
  getCrmInfo(Id: number) {
    this.ssoService.get({ id: Id }).subscribe((res: any) => {
      //获取详情
      this.userInfo = res.user;
      this.profilePicture = res.profilePictureId;
    });
  }

  getQuotesDetail(Id: string) {
    this.isLoading = true;
    this.quoteLibraryService.getForCRM({ id: Id }).subscribe((res) => {
      //获取详情
      this.isLoading = false;
      this.quoteObj = res;
      this.handleData();
    });
  }
  //处理数据
  freightList: any[] = [];
  OriginList: any[] = [];
  OriginListByCode: any[] = [];
  DestinationListByCode: any[] = [];
  DestinationList: any[] = [];
  totalChargelist: any[] = [];
  OriginRemarklist: Array<any> = new Array<any>();
  DestinationRemarkList: Array<any> = new Array<any>();
  transitTime: any;
  carrierName: string;
  validStartDate: Date;
  validEndDate: Date;
  remark: string;
  unifiedTotalCharge: any;
  handleData() {
    this.unifiedTotalCharge = this.quoteObj.quoteReplys[0].unifiedTotalCharge;
    this.transitTime = this.quoteObj.quoteReplys[0].transitTime;
    this.carrierName = this.quoteObj.quoteReplys[0].carrierName;
    this.validStartDate = this.quoteObj.quoteReplys[0].validStartDate;
    this.validEndDate = this.quoteObj.quoteReplys[0].validEndDate;
    this.freightList = this.quoteObj.quoteReplys[0].quoteReplyItems.filter((c) => c.priceProduceNode == 1);
    this.remark = this.freightList[0].remark;
    this.OriginList = this.quoteObj.quoteReplys[0].quoteReplyItems.filter((c) => c.priceProduceNode == 2);
    this.DestinationList = this.quoteObj.quoteReplys[0].quoteReplyItems.filter((c) => c.priceProduceNode == 3);
    this.totalChargelist = JSON.parse(this.quoteObj.quoteReplys[0].totalCharge);
    this.totalChargelist.forEach((c) => {
      if (c.Total) c.Total = Number(c.Total);
    });
    this.OriginRemarklist = this.objToArray(groupBy(this.OriginList, 'chargingCodeId'));
    this.DestinationRemarkList = this.objToArray(groupBy(this.DestinationList, 'chargingCodeId'));
    if (this.quoteObj.freightMethodType == this.freightMethodTypeValue.Ocean && this.quoteObj.shipmentType == 0) {
      let listOfOriginDataGROUP = groupBy(this.OriginList, 'chargingCodeName');
      this.OriginListByCode = this.objToArray(listOfOriginDataGROUP);
      let listOfDestinationDataGROUP = groupBy(this.DestinationList, 'chargingCodeName');
      this.DestinationListByCode = this.objToArray(listOfDestinationDataGROUP);
    }
  }
  //对象转数组
  objToArray(list: any) {
    let array = Array<any>();
    let total = 0;
    // let total=sumBy(list,'unitPrice');
    for (let key in list) {
      total = 0;
      list[key].forEach((element) => {
        total += element.unitPrice * element.quantity;
      });
      array.push({
        chargeId: key,
        remark: list[key][0].remark,
        currencyName: list[key][0].currencyName,
        list: list[key],
        total: total,
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
