import { Component, Input } from '@angular/core';
import { SailService } from 'projects/cityocean/sail-library/src/public-api';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import domToImage from 'dom-to-image';
// import { environment } from '@env/environment';

// import { isIE } from '@cityocean/shared-library';

@Component({
  selector: 'app-share-ocean',
  templateUrl: './share-ocean.component.html',
  styleUrls: ['./share-ocean.component.less'],
})
export class ShareOceanComponent {
  @Input() data: any;
  @Input() set cacheKey(data: any) {
    this.copyUrl =
      window.location.origin + '/share/#/redirect?redirectType=rates&isForShare=true&id=' + encodeURIComponent(data);
  }
  // 船期查询表格
  sailVisible = false;
  sailSkipCount = 1;
  sailMaxResultCount = 10;
  sailDatas: any;
  currentSailingSchdules: any;
  salesmanId: any;
  isSailLoading: any;
  rateInfo: any;
  copyUrl: any;
  url = environment.apiUrlPrefix + '/Storage/File/GetDownLoadFile?fileId=';
  constructor(
    public sailingSchedulesService: SailService,
    private msg: NzMessageService,
    private translate: TranslateService,
  ) { }

  onTips() {
    this.msg.success(this.translate.instant('Copy Success!'));
  }

  onSavePNG() {
    this.data.cacheItem.forEach((e, i) => {
      let id = 'share' + i;
      let node = document.getElementById(id);

      domToImage
        .toPng(node, {
          cacheBust: true,
          width: node.scrollWidth,
        } as any)
        .then((data) => {
          let a: any = document.createElement('a'); //Create <a>
          a.href = data; //Image Base64 Goes here
          a.download =
            this.data.cacheItem[i].pol +
            (this.data.cacheItem[i].pod ? this.data.cacheItem[i].pod : this.data.cacheItem[i].delivery) +
            '.png'; //File name Here
          a.click();
        });
    });
  }

  generateCopyDom = () => {
    return this.data.cacheItem.map((e, i) => {
      let id = 'share' + i;
      return document.getElementById(id);
    })
  }

  isIE() {
    // return isIE();
  }

  /**
   * 页大小改变
   * @param maxResultCount 页大小
   */
  onSailMaxResultCountChanged(maxResultCount: number) {
    this.sailMaxResultCount = maxResultCount;
    this.onGetSails(this.currentSailingSchdules);
  }

  /**
   * 偏移量改变
   * @param skipCount 偏移量
   */
  onSailSkipCountChanged(skipCount: number) {
    this.sailSkipCount = skipCount;
    this.onGetSails(this.currentSailingSchdules);
  }

  onGetSails(detail?: any) {
    detail.polId = 'c83fb48c-6ecd-4fe5-853b-7f3e49bae3ad';
    detail.podId = '0ba7c2c9-6aa0-4558-b34a-4a238bab8888';

    if (detail) {
      this.currentSailingSchdules = detail;
    }

    this.isSailLoading = true;
    let num = this.sailSkipCount - 1;
    this.sailDatas = null;
    this.sailingSchedulesService
      .getSailingSchedules({
        OrigPortId: this.currentSailingSchdules.polId,
        DestPortId: this.currentSailingSchdules.podId,
        CarrierCode: [],
        MaxResultCount: this.sailMaxResultCount,
        SkipCount: num * this.sailMaxResultCount,
      })
      .subscribe(
        (res) => {
          this.sailDatas = res;
          this.isSailLoading = false;
        },
        () => {
          this.sailDatas = { items: [], totalCount: 0 };
          this.isSailLoading = false;
        },
      );
  }

  goCsp() {
    // window.open('/csp/#/bookings');
  }
}
