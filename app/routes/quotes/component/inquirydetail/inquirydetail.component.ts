import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuotesService } from '../../service/quotes.service';
import { NzMessageService } from 'ng-zorro-antd';
import { QuoteEnquiry } from 'projects/cityocean/quote-library/src/public-api';
import { Location } from '@angular/common';
import { CreatequotesComponent } from '../createquotes/createquotes.component';
import { FreightMethodType, BusinessType } from '@cityocean/basicdata-library';
import { QuoteSimpleInfoComponent } from '../quote-simple-info/quote-simple-info.component';
@Component({
  selector: 'quotes-inquirydetail',
  templateUrl: './inquirydetail.component.html',
  styleUrls: ['./inquirydetail.component.less'],
})
export class InquirydetailComponent implements OnInit {
  freightMethodTypeValue: typeof FreightMethodType = FreightMethodType;
  quoteDetail: Array<any> = new Array<any>();
  submitting = false;
  quotesObj?: QuoteEnquiry = { freightMethodType: this.freightMethodTypeValue.Ocean, originIsRequireTruck: true };
  inputValue = '';
  BusinessId: any;
  BusinessType = 0;
  AttachmenType: any = 0;
  isShowGuoqiButton = true;
  _BusinessType = BusinessType;
  public quotesId: string = this.activeRoute.snapshot.params.id;
  @ViewChild(QuoteSimpleInfoComponent)
  QuoteSimpleInfoComponent: QuoteSimpleInfoComponent;
  groupName = 'Quotes IM communication';
  disabledIm = false;
  isQuoteStatus: boolean = false;
  @ViewChild('imlayout') ImLayout: any;

  constructor(
    public route: Router,
    public location: Location,
    public activeRoute: ActivatedRoute,
    public quoteService: QuotesService,
    public router: Router,
    private message: NzMessageService,
  ) {}

  ngOnInit() {
    // this.quotesId = Number(this.activeRoute.snapshot.paramMap.get('quotesId'));
    if (this.quotesId) {
      this.BusinessId = this.quotesId;
      this.getQuoteDetail(this.quotesId);
    }
  }

  //获取询价详情
  getQuoteDetail(id: string) {
    this.quoteService.getQuoteDetail(id).subscribe((res) => {
      this.quotesObj = res;
      this.handleDetail(this.quotesObj);
      if (this.quotesObj.id && this.QuoteSimpleInfoComponent) this.QuoteSimpleInfoComponent.initData();
    });
  }

  //返回上一页
  back() {
    this.location.back();
  }

  Replicate(data: any) {
    this.router.navigate(['/crm/quotes/quotesDetail'], { queryParams: { detailId: data.id, isCopy: true } });
  }

  containType: Array<any> = new Array<any>();
  containsSpecialGoodsTypes: Array<any> = new Array<any>();
  //详情信息处理
  handleDetail(data: any) {
    if (data.containerType) this.containType = JSON.parse(data.containerType); //序列化箱型
    if (this.containType) this.containType = this.containType.filter((c) => c.value > 0);
    if (data.containsSpecialGoodsTypes) this.containsSpecialGoodsTypes = JSON.parse(data.containsSpecialGoodsTypes);
    if (data.originAddressName) {
      data.originAddress = { name: data.originAddressName };
    }
    if (data.destinationAddressName) {
      data.destinationAddress = { name: data.destinationAddressName };
    }
  }

  //新增报价
  isShowcreatequotes: boolean = false;
  createQuote() {
    event.stopPropagation();
    this.isShowcreatequotes = true;
  }

  @ViewChild(CreatequotesComponent) CreatequotesComponent: CreatequotesComponent;
  isClosed: boolean = false;
  createquotesCancel() {
    this.isShowcreatequotes = false;
    this.CreatequotesComponent.clearDate();
  }

  createquotesOk() {
    this.CreatequotesComponent.ngSubmit();
  }

  Successfully(event: any) {
    if (event) {
      if (this.quotesId) {
        if (this.isClosed) {
          //更新报价页面
          this.getQuoteDetail(this.quotesId);
          this.isShowcreatequotes = false;
        }
      }
    }
  }

  updateQuote(event: any) {
    if (event) this.getQuoteDetail(this.quotesId);
  }
}
