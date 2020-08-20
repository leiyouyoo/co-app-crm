import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { RecordEditComponent } from '../../../../shared/components/record-edit/record-edit.component';
import { ShowImageComponent } from './show-image/show-image.component';
import { environment } from '@env/environment';
import { ActivatedRoute } from '@angular/router';
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
  url = environment.StoreUrl;
  id = null;
  imgList = [];
  dataDetail = null;
  isImgVisible = false;
  searchObj = {
    Content: null,
    Sorting: null,
    MaxResultCount: this.pageSize,
    SkipCount: 0,
    CustomerId: null,
  };

  @Input() isOwner: any;

  constructor(private customerService: CustomerService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.searchObj.CustomerId = this.activatedRoute.snapshot.params.id;
    this.customerService.getTraceLog(this.searchObj).subscribe((res: any) => {
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
      this.recordEditComponent.recordTitle = '新增跟进记录';
      this.recordEditComponent.okText = '保存';
      this.recordEditComponent.showModal(type, null);
    } else if (type === 2) {
      // 修改
      this.customerService.getTraceLogDetail(id).subscribe((res: any) => {
        this.dataDetail = res;
        this.recordEditComponent.showModal(type, this.dataDetail);
      });
      this.recordEditComponent.recordTitle = '修改跟进记录';
      this.recordEditComponent.okText = '保存';
    } else {
      // 查看
      this.customerService.getTraceLogDetail(id).subscribe((res: any) => {
        this.dataDetail = res;
        this.recordEditComponent.showModal(type, this.dataDetail);
      });
      this.recordEditComponent.recordTitle = '跟进记录详情';
      this.recordEditComponent.okText = '确定';
    }
    this.recordEditComponent.isVisible = true;
  }

  pageIndexChange(event: number): void {
    this.pageIndex = event;

    if (event > 1) {
      this.searchObj.SkipCount = this.searchObj.MaxResultCount * (event - 1);
    } else {
      this.searchObj.SkipCount = 0;
    }
    this.getList();
  }
  nzPageSizeChange(event: number): void {
    this.pageSize = event;
    this.searchObj.MaxResultCount = event;
    this.getList();
  }
}
