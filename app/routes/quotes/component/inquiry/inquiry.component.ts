import { Component, OnInit, TemplateRef, ViewChild, Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';
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
import { CoPageBase } from '@co/core';

@Component({
  selector: 'quotes-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.less'],
})
export class InquiryComponent extends CoPageBase {
  constructor(
    private router: Router,
    public quoteService: QuotesService,
    private message: NzMessageService,
    private nzModalService: NzModalService,
    private clipboardService: ClipboardService,
    private translate: TranslateService,
    injector: Injector,
  ) {
    super(injector);
  }
  small: 'small';
  loading = false;
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
    SortingValue: 'CreationTime',
    Id: 0,
    isGeneral: false,
    isFba: false,
    QuoteNo: '',
    nzPageSize: 10,
    pageIndex: 1,
    SkipCount: 0,
    Status: '',
  };
  //报价状态枚举
  QuoteState: typeof quoteState = quoteState;
  quoteState: any[];
  customerAndUser: any[];
  //分页
  quotetotal: number;
  mapOfSort: { [key: string]: any } = {};
  sortName: string | null = 'CreationTime';
  sortValue: string | null = 'desc';
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

  userId = this.user.session.user.icpUserId;
  imgUrl = environment.SERVER_URL;

  coOnInit() {
    setTimeout(() => {
      this.onDivHeight();
    }, 500);
    this.quoteState = Object.keys(this.QuoteState).filter((f) => !isNaN(Number(f)));
    this.GetAllForCRM(this.quoteInputParams);
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

  GetAllForCRM(quoteParams: any) {
    if (quoteParams.SortingValue) {
      quoteParams.Sorting = quoteParams.SortingValue + ' ' + this.sortValue;
    }
    this.loading = true;
    this.quoteService.GetAllForCRM(quoteParams).subscribe(
      (res) => {
        this.loading = false;
        this.quoteList = res.items;
        this.quotetotal = res.totalCount;
      },
      (error) => {
        this.loading = true;
      },
    );
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
    this.isShowinitiativecreatequotes = true;
    setTimeout(() => {
      this.initiativeCreatequotesComponent.ngScroll();
    }, 500);
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
      this.GetAllForCRM(this.quoteInputParams);
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
      this.GetAllForCRM(this.quoteInputParams);
    }
  }

  isSuccessfully(event: boolean) {
    if (event) {
      if (this.isClosed) {
        this.isShowcreatequotes = false;
        this.message.info(this.translate.instant('Added successfully!'));
        this.GetAllForCRM(this.quoteInputParams);
      }
    } else {
      this.message.info(this.translate.instant('Create filed!'));
    }
  }

  //报价记录
  quotesrecordCancel() {
    this.QuotesrecordComponent.clearDate();
    this.isShowcreaterecord = false;
  }
  quotesrecordOk() {
    this.QuotesrecordComponent.ngSubmit();
  }

  pageIndexChange(event: number): void {
    if (event > 1) this.quoteInputParams.SkipCount = this.quoteInputParams.nzPageSize * (event - 1);
    else this.quoteInputParams.SkipCount = 0;
    this.GetAllForCRM(this.quoteInputParams);
  }

  currentPageSizeChange($event: any) {
    this.quoteInputParams.nzPageSize = $event;
    this.quoteInputParams.MaxResultCount = this.quoteInputParams.nzPageSize;
    this.quoteInputParams.SkipCount = 0;
    this.GetAllForCRM(this.quoteInputParams);
  }
  searchByTradeType(event: any) {
    const result = [];
    if (event == 0) {
      result.push(1, 2, 3);
    } else if (event == 1) {
      result.push(1);
    } else if (event == 2) {
      result.push(2, 3);
    }
    this.quoteInputParams.TradeTypes = result.join(',');
    this.search();
  }
  search() {
    if (this.quoteInputParams.Id) {
      this.quoteInputParams.HistoryDataType = this.customerAndUser.find(
        (c) => c.customerId == this.quoteInputParams.Id || c.userId == this.quoteInputParams.Id,
      ).historyDataType;
    }
    if (this.quoteInputParams.HistoryDataType && this.quoteInputParams.Id) {
      if (this.quoteInputParams.HistoryDataType == 1) {
        this.quoteInputParams.UserId = this.quoteInputParams.Id;
        this.quoteInputParams.CustomerId = null;
      } else {
        this.quoteInputParams.CustomerId = this.quoteInputParams.Id;
        this.quoteInputParams.UserId = null;
      }
    } else {
      this.quoteInputParams.UserId = null;
      this.quoteInputParams.CustomerId = null;
      this.quoteInputParams.HistoryDataType = null;
    }
    // this.addFreightMethodTypes(this.quoteInputParams);
    this.GetAllForCRM(this.quoteInputParams);
  }

  clearSearch() {
    this.quoteInputParams.TradeTypes = null;
    this.quoteInputParams.Id = null;
    this.quoteInputParams.CustomerId = null;
    this.quoteInputParams.Status = '';
    this.quoteInputParams.HistoryDataType = null;
    this.quoteInputParams.UserId = null;
    this.quoteInputParams.maoyiType = null;
    this.search();
  }

  addFreightMethodTypes(quoteParams) {
    const result = [];
    if (this.quoteInputParams.isGeneral) {
      result.push(1);
    }
    if (this.quoteInputParams.isFba) {
      result.push(2, 3);
    }
    quoteParams.TradeTypes = result.join(',');
  }

  //排序
  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.mapOfSort) {
      this.mapOfSort[key] = key === sortName ? value : null;
    }
    if (this.sortValue) {
      if (this.sortValue.startsWith('desc')) {
        this.sortValue = 'desc';
      }
      if (this.sortValue.startsWith('asc')) {
        this.sortValue = 'asc';
      }
      this.quoteInputParams.Sorting = this.sortName + ' ' + this.sortValue;
      this.search();
    }
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
      `${location.origin}/share/#/redirect?redirectType=quote&quotesId=${contentComponentInstance.Id}&userId=${this.userId}&isForShare=true`,
    );
    this.message.info(this.translate.instant('Generated successfully'));
  }
  isIE() {
    return isIE();
  }
}
