import { Component, Injector, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { STChange, STColumn, STComponent, STData, STRequestOptions } from '@co/cbc';
import { CoPageBase } from '@co/core';
import { CRMCustomerSolutionService } from 'apps/crm/app/services/crm';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SSOUserService } from '@co/cds';
import { ReviewAgentType, ReviewBusinessType, ReviewStatusType } from './../enums';
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
    maxResultCount: 20,
  };
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
      type: 'action',
      width: 120,
      fixed: 'right',
      buttons: [
        {
          text: '回复',
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
    this.ssoUserService.getUsersWithFAMExamine({}).subscribe((res) => {
      debugger;
    });

    this.customerSolutionService.getApplyList(this.reqParams).subscribe((res) => {
      this.listOfData = res.items;
      this.totalCount = res.totalCount;
    });
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
      maxResultCount: 20,
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

      default:
    }
  }

  goDetail(e) {}

  onMenuListClick(data, i) {}
  //#endregion
}
