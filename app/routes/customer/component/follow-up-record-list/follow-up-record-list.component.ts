import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Injector,
  Input,
  LOCALE_ID,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CoConfigManager, CoPageBase } from '@co/core';
import { of } from 'rxjs';
import { groupBy, sort } from 'lodash';
import { CRMCustomerOperationEventService, CRMTraceLogService } from '../../../../services/crm';
import { ScheduleListComponent } from '../schedule/schedule-list/schedule-list.component';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'crm-follow-up-record-list',
  templateUrl: './follow-up-record-list.component.html',
  styleUrls: ['./follow-up-record-list.component.less'],
})
export class FollowUpRecordListComponent extends CoPageBase implements OnInit {
  @ViewChild(ScheduleListComponent, { static: false }) scheduleList: ScheduleListComponent;
  @Input() customerId;
  @Input() fromDetail = null;
  traceLogList = [];
  param: any;
  offsetDay = 0;
  downLoadUrl = CoConfigManager.getValue('downloadUrl');
  previewImage: string | undefined = '';
  previewVisible = false;
  logLoading = false;
  refreshLogLoading = false;
  visible = false;
  allChecked = true;
  indeterminate = false;
  isShowSchedule = true;
  isShow=true;
  checkOptionsOne = [
    { label: '电子邮件', value: 5, checked: true },
    { label: '跟进记录', value: 3, checked: true },
    { label: '日程', value: 4, checked: true },
    { label: '事件', value: 2, checked: true },
    { label: '团队成员', value: 1, checked: true },
  ];
  groupedLogList: any;
  groupedLogKeys = [];
  hiddenKey = {};

  constructor(
    injector: Injector,
    private crmCustomerOperationEventService: CRMCustomerOperationEventService,
    private crmTraceLogService: CRMTraceLogService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    @Inject(LOCALE_ID) private locale: string,
  ) {
    super(injector);
    if (this.activatedRoute.snapshot.params.id) {
      this.customerId = this.activatedRoute.snapshot.params.id;
    }
  }

  ngOnInit(): void {
    this.param = {
      customerId: this.customerId,
      searchKey: null,
      offsetDay: 0,
      businessTypes: [0],
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
    this.crmTraceLogService.get({ id: item.businessId }).subscribe(
      (r) => {
        item.loading = false;
        item.detail = r;
      },
      (e) => (item.loading = false),
    );
  }

  /**
   * 获取跟进记录
   */
  getCustomerOperationEvent(isNext = false) {
    this.crmCustomerOperationEventService.getAll(this.param).subscribe(
      (r) => {
        if (isNext) {
          this.traceLogList = this.traceLogList.concat(r.items);
        } else {
          this.traceLogList = r.items;
        }
        this.logLoading = false;
        this.refreshLogLoading = false;
        this.param.totalCount = r.totalCount;
        r.items.map(e => formatDate(e.creationTime, 'yyyy-MM', this.locale)).forEach(e => {
          this.hiddenKey[e] = false;
        });
        console.log(this.traceLogList);
        this.group();

      },
      (e) => {
        this.logLoading = false;
        this.refreshLogLoading = false;
      },
    );
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
    this.param.skipCount += this.param.maxResultCount;
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
    this.scheduleList.param.searchText = this.param.searchKey;
    this.scheduleList.param.offsetDay = this.param.offsetDay;
    this.scheduleList.getAllScheduleForCrm();
  }

  get getBusinessType() {
    return this.checkOptionsOne.find(c => c.value === 4)?.checked;
  }

  showAll() {
    this.$navigate(['/crm/customers/followuprecord', this.customerId], {
      queryParams: { _title: this.$L('Follow up record') },
    });
  }

  updateAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map((item) => {
        return {
          ...item,
          checked: true,
        };
      });
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map((item) => {
        return {
          ...item,
          checked: false,
        };
      });
    }
  }

  updateSingleChecked(): void {
    if (this.checkOptionsOne.every((item) => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every((item) => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.allChecked = false;
      this.indeterminate = true;
    }
  }

  cancel() {
    this.visible = false;
    this.offsetDay = this.param.offsetDay;
    if (this.param.businessTypes.some((e) => e === 0)) {
      this.checkOptionsOne.forEach((e) => (e.checked = true));
    } else {
      this.checkOptionsOne.forEach((ele) => {
        ele.checked = false;
      });
      this.param.businessTypes.forEach((e) => {
        this.checkOptionsOne.forEach((ele) => {
          if (e === ele.value) {
            ele.checked = true;
          }
        });
      });
    }
    this.updateSingleChecked();
  }

  apply() {
    debugger
    this.param.offsetDay = this.offsetDay;
    if (this.checkOptionsOne.every(e => !e.checked)) {
      this.allChecked = true;
      this.updateAllChecked();
    }
    if (this.allChecked) {
      this.param.businessTypes = [0];
    } else {
      this.param.businessTypes = this.checkOptionsOne.filter((e) => e.checked).map((e) => e.value);
    }
    this.visible = false;
    this.isShowSchedule = this.getBusinessType;
    this.searchLog();
  }

  group() {
    this.groupedLogList = groupBy(this.traceLogList, (b) => formatDate(b.creationTime, 'yyyy-MM', this.locale));
    this.groupedLogKeys = Object.keys(this.groupedLogList).sort(((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    }));
    this.cdr.detectChanges();
  }

  hideKey(key) {
    this.hiddenKey[key] = !this.hiddenKey[key];
  }

  checkMonth(key: string) {
    return key == formatDate(new Date(), 'yyyy-MM', this.locale);
  }
}
