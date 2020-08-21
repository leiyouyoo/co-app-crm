import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RecordEditComponent } from '../../../../shared/compoents/customer/record-edit/record-edit.component';
import { ShowImageComponent } from './show-image/show-image.component';
import { ActivatedRoute } from '@angular/router';
import { CoConfigManager } from '@co/core';
import { CRMTraceLogService } from 'apps/crm/app/services/crm';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'customer-customer-record',
  templateUrl: './customer-record.component.html',
  styleUrls: ['./customer-record.component.less'],
})
export class CustomerRecordComponent implements OnInit {
  @ViewChild(RecordEditComponent, { static: true })
  recordEditComponent: RecordEditComponent;
  @ViewChild(ShowImageComponent, { static: true })
  showImageComponent: ShowImageComponent;
  listOfData = [];
  pageIndex = 1;
  pageSize = 10;
  showPage = false;
  total = 0;
  url = CoConfigManager.getValue('storeUrl');
  id = null;
  imgList = [];
  dataDetail = null;
  isImgVisible = false;
  searchObj = {
    content: null,
    sorting: null,
    maxResultCount: this.pageSize,
    skipCount: 0,
    customerId: null,
  };

  @Input() isOwner: any;

  constructor(
    private translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    private crmTraceLogService: CRMTraceLogService,
  ) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.searchObj.customerId = this.activatedRoute.snapshot.params.id;
    this.crmTraceLogService.getAll(this.searchObj).subscribe((res: any) => {
      this.listOfData = res.items;
      this.total = res.totalCount;
      this.showPage = this.total > 10 ? true : false;
    });
  }
  showImgModal(i) {
    this.imgList = [];
    if (this.listOfData[i].traceLogItems) {
      this.listOfData[i].traceLogItems.forEach((element) => {
        this.imgList.push({
          url: this.url + '/Storage/File/GetDownLoadFile?FileId=' + element.fileId + '&Handler=raw',
          id: element.fileId,
        });
      });
    }
    this.showImageComponent.isImgVisible = true;
    this.showImageComponent.imgList = this.imgList;
    this.showImageComponent.imgIndex = 0;
  }
  addOrUpdateData(type, id) {
    this.id = id;
    if (type === 1) {
      // 新增
      this.recordEditComponent.recordTitle = this.translate.instant('Add follow-up record');
      this.recordEditComponent.okText = this.translate.instant('Save');
      this.recordEditComponent.showModal(type, null);
    } else if (type === 2) {
      // 修改
      this.crmTraceLogService.get(id).subscribe((res: any) => {
        this.dataDetail = res;
        this.recordEditComponent.showModal(type, this.dataDetail);
      });
      this.recordEditComponent.recordTitle = this.translate.instant('Modify follow-up record');
      this.recordEditComponent.okText = this.translate.instant('Save');
    } else {
      // 查看
      this.crmTraceLogService.get(id).subscribe((res: any) => {
        this.dataDetail = res;
        this.recordEditComponent.showModal(type, this.dataDetail);
      });
      this.recordEditComponent.recordTitle = this.translate.instant('Follow up record details');
      this.recordEditComponent.okText = this.translate.instant('OK');
    }
    this.recordEditComponent.isVisible = true;
  }

  pageIndexChange(event: number): void {
    this.pageIndex = event;

    if (event > 1) {
      this.searchObj.skipCount = this.searchObj.maxResultCount * (event - 1);
    } else {
      this.searchObj.skipCount = 0;
    }
    this.getList();
  }
  nzPageSizeChange(event: number): void {
    this.pageSize = event;
    this.searchObj.maxResultCount = event;
    this.getList();
  }
}
