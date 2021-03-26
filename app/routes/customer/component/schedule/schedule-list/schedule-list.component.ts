import { Component, Injector, Input, OnInit } from '@angular/core';
import { CRMCustomerOperationEventService, CRMTraceLogService } from 'apps/crm/app/services/crm';
import { CSPScheduleService } from 'apps/crm/app/services/csp';

@Component({
  selector: 'crm-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.less'],
})
export class ScheduleListComponent implements OnInit {
  @Input() customerId;
  @Input() searchParam:any;
  scheduleList = [];
  param: any;
  logLoading = false;
  constructor(
    injector: Injector,
    private crmCustomerOperationEventService: CRMCustomerOperationEventService,
    private crmTraceLogService: CRMTraceLogService,
    private cspScheduleService: CSPScheduleService,
  ) {}

  ngOnInit(): void {
    debugger
    this.param = {
      customerId: this.customerId,
      searchText: this.searchParam.searchKey,
      startTime: null,
      endTime: null,
      offsetDay: 0,
      sorting: null,
      skipCount: 0,
      maxResultCount: 3,
      totalCount: 0,
    };
    this.getAllScheduleForCrm();
  }
  /**
   * 获取日程
   */
  getAllScheduleForCrm(isNext = false) {
    this.cspScheduleService.getAllForCrm(this.param).subscribe(
      (r) => {
        if (isNext) {
          this.scheduleList = this.scheduleList.concat(r.items);
        } else {
          this.scheduleList = r.items;
        }
        this.logLoading = false;
        this.param.totalCount = r.totalCount;
        console.log(this.scheduleList);
      },
      (e) => {
        this.logLoading = false;
      },
    );
  }

  /**
   * 获取下一页事件
   */
  getNextLog() {
    this.param.skipCount++;
    this.logLoading = true;
    this.getAllScheduleForCrm(true);
  }
}
