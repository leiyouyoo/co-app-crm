import { Component, OnInit, ComponentFactoryResolver, Input, SimpleChanges, HostListener, ViewChild, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
// import { CustomerService } from '../../customer/service/customer.service';
import { FooterCopyrightComponent } from './footer-copyright/footer-copyright.component';
import { RatesOceanBaseItemServiceService } from '../../../services/rates/ocean-base-item-service.service';
import { RatesQuoteEnquiryService } from '../../../services/rates/quote-enquiry.service';
import { RatesLocalBaseRateExternalServiceService } from '../../../services/rates/local-base-rate-external-service.service';
import { PUBCurrencyService } from '@co/cds';

@Component({
  selector: 'app-inquiry-detial',
  templateUrl: './inquiry-detial.component.html',
  styleUrls: ['./inquiry-detial.component.less'],
})
export class InquiryDetialComponent {
  @Input() datas: any;

  item: any;
  trailerDetial: any;

  total20GP: number = 0;
  total40GP: number = 0;
  total40HQ: number = 0;
  total50HQ: number = 0;

  chargeunittypePipe: any = {
    1: "CTNR",
    2: "BILL"
  }


  constructor(
    // private customerService: CustomerService, 
    private msg: NzMessageService,
    private OceanBaseItemService: RatesOceanBaseItemServiceService,
    private ratesQuoteEnquiryService: RatesQuoteEnquiryService,
    private ratesLocalBaseRateExternalServiceService: RatesLocalBaseRateExternalServiceService,
    private pubCurrency: PUBCurrencyService,
  ) { }

  showDetial(data) {
    this.item = null;
    this.trailerDetial = null;
    this.initTotal();
    // 海运合约价
    if (data.businessType === 0 || data.businessType === 2) {
      this.OceanBaseItemService.getBusinessRateDetails({ baseItemId: data.id }).subscribe((res: any) => {
        if (res.costDetails) {
          res.costDetails.forEach(((e) => {
            this.total20GP += Number(e['20GP']);
            this.total40GP += Number(e['40GP']);
            this.total40HQ += Number(e['40HQ']);
            this.total50HQ += Number(e['45HQ']);
          }))
        }
        this.item = res;
        if (this.item.units) {
          this.item.units.sort((a: any, b: any) => {
            const aMatch = a.item1.match(/(\d+)([A-Z]+)/);
            const bMatch = b.item1.match(/(\d+)([A-Z]+)/);
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
      });
    }

    //海运询报价
    if (data.businessType === 1 || data.businessType === 3) {
      this.ratesQuoteEnquiryService.get({ id: data.id }).subscribe((res) => {
        this.trailerDetial = res;

        // 处理Rate Unit
        if (this.trailerDetial.containerType) {
          this.trailerDetial.containerType = JSON.parse(this.trailerDetial.containerType);

          this.trailerDetial.containerType = this.trailerDetial.containerType.map((e) => e.name).join('/');
        }

        // 处理基本运费表格
        if (this.trailerDetial.quoteReply && this.trailerDetial.quoteReply.quoteReplyItems) {
          this.trailerDetial.quoteReply.table1 = this.trailerDetial.quoteReply.quoteReplyItems.filter(
            (c) => c.priceProduceNode === 1,
          );

          this.trailerDetial.quoteReply.table2 = this.trailerDetial.quoteReply.quoteReplyItems.filter(
            (c) => c.priceProduceNode === 2,
          );
          this.trailerDetial.quoteReply.table3 = this.trailerDetial.quoteReply.quoteReplyItems.filter(
            (c) => c.priceProduceNode === 3,
          );
        }
      });
    }

    if (data.businessType === 0) {
      this.getLocalRateByPort(data.id)
    }

  }


  // 本地费用
  locChargeLists: any = null;
  locChargeItem: any = [];
  LocalRateList: any = [];
  locTotalList: any = {}; //表格字段统计数组
  maxLengthInArr: number = 0;
  getLocalRateByPort(id) {
    this.ratesLocalBaseRateExternalServiceService.getLocalRateByPort(id).subscribe((res: any) => {
      this.LocalRateList = res;
      this.locChargeItem = res?.item2;
      this.maxLengthInArr = res?.item2.length;
      this.initLocChargeLists("POL");
      this.initTotalList();
    })
  }

  chargeItem: string = "pol";
  chargeItemChange(e) {
    this.chargeItem = e;
    if (this.chargeItem == "pol") {
      this.initLocChargeLists("POL");
      this.initTotalList();
    } else {
      this.initLocChargeLists("POD");
      this.initTotalList();
    }


  }

  // 赋值locTotalList
  initTotalList() {
    try {
      this.locTotalList = {};
      this.locChargeItem.forEach(e => {
        this.locTotalList[e] = 0;
      })

      if (this.locChargeLists && this.locChargeLists.length > 0) {
        this.locChargeLists.forEach(e => {
          if (e.localUnitRateByPortOutputs.length < this.maxLengthInArr) {
            for (var i = 0; i < this.maxLengthInArr; i++) {
              if (!e.localUnitRateByPortOutputs[i]) {
                e.localUnitRateByPortOutputs[i] = " "
              }
            }
          }
        })
      }

      this.pubCurrency.getExchangeList({ toCode: 'USD' }).subscribe((res: any) => {
        if (this.locChargeLists && this.locChargeLists.length > 0) {
          this.locChargeLists.forEach(item => {
            item?.localUnitRateByPortOutputs.forEach((e, index, arr) => {
              console.log(e.cost ? e.cost : item.totalPrice, "eeeee")
              if (item.currencyCode.toUpperCase() == 'USD') {
                this.locTotalList[this.locChargeItem[index]] += e.cost ? e.cost : item.totalPrice;
              } else {
                res.forEach(element => {
                  if (element.fromCurrencyId === item.currencyId) {
                    this.locTotalList[this.locChargeItem[index]] += e.cost ? element.exchangeRate * e.cost : element.exchangeRate * item.totalPrice;
                  }
                });
              }
            })
          })
        }
      })
    } catch (e) {
      console.error(e, "initTotalList error");
    }
  }

  initLocChargeLists(type) {
    this.locChargeLists = [];
    if (this.LocalRateList?.item1?.items.length > 0) {
      this.LocalRateList.item1.items.forEach(e => {
        if (e.port == type) {
          this.locChargeLists = e.localItemRateByPorts
        }
      })
    }
  }

  initTotal() {
    this.total20GP = 0;
    this.total40GP = 0;
    this.total40HQ = 0;
    this.total50HQ = 0;
  }

}

