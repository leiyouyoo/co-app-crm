import { Component, Input, OnInit } from '@angular/core';
import { CoConfigManager } from '@co/core';
import { CRMCustomerOperationEventService, CRMTraceLogService } from '../../../../services/crm';

@Component({
  selector: 'crm-follow-up-record-list',
  templateUrl: './follow-up-record-list.component.html',
  styleUrls: ['./follow-up-record-list.component.less'],
})
export class FollowUpRecordListComponent implements OnInit {
  @Input() customerId;
  traceLogList = [];
  param: any;
  downLoadUrl = CoConfigManager.getValue('downloadUrl');
  previewImage: string | undefined = '';
  previewVisible = false;
  logLoading = false;
  refreshLogLoading = false;

  constructor(private crmCustomerOperationEventService: CRMCustomerOperationEventService,
              private crmTraceLogService: CRMTraceLogService) {
  }

  ngOnInit(): void {
    this.param = {
      customerId: this.customerId,
      searchKey: null,
      businessType: 0,
      maxResultCount: 10,
      skipCount: 0,
      totalCount: 0,
    };
    this.getCustomerOperationEvent();
  }


  /**
   * 获取跟进记录详情
   */
  getLogDetail(item) {
    item.isShow = !item.isShow;
    if (item.detail) {
      return;
    }
    item.loading = true;
    this.crmTraceLogService.get({ id: item.businessId }).subscribe(r => {
      item.loading = false;
      item.detail = r;
    }, e => item.loading = false);
  }

  /**
   * 获取跟进记录
   */
  getCustomerOperationEvent(isNext = false) {
    this.crmCustomerOperationEventService.getAll(this.param).subscribe(r => {
      if (isNext) {
        this.traceLogList = this.traceLogList.concat(r.items);
      } else {
        this.traceLogList = r.items;
      }
      this.logLoading = false;
      this.refreshLogLoading = false;
      this.param.totalCount = r.totalCount;
      console.log(this.traceLogList);
    }, e => {
      this.logLoading = false;
      this.refreshLogLoading = false;
    });
  }

  getImgUrl(pic: any) {
    return this.downLoadUrl + `?FileId=${pic.fileId}&Handler=image`;
  }

  /**
   * 图片预览
   */
  handlePreview = async (item) => {
    this.previewImage = this.getImgUrl(item);
    this.previewVisible = true;
  };

  /**
   * 获取下一页事件
   */
  getNextLog() {
    this.param.skipCount++;
    this.logLoading = true;
    this.getCustomerOperationEvent(true);
  }

  /**
   * 搜索事件
   */
  searchLog() {
    this.param.skipCount = 0;
    this.param.totalCount = 0;
    this.traceLogList = [];
    this.getCustomerOperationEvent();
  }
}
