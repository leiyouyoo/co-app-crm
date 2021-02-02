import { Component, Injector, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData, STRequestOptions } from '@co/cbc';
import { CoPageBase, debounce } from '@co/core';
import { CRMCustomerSolutionService } from 'apps/crm/app/services/crm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SSOUserService } from '@co/cds';
import { ReviewAgentType, ReviewBusinessType, ReviewStatusType } from './../enums';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'crm-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.less'],
})
export class ReviewListComponent extends CoPageBase {
  @ViewChild('stOrderList', { static: false }) stOrderList!: STComponent;

  //#region 私有变量

  /* 1 出口，  2 进口 */
  serviceType = 1;
  reqParams = {
    businessNo: '',
    skipCount: 1,
    maxResultCount: 20,
    creatorUserId: null as any,
    agentType: null,
  };
  userList: any;
  loading = false;

  menuLoading = false;
  selectedMenuIndex = 0;
  menuOfList = [
    { title: '待回复', data: {}, countIndex: 'onProcessing' },
    {
      title: '已回复',
      data: {},
      countIndex: 'hasException',
      columns: ['creationTime', 'quoteReplyStatus'],
    },
    { title: '已驳回', data: {} },
    { title: '全部', data: {} },
  ];

  columns: STColumn[] = [
    { title: '业务号', index: 'shipmentNo', render: 'no.', width: 160 },
    {
      title: '状态',
      index: 'shipmentStatus',
      type: 'enum',
      enum: ReviewStatusType as any,
      width: 120,
    },
    {
      title: '目的港',
      index: 'destinationPort',
      width: 120,
    },
    {
      title: '目的地',
      index: 'destinationAddress',
    },
    { title: '代理', index: 'agentType', type: 'enum', enum: ReviewAgentType as any },
    {
      title: '类型',
      index: 'businessType',
      type: 'enum',
      enum: ReviewBusinessType as any,
    },
    {
      title: '申请备注',
      index: 'applyRemark',
    },
    {
      title: '申请人',
      index: 'creatorUser',
    },
    {
      title: '申请日期',
      index: 'creationTime',
    },
    { title: '回复人', index: 'replierUser' },
    { title: '回复日期', index: 'replyTime' },
    {
      title: 'Action',
      type: 'action',
      width: 150,
      fixed: 'right',
      className: 'no-line-through',
      buttons: [
        {
          text: this.$L('View'),
          type: 'none',
          click: (e) => {},
        },
      ],
    },
  ];
  listOfData = [];
  totalCount = 0;
  //#endregion

  //#region  输入输出参数

  //#endregion

  //#region 页面生命周期

  constructor(
    injector: Injector,
    private message: NzMessageService,
    private nzModalService: NzModalService,
    private activatedRoute: ActivatedRoute,
    private ssoUserService: SSOUserService,
    private customerSolutionService: CRMCustomerSolutionService,
    private router: Router,
  ) {
    super(injector);
  }

  coOnInit(): void {
    this.getUsers();
    this.getList();
  }

  keys(): Array<string> {
    var data = ReviewBusinessType;
    var keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }

  coOnActived(): void {}

  coOnDeactived(): void {}

  coOnChanges(changes: SimpleChanges): void {}

  coAfterViewInit(): void {}

  coOnDestroy(): void {}

  //#endregion

  //#region 事件处理

  //#endregion

  //#region 公共方法
  stReqProcess = (requestOptions: STRequestOptions) => {
    const menuParams = this.menuOfList[this.selectedMenuIndex].data || {};
    requestOptions.body.dynamicQuery = { ...requestOptions.body.dynamicQuery, ...menuParams, serviceType: this.serviceType };
    return requestOptions;
  };

  stResProcess = (result: STData[], rawData) => {
    return result;
  };
  //#endregion

  //#region 私有方法

  resetParam() {
    this.reqParams = {
      businessNo: '',
      skipCount: 1,
      maxResultCount: 20,
      creatorUserId: null as any,
      agentType: null,
    };
  }

  selectItem: any;
  onStChange(e: STChange) {
    switch (e.type) {
      case 'click':
        break;
      case 'dblClick':
        this.goDetail(e.dblClick.item);
        break;
      case 'checkbox':
        break;
      case 'pi':
        this.pageIndexChange(e.pi);
        break;
      case 'ps':
        this.pageSizeChange(e.ps);
        break;
      default:
    }
  }

  pageIndexChange(event: number): void {
    this.reqParams.skipCount = event;
    this.getList();
  }

  pageSizeChange(event: number): void {
    this.reqParams.maxResultCount = event;
    this.getList();
  }

  goDetail(e) {}

  getList() {
    let num = this.reqParams.skipCount - 1;
    this.loading = true;
    this.customerSolutionService
      .getApplyList({
        maxResultCount: this.reqParams.maxResultCount,
        skipCount: num * this.reqParams.maxResultCount,
        businessNo: this.reqParams.businessNo,
        creatorUserId: this.reqParams.creatorUserId,
        agentType: (this.reqParams.agentType ? ReviewAgentType[this.reqParams.agentType] : null) as any,
      })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.listOfData = res.items;
        this.totalCount = res.totalCount;
      });
  }

  getUsers(data = null) {
    this.ssoUserService
      .getCityOceanUsers({
        name: data,
      })
      .subscribe((res: any) => {
        this.userList = res.items;
      });
  }

  @debounce(200)
  searchData(data) {
    this.getUsers(data);
  }

  onMenuListClick(data, i) {}
  //#endregion
}
