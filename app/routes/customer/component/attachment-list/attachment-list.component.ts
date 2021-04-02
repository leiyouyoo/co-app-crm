import { Component, Injector, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CoConfigManager, CoPageBase } from '@co/core';
import { STColumn, STComponent, STData } from '@co/cbc';
import { NzMessageService, NzModalService, NzUploadChangeParam } from 'ng-zorro-antd';
import { StorageAttachmentService } from '@co/cds';
import { TranslateService } from '@ngx-translate/core';
import { CRMAttachmentService } from '../../../../services/crm';
import { AttachmentTypeComponent } from './attachment-type/attachment-type.component';
import { GlobalEventDispatcher } from '@co/cms';

@Component({
  selector: 'crm-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.less'],
})
export class AttachmentListComponent extends CoPageBase implements OnInit {
  //#region 私有变量

  @Input() id: any = null;
  @Input() customerId: any = null;
  @Input() subBookingOrderIds: any = [];
  @ViewChild('uploadBtn') uploadBtn: any;
  @Input() businessSteps: any = null;
  @ViewChild('st') st: STComponent;
  uploadUrl = CoConfigManager.getValue('uploadUrl');
  downLoadUrl = CoConfigManager.getValue('downloadUrl');
  fileList = [];
  fileListTwo = [];
  user: any = null;
  allTypeList: any = [];

  columns: STColumn[] = [
    { title: 'Upload Time', index: 'creationTime', type: 'date', width: 200, dateFormat: 'yyyy-MM-dd HH:mm' },
    { title: 'Upload by', width: 200, index: 'creator' },
    { title: 'Document classification', index: 'type', width: 200, render: 'type' },
    { title: 'Document name', index: 'fileName', width: 200, render: 'name' },
    {
      title: 'Action',
      width: 200,
      fixed: 'right',
      type: 'action',
      buttons: [
        {
          text: this.$L('Download'),
          type: 'none',
          click: (e) => {
            this.crmAttachmentService.download({ id: e.id }).subscribe(() => {
              this.globalEventDispatcher.dispatch('refreshFollowUpRecordList');
            });
            window.open(this.downLoadUrl + `?FileId=${e.fileId}&Handler=raw`);

          },
        },
        // {
        //   text: this.$L('DocumentPreview'),
        //   type: 'none',
        //   click: (e) => {
        //     this.documentPreview(this.downLoadUrl + `?FileId=${e.fileId}&Handler=image`);
        //   },
        // },
        {
          text: this.$L('Delete'),
          pop: {
            title: ((data, index) => {
              return this.$L('Are you sure?');
            }) as any,
            okType: 'danger',
            icon: 'star',
          },
          className: (record: STData) => {
            return `st__btn--red`;
          },
          click: (e) => {
            this.deleted(e.id);
          },
        },
      ],
    },
  ];

  isEnglish: boolean = true;
  isSubmit: boolean = false;
  loading: boolean = false;
  tableLoading: boolean = false;
  listOfData: any = [];
  typeList: any = [{}];
  selectId: any = null;

  //#endregion

  //#region  输入输出参数

  //#endregion

  //#region 页面生命周期

  constructor(
    injector: Injector,
    private message: NzMessageService,
    private attachmentService: StorageAttachmentService,
    private modalSrv: NzModalService,
    private translateService: TranslateService,
    private crmAttachmentService: CRMAttachmentService,
    private globalEventDispatcher: GlobalEventDispatcher,
  ) {
    super(injector);
  }

  coOnInit(): void {
    this.user = JSON.parse(window.localStorage.getItem('co.session'));
    this.getData();
  }

  getImgSrc(e) {
    if (e == 'doc' || e == 'docx' || e == 'xls' || e == 'pdf' || e == 'jpg' || e == 'png' || e == 'xlsx') {
      return `apps/fam/assets/images/attachment/icon_${e}.png`;
    } else {
      return null;
    }
  }


  //#endregion

  //#region 事件处理

  //#endregion

  //#region 公共方法
  checkChange(e) {
  }

  deleted(id) {
    this.crmAttachmentService.delete({ id: id }).subscribe((res) => {
      this.message.success(this.$L('Successful operation'));
      this.getData();
    });
  }

  getData() {
    this.tableLoading = true;
    this.crmAttachmentService
      .getAllForFam({
        customerId: this.customerId,
      } as any)
      .subscribe(
        (res) => {
          this.fileList = [];
          this.listOfData = res.items;

          res.items.forEach((e) => {
            this.typeList.push({ value: e.attachmentType });
          });

          this.tableLoading = false;
        },
        (error) => {
          this.tableLoading = false;
        },
      );
  }

  //#endregion

  showModal(item = null) {
    let contact = this.modalSrv.create({
      nzContent: AttachmentTypeComponent,
      nzWidth: 800,
      nzTitle: this.$L('File selection'),
      nzOkText: null,
      nzCancelText: null,
      nzComponentParams: {
        customerId: this.customerId,
      },
    });
    contact.afterClose.subscribe((res) => {
      if (res) {
        this.getData();
      }
    });
  }

  documentPreview(url) {
    // this.modalSrv.create({
    //   nzTitle: this.$L('DocumentPreview'),
    //   nzContent: WebViewerComponent,
    //   nzClosable: false,
    //   nzMaskClosable: false,
    //   nzWidth: 1200,
    //   nzBodyStyle: { 'padding': '0' },
    //   nzCancelText: null,
    //   nzComponentParams: {
    //     docUrl: url,
    //     enableFilePicker: false,
    //   },
    //   nzOnOk: (instance) => {
    //     return true;
    //   },
    // });
  }

  //#endregion
}

