import { Component, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
// import { CustomerService } from '../../customer/service/customer.service';
import { RatesQuoteEnquiryService } from '../../../services/rates/quote-enquiry.service';

@Component({
  selector: 'app-track-detial',
  templateUrl: './track-detial.component.html',
  styleUrls: ['./track-detial.component.less'],
})
export class TrackDetialComponent {
  @Input() datas: any;
  item: any;
  trailerDetial: any;
  description: any;
  constructor(
    // private customerService: CustomerService,
    private msg: NzMessageService,
    private ratesQuoteEnquiryService: RatesQuoteEnquiryService,
  ) { }

  showDetial(data) {
    var re = new RegExp('\r\n\r\n', 'g'); //定义正则表达式
    data.remark = data.remark?.replace(re, '<br />');
    this.item = null;
    this.trailerDetial = null;
    // 海运合约价
    if (data.businessType === 0 || data.businessType === 2) {
      this.item = data;
    }

    //海运询报价

    if (data.businessType === 1 || data.businessType === 3) {
      this.ratesQuoteEnquiryService.get({ id: data.id }).subscribe((res) => {
        this.trailerDetial = res;
        this.description = this.trailerDetial?.quoteReply?.quoteReplyItems[0]?.remark;
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
          this.trailerDetial.quoteReply.base =
            this.trailerDetial.quoteReply.quoteReplyItems.filter((c) => c.priceProduceNode === 0)[0] ?? {};
        }
      });
    }
  }
}
