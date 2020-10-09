import { Component, Injector, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotesService } from '../../service/quotes.service';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { CreatequotesComponent } from '../createquotes/createquotes.component';
import { initiativeCreatequotesComponent } from '../initiativecreatequotes/initiativecreatequotes.component';
import { QuotesrecordComponent } from '../quotesrecord/quotesrecord.component';
import { FreightMethodType, quoteState } from '../../enum/quoteState';

import { SharequotesComponent } from '../../../../shared/compoents/sharequotes/sharequotes.component';
import { isIE } from '../../../../shared/isIE';
import domToImage from 'dom-to-image';
import { ClipboardService } from 'ngx-clipboard';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
import { CoConfigManager, CoPageBase } from '@co/core';
import { STColumn, STComponent } from '@co/cbc/web/st';

@Component({
  selector: 'quotes-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.less'],
})
export class InquiryComponent extends CoPageBase {
  @ViewChild('st', { static: false }) st: STComponent;
  constructor(
    private router: Router,
    public quoteService: QuotesService,
    private message: NzMessageService,
    private nzModalService: NzModalService,
    private clipboardService: ClipboardService,
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    injector: Injector,
  ) {
    super(injector);
  }
  small: 'small';
  bordered = false;
  isShowcreatequotes: boolean = false;
  isShowinitiativecreatequotes: boolean = false;
  isShowcreaterecord: boolean = false;
  isinitiaveQuoteStatus: boolean = false;
  isQuoteStatus: boolean = false;
  isQuoteRecordStatus: boolean = false;
  isClosed: boolean = false;
  quoteinfo: any = {};
  //询价列表
  quoteList: any = new Array();
  //询价查询参数
  quoteInputParams: any = {
    dynamicQuery: {},
  };
  //报价状态枚举
  QuoteState: typeof quoteState = quoteState;
  quoteState: any[];
  customerAndUser: any[];
  //分页
  quotetotal: number;
  @ViewChild(CreatequotesComponent) CreatequotesComponent: CreatequotesComponent;
  @ViewChild(initiativeCreatequotesComponent)
  initiativeCreatequotesComponent: initiativeCreatequotesComponent;
  @ViewChild(QuotesrecordComponent) QuotesrecordComponent: QuotesrecordComponent;
  @ViewChild('shareModalFooter') shareModalFooter: TemplateRef<any>;
  shareModalRef: NzModalRef;
  selIndex: number = 0;
  //查看报价
  isShowtab = false;
  quoteId: string;
  freightMethodTypeValue: typeof FreightMethodType = FreightMethodType;
  height = 500;
  user = JSON.parse(window.localStorage.getItem('co.session'));

  userId = this.user.session.user.id;
  imgUrl = environment.SERVER_URL;
  columns: STColumn[] = [
    {
      title: 'NO_table',
      type: 'no',
      width: 50,
    },
    {
      title: 'QuoteNo',
      index: 'quoteNo',
      indexI18n: true,
      width: 120,
      render: 'quoteNo',
    },
    {
      title: 'Inquiry customer',
      index: 'ownerCustomer.displayName',
      indexI18n: true,
      width: 120,
    },
    { title: 'Inquirer', index: 'ownerUser.displayName', width: 120 },
    {
      title: 'Freight Method',
      index: 'freightMethodType',
      render: 'fType',
      width: 100,
    },
    {
      title: 'Cargo ready date',
      index: 'cargoReadyDate',
      width: 120,
      type: 'date',
      filter: { type: 'date' },
    },
    {
      title: 'Delivery date',
      index: 'deliveryDate',
      width: 120,
      type: 'date',
      filter: { type: 'date' },
    },
    { title: 'Departure', index: 'from', width: 200 },

    { title: 'Destination', index: 'to', width: 200 },

    { title: 'QuotesStatus', index: 'status', render: 'status', width: 130, filter: null },

    {
      title: 'Action',
      width: 100,
      fixed: 'right',
      type: 'action',
      buttons: [
        {
          text: 'Quotes',
          type: 'none',
          className: 'quotes-botton',
          iif: (data) => !data.isQuoteReply,
          click: (e) => {
            this.addQuote(e, event);
          },
        },
        {
          text: 'View',
          type: 'none',
          className: 'quotes-botton',
          iif: (data) => data.isQuoteReply,
          click: (e) => {
            this.viewQuote(e);
          },
        },
        {
          text: 'Share',
          type: 'none',
          className: 'quotes-botton',
          iif: (data) => data.isQuoteReply && data.status != this.QuoteState.Expired,
          click: (e) => {
            this.share(e, event);
          },
        },
      ],
    },
  ];

  coOnInit() {
    setTimeout(() => {
      this.onDivHeight();
    }, 500);
    this.quoteState = Object.keys(this.QuoteState).filter((f) => !isNaN(Number(f)));
    this.quoteService.getCRMCustomerAndUserHistorys().subscribe((res: any) => {
      this.customerAndUser = res.items;
    });
  }

  onDivHeight() {
    // 获取宽高
    const tableDom = document.getElementById('table');
    if (tableDom) {
      this.height = tableDom.clientHeight;
    }
  }

  selIndexnum(event: number) {
    this.selIndex = event;
  }

  GetAllForCRM() {
    delete this.quoteInputParams.dynamicQuery.id;
    this.st.resetColumns();
  }

  getQuoteDetail(id: string) {
    this.quoteService.getQuoteDetail(id).subscribe((res) => {
      this.quoteinfo = res;
    });
  }

  getQuotesDetailInfo(data: any) {
    this.$navigate(['/crm/quotes/quotesDetail', data.id], {
      queryParams: { _title: this.$L('Quotes Detail') },
    });
  }

  viewQuote(data: any) {
    this.getQuoteDetail(data.id);
    this.quoteId = data.id;
    this.quoteinfo = data;
    this.isShowcreaterecord = true;
    this.isShowtab = true;
    event.stopPropagation();
  }

  //主动报价
  addQuote(data: any, event: any) {
    this.getQuoteDetail(data.id);
    event.stopPropagation();
    this.isShowcreatequotes = true;
  }

  //主动报价回复
  createinitiativequotes() {
    // this.isShowinitiativecreatequotes = true;
    // setTimeout(() => {
    //   this.initiativeCreatequotesComponent.ngScroll();
    // }, 500);
    this.$navigate(['/crm/quotes/create-quote'], { queryParams: { _title: `${this.$L('Add Quotes')}` } });
  }
  createinitiativequotesCancel() {
    this.initiativeCreatequotesComponent.clearDate();
    this.isShowinitiativecreatequotes = false;
  }
  createinitiativequotesOk() {
    this.initiativeCreatequotesComponent.ngSubmit();
  }

  //主动报价返回成功更新列表
  createinitiativequotesSuccessfully(event: any) {
    if (event) {
      if (this.isClosed) {
        this.isShowinitiativecreatequotes = false;
        this.message.info(this.translate.instant('Added successfully!'));
      }
      this.GetAllForCRM();
    } else {
      this.message.info(this.translate.instant('Create filed!'));
    }
  }

  //报价回复
  createquotesCancel() {
    this.isShowcreatequotes = false;
    this.CreatequotesComponent.clearDate();
  }
  createquotesOk() {
    this.CreatequotesComponent.ngSubmit();
  }

  //报价记录新增报价更新列表
  isCreaterecordSuccessfully(event: any) {
    if (event) {
      if (this.isClosed) {
        this.isShowcreaterecord = false;
      }
      this.GetAllForCRM();
    }
  }

  isSuccessfully(event: boolean) {
    if (event) {
      this.GetAllForCRM();
    }
    this.isShowcreatequotes = false;
  }

  //报价记录
  quotesrecordCancel() {
    this.QuotesrecordComponent.clearDate();
    this.isShowcreaterecord = false;
  }
  quotesrecordOk() {
    this.QuotesrecordComponent.ngSubmit();
  }
  change(event) {
    console.log(event);
    switch (event.type) {
      case 'dblClick':
        this.getQuotesDetailInfo(event.dblClick.item);
        break;

      default:
        break;
    }
  }
  pageIndexChange(event): void {
    if (event.pi > 1) this.quoteInputParams.skipCount = this.quoteInputParams.maxResultCount * (event - 1);
    else this.quoteInputParams.skipCount = 0;
    this.GetAllForCRM();
  }

  currentPageSizeChange($event: any) {
    this.quoteInputParams.maxResultCount = $event.ps;
    this.quoteInputParams.skipCount = 0;
    this.GetAllForCRM();
  }
  searchByTradeType() {
    this.search();
  }
  search() {
    let historyDataType;
    if (this.quoteInputParams.dynamicQuery.id) {
      historyDataType = this.customerAndUser.find(
        (c) => c.customerId == this.quoteInputParams.dynamicQuery.id || c.userId == this.quoteInputParams.dynamicQuery.id,
      )?.historyDataType;
    }
    if (historyDataType && this.quoteInputParams.dynamicQuery.id) {
      if (historyDataType == 1) {
        this.quoteInputParams.dynamicQuery.ownerUserId = this.quoteInputParams.dynamicQuery.id;
        this.quoteInputParams.dynamicQuery.ownerCustomerId = null;
      } else {
        this.quoteInputParams.dynamicQuery.ownerCustomerId = this.quoteInputParams.dynamicQuery.id;
        this.quoteInputParams.dynamicQuery.ownerUserId = null;
      }
    } else {
      this.quoteInputParams.dynamicQuery.ownerUserId = null;
      this.quoteInputParams.dynamicQuery.ownerCustomerId = null;
    }
    this.GetAllForCRM();
  }

  clearSearch() {
    this.quoteInputParams.dynamicQuery = {};
    this.search();
  }

  share(data: any, event: any) {
    this.shareModalRef = this.nzModalService.create({
      nzWidth: '50%',
      nzMaskClosable: false,
      nzTitle: this.translate.instant('Quote Preview'),
      nzContent: SharequotesComponent,
      nzComponentParams: {
        Id: data.id,
        userId: this.userId,
        imgUrl: this.imgUrl,
      },
      nzFooter: this.shareModalFooter,
      /*nzFooter: [
        {
          label: this.translate.instant('Copy image'),
          type: 'default',
          autoLoading: true,
          onClick: (contentComponentInstance?): NzSafeAny | Promise<NzSafeAny> => {
            const width = (contentComponentInstance.downToImageRef.nativeElement as HTMLElement).clientWidth;
            return this.domToImageService.copyImageByDom(contentComponentInstance.downToImageRef.nativeElement as HTMLElement, {
              cacheBust: true,
            })
          },
        },
        {
          label: this.translate.instant('Download image'),
          type: 'default',
          onClick(contentComponentInstance: SharequotesComponent): NzSafeAny | Promise<NzSafeAny> {
            const width = (contentComponentInstance.downToImageRef.nativeElement as HTMLElement).clientWidth;
            domToImage
              .toPng(
                contentComponentInstance.downToImageRef.nativeElement as HTMLElement,
                {
                  cacheBust: true,
                } as any,
              )
              .then((data) => {
                var a = document.createElement('a'); //Create <a>
                a.href = data; //Image Base64 Goes here
                a.download = 'Image.png'; //File name Here
                a.click();
              });
          },
        },
        {
          label: this.translate.instant('Copy link'),
          type: 'primary',
          onClick: (contentComponentInstance?): NzSafeAny | Promise<NzSafeAny> => {
            this.clipboardService.copyFromContent(
              `${location.origin}/share/#/redirect?redirectType=quote&quotesId=${data.id}&userId=${this.userId}&isForShare=true`,
            );
            this.message.info(this.translate.instant('Generated successfully'));
          },
        },
      ],*/
    });
    event.stopPropagation();
  }

  downloadImage() {
    const contentComponentInstance = this.shareModalRef.getContentComponent();
    const width = (contentComponentInstance.downToImageRef.nativeElement as HTMLElement).clientWidth;
    domToImage
      .toPng(
        contentComponentInstance.downToImageRef.nativeElement as HTMLElement,
        {
          cacheBust: true,
        } as any,
      )
      .then((data) => {
        var a = document.createElement('a'); //Create <a>
        a.href = data; //Image Base64 Goes here
        a.download = 'Image.png'; //File name Here
        a.click();
      });
  }
  copyLink() {
    const contentComponentInstance = this.shareModalRef.getContentComponent();
    this.clipboardService.copyFromContent(
      `${CoConfigManager.getValue('appCityoceanUrl')}/share/#/redirect?redirectType=quote&quotesId=${contentComponentInstance.Id}&userId=${
        this.userId
      }&isForShare=true`,
    );
    this.message.info(this.translate.instant('Generated successfully'));
  }
  isIE() {
    return isIE();
  }
}
