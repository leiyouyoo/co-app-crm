import { ChangeDetectionStrategy, Component, Injector, ChangeDetectorRef, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { NzMessageService, NzDrawerOptions, NzDrawerService, NzDrawerRef } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

import { CoPageBase } from '@co/core';
import { STColumn, STComponent, STData } from '@co/cbc';
import { PlatformJobDto } from '@co/cds';

import { DemoDetailComponent } from './demo-detail/demo-detail.component';
import { EventService } from '../../services/event/event.service';
import { JobService } from '../../services/demo';
import { SimpleEventType } from '../../shared/types';

/**
 * 样例列表页
 */
@Component({
  selector: 'crm-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoListComponent extends CoPageBase {
  //#region  私有变量

  detialVisible = false;
  drawerStyle: any = {
    width: '500px',
    paddingLeft: '0px',
  };
  maskStyle: any = {
    background: 'transparent',
    zindex: '-1',
  };
  jobDto: any = {
    name: null,
    displayName: null,
    displayNameLocalization: null,
    jobTypeId: null,
    jobTypeName: null,
    desc: null,
    id: null,
  };
  searchParams = {
    searchText: null,
    maxResultCount: 10,
    skipCount: 0,
    isValid: null,
  };
  joblist: any[] = [];
  title: string = 'add';
  jobtotal: number;
  jobIndex: number;
  isEnglish: boolean = true;
  isSubmit: boolean = false;
  loading = false;
  @ViewChild('st') st: any;
  @ViewChild('drawerTitle', { static: false }) drawerTitle?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;

  columns: STColumn[] = [
    {
      title: this.translate.instant('NO'),
      index: 'no',
      sort: {
        compare: (a, b) => a.no - b.no,
      },
    },
    {
      title: this.translate.instant('Job title') + '(' + this.translate.instant('Local language') + ')',
      index: 'displayNameLocalization',
      sort: {
        compare: (a, b) => a.displayName - b.displayName,
      },
    },
    {
      title: this.translate.instant('Job title') + '(' + this.translate.instant('English') + ')',
      index: 'name',
      sort: {
        compare: (a, b) => a.displayNameLocalization - b.displayNameLocalization,
      },
    },
    {
      title: this.translate.instant('Status'),
      index: 'isValid',
      sort: true,
      enum: { true: this.translate.instant('Enable'), false: this.translate.instant('Abolish') },
      type: 'enum',
    },
    {
      title: this.translate.instant('Desc'),
      index: 'desc',
      sort: {
        compare: (a, b) => a.desc - b.desc,
      },
    },
    {
      title: this.translate.instant('Creator'),
      index: 'creatorUserName',
    },
    {
      title: this.translate.instant('CreateDate'),
      type: 'date',
      index: 'creationTime',
    },
    {
      title: this.translate.instant('Action'),
      type: 'action',
      fixed: 'right',
      width: '100',
      className: 'no-line-through',
      buttons: [
        {
          text: this.translate.instant('Abolish'),
          type: 'modal',
          className: (record: STData) => {
            return `st__btn--red`;
          },
          iif: (data: STData) => data.isValid,
          click: (_record, modal, $event) => {
            this.onCancel(_record);
          },
        },
        {
          text: this.translate.instant('Enable'),
          type: 'modal',
          iif: (data: STData) => !data.isValid,
          click: (_record, modal, $event) => {
            this.onRecover(_record);
          },
        },
        {
          text: this.translate.instant('Delete'),
          type: 'modal',
          className: (record: STData) => {
            return `st__btn--red`;
          },
          pop: {
            title: this.translate.instant('Are you sure?'),
            okType: 'danger',
            icon: 'star',
          },
          click: (_record, modal, $event) => {
            this.onDelete(_record, $event);
          },
        },
      ],
    },
  ];

  //#endregion

  //#region  生命周期

  constructor(
    injector: Injector,
    private cdr: ChangeDetectorRef,
    private jobService: JobService,
    private message: NzMessageService,
    private translate: TranslateService,
    private drawerService: NzDrawerService,
    private eventService: EventService,
  ) {
    super(injector);
  }

  coOnInit() {
    debugger;
    this.getAll({});
  }

  //#endregion

  //#region 事件处理

  /**
   * 表格事件
   *
   * @param event
   * @param type
   */
  onTableChange(event, type) {
    this.title = type;
    switch (event.type) {
      case 'click':
        this.jobIndex = event.click.index;
        this.jobDto = event.click.item;
        if (event.click.item.isValid) {
          this.onShowDetailDrawer('edit', this.jobDto);
        }
        this.st.resetColumns();
        break;

      case 'pi':
        this.searchParams.skipCount = (event.pi - 1) * event.ps;
        this.getAll(this.searchParams);
        break;
      case 'ps':
        this.searchParams.skipCount = (event.pi - 1) * event.ps;
        this.searchParams.maxResultCount = event.ps;
        this.getAll(this.searchParams);
        break;

      default:
        break;
    }
  }

  /**
   * 展示操作弹框
   *
   * @param type
   * @param jobinfo
   */
  onShowDetailDrawer(type, jobinfo) {
    const options: NzDrawerOptions = {
      nzTitle: this.drawerTitle,
      nzContent: DemoDetailComponent,
      // nzMaskStyle: this.maskStyle,
      nzPlacement: 'right',
      nzWidth: 480,
      nzMaskClosable: false,
      nzBodyStyle: this.drawerStyle,
      nzWrapClassName: 'job-drawer',
    };

    options.nzContentParams = {
      title: type,
      jobDto: jobinfo,
    };
    this.title = type;
    const drawerRef = this.drawerService.create<DemoDetailComponent, any, PlatformJobDto>(options);
    drawerRef.afterOpen.subscribe(() => {
      drawerRef.getContentComponent().onSubmitted.subscribe((res) => {
        if (res) {
          this.getAll({});
          this.clearData();
          drawerRef.close();
        }
      });
    });
    drawerRef.afterClose.subscribe(() => {
      this.clearData();
      this.jobIndex = null;
      this.st.resetColumns();
    });
  }

  /**
   * 改变状态
   *
   * @param e
   */
  onChangeStatus(e) {
    this.searchParams.skipCount = 0;
    this.getAll(this.searchParams);
  }

  /**
   * 删除职务
   *
   * @param data
   * @param comp
   */
  onDelete(data, comp: STComponent) {
    this.jobService.Delete(data.id).subscribe(
      (res) => {
        this.message.info(this.translate.instant('Delete successfully!'));
        this.getAll(this.searchParams);
      },
      (error) => {},
    );
  }

  /**
   * 作废
   *
   * @param data
   */
  onCancel(data) {
    this.jobService.Cancel(data.id).subscribe(
      (res) => {
        this.message.info(this.translate.instant('Abolish successfully!'));
        this.getAll(this.searchParams);
        this.eventService.publish(SimpleEventType.JOB_STATUS_CHANGED);
      },
      (error) => {},
    );
  }

  /**
   * 启用职务
   *
   * @param data
   */
  onRecover(data) {
    this.jobService.Recover(data.id).subscribe(
      (res) => {
        this.message.info(this.translate.instant('Enable successfully!'));
        this.getAll(this.searchParams);
        this.eventService.publish(SimpleEventType.JOB_STATUS_CHANGED);
      },
      (error) => {},
    );
  }

  //#endregion

  //#region 私有方法

  /**
   * 获取所有职务
   *
   * @param params
   */
  private getAll(params: { jobTypeId?: string; searchText?: string; sorting?: string; maxResultCount?: number; skipCount?: number }) {
    this.loading = true;
    this.jobService.getAll(params).subscribe(
      (res) => {
        this.joblist = res.items;
        this.jobtotal = res.totalCount;
        this.loading = false;
        this.cdr.markForCheck();
      },
      (error) => {
        this.loading = true;
      },
    );
  }

  /**
   * 获取行样式
   *
   * @param record
   * @param index
   */
  private getRowClassName = (record: STData, index: number) => {
    if (index == this.jobIndex && record.isValid) {
      return `job-list-trbg`;
    } else if (!record.isValid) {
      return `st-row-line-through`;
    } else {
      return ``;
    }
  };

  /**
   * 清除数据
   */
  private clearData() {
    this.jobDto.name = null;
    this.jobDto.no = null;
    this.jobDto.displayNameLocalization = null;
    this.jobDto.desc = null;
    this.jobDto.creatorUserName = null;
    this.jobDto.creationTime = null;
    this.jobDto.id = null;
  }

  //#endregion
}
