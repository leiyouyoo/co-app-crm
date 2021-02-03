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
import { AnswerModalComponent } from '../answer-modal/answer-modal.component';
import { id } from 'date-fns/locale';
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
    { title: 'To reply', data: ReviewStatusType.WaitingReply },
    {
      title: 'Replied',
      data: ReviewStatusType.Pass,
    },
    { title: 'Rejected', data: ReviewStatusType.Reject },
    { title: 'All', data: null },
  ];

  columns: STColumn[] = [
    { title: 'Business number', index: 'businessNo', width: 120 },
    {
      title: 'Status',
      index: 'status',
      type: 'enum',
      enum: ReviewStatusType as any,
      width: 120,
    },
    {
      title: 'Delivery/To',
      index: 'destinationPort',
      width: 120,
    },
    {
      title: 'Destination',
      index: 'destinationAddress',
    },
    { title: 'Proxy', index: 'agentType', type: 'enum', enum: ReviewAgentType as any },
    {
      title: 'ReviewType',
      index: 'businessType',
      type: 'enum',
      enum: ReviewBusinessType as any,
    },
    {
      title: 'Application note',
      index: 'applyRemark',
    },
    {
      title: 'Applicant',
      index: 'creatorUser',
    },
    {
      title: 'Date of Application',
      index: 'creationTime',
      type: 'date',
      dateFormat: 'yyyy-MM-dd HH:mm:ss',
    },
    { title: 'Responder', index: 'replierUser' },
    { title: 'Reply date', index: 'replyTime' },
    {
      title: 'Action',
      type: 'action',
      width: 150,
      fixed: 'right',
      className: 'no-line-through',
      buttons: [
        {
          text: this.$L('Reply'),
          type: 'none',
          iif: (data) => data.status === 0,
          click: (e) => {
            this.answer(e, [e?.id])
          },
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

  coOnActived(): void { }

  coOnDeactived(): void { }

  coOnChanges(changes: SimpleChanges): void { }

  coAfterViewInit(): void { }

  coOnDestroy(): void { }

  //#endregion

  //#region 事件处理

  //#endregion

  //#region 公共方法

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
        this.selectItem = e.checkbox;
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

  goDetail(e) { }

  getList() {
    let num = this.reqParams.skipCount - 1;
    this.loading = true;
    this.customerSolutionService
      .getApplyList({
        maxResultCount: this.reqParams.maxResultCount,
        skipCount: num * this.reqParams.maxResultCount,
        businessNo: this.reqParams.businessNo,
        creatorUserId: this.reqParams.creatorUserId,
        status: this.selectedMenuIndex,
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

<<<<<<< HEAD
  onMenuListClick(data, i) { }


  clickAnswer() {
    let ids = this.selectItem?.map(e => { return e.id })
    if (ids?.length > 0) {
      this.answer(null, ids)
    } else {
      this.message.warning('请选择至少一条数据')
    }

  }

  answer(item = null, id) {
    this.nzModalService.create({
      nzContent: AnswerModalComponent,
      nzWidth: 800,
      nzComponentParams: {
        data: item,
        id: id
      }
    }).afterClose.subscribe(data => {
      if (data) {
      }
    });
=======
  onMenuListClick(data) {
    this.resetParam();
    this.selectedMenuIndex = data.data;
    this.getList();
>>>>>>> 951a1d49d46c96900e0ad0e8b3c9f949147d3f19
  }
  //#endregion
}
