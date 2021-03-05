import { Component, Input, OnInit } from '@angular/core';
import { StorageCSPExcelService } from '@co/cds';
import { UploadXHRArgs } from 'ng-zorro-antd/upload';
import { CoSessionService, _HttpClient } from '@co/common';
import { CRMLocationExternalService } from 'apps/crm/app/services/crm';
import { CoPageBase, CoConfigManager } from '@co/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { AddressDetailModalComponent } from './address-detail-modal/address-detail-modal.component';
import { CSPBookingService } from 'apps/crm/app/services/csp';

@Component({
  selector: 'fcm-new-packing-list',
  templateUrl: './new-packing-list.component.html',
  styleUrls: ['./new-packing-list.component.less'],
})
export class NewPackingListComponent implements OnInit {
  @Input() customerId: any;
  @Input() orderInfo: any;
  @Input() set bindData(id: any) {
    if (id) {
      this.bookingId = id;
      this.setData();
    }
  }

  datas: any;
  bookingId: any;
  saveLoading = false;
  allChecked = false;
  addressList: any;
  hideAddress = true;
  edit = false;
  imgUrl = this.http.environment.SERVER_URL;
  downUrl = this.http.environment.SERVER_URL + '/CSP/Booking/ClearanceInviocesDownload'; //下载

  loading = false;
  constructor(
    private translate: TranslateService,
    private modal: NzModalService,
    private locationExternalService: CRMLocationExternalService,
    private message: NzMessageService,
    private bookingService: CSPBookingService,
    public http: _HttpClient,
    public cSPExcelService: StorageCSPExcelService,
  ) {}

  ngOnInit(): void {
    this.getCustomerLocationAndFBALocations();
  }

  // 获取地址
  async getCustomerLocationAndFBALocations(ids = null) {
    let res = await this.locationExternalService
      .getAllForUiPicker({ ids: ids, locationType: 1, customerId: this.customerId, countryId: this.orderInfo?.countryId })
      .toPromise();
    this.addressList = res.items;
  }

  newCustomReq = (item: UploadXHRArgs) => {
    this.edit = true;
    this.loading = true;
    let parame: any = {
      file: item.file as any,
    };

    if (this.bookingId) {
      parame.bookingId = this.bookingId;
    }

    this.cSPExcelService.importPackingList(parame).subscribe(
      async (res: any) => {
        this.loading = false;
        //导入成功
        this.datas = res.data;
        let addressIds = this.datas?.cartons.filter((e) => e.address?.id);
        if (this.orderInfo?.destinationAddressId) {
          addressIds.push(this.orderInfo.destinationAddressId);
        }

        await this.getCustomerLocationAndFBALocations(addressIds);
        this.datas?.cartons.forEach((item) => {
          if (!item.expectDeliveryType && this.orderInfo?.expectDeliveryType) {
            item.expectDeliveryType = Number(this.orderInfo.expectDeliveryType);
          }

          if (!item.remark && this.orderInfo?.remark) {
            item.remark = this.orderInfo.remark;
          }

          if (!item.address) {
            let address = this.addressList?.find((e) => e.id === this.orderInfo?.destinationAddressId);
            item.address = address;
          }
        });
      },
      (error) => {
        console.error('excel File Insert DB Error', error);
      },
    );
  };

  downTemplate() {
    let name = 'FBA-UpLoad-Template';
    window.open(CoConfigManager.getValue('serverUrl') + '/Storage/ExcelTemplate/Get?name=' + name);
  }

  downExcel() {
    this.cSPExcelService
      .exportPackingList({
        businessIds: [this.bookingId],
      })
      .subscribe(
        (res: any) => {
          this.downloadExcel(res.fileName, res.fileToken, res.fileType);
        },
        (error) => {
          console.error('excel File Insert DB Error', error);
        },
      );
  }

  downloadExcel(FileName: string, FileToken: string, FileType: string) {
    return window.open(
      CoConfigManager.getValue('serverUrl') +
        '/Storage/Excel/DownloadExcel?FileName=' +
        FileName +
        '&&FileToken=' +
        FileToken +
        '&&FileType=' +
        FileType,
    );
  }

  onItemChecked(data, event) {
    data.checked = event;
    this.allChecked = this.datas?.cartons.every((e) => e.checked === true);

    this.bindAddress();
  }

  onAllChecked(event) {
    this.allChecked = event;
    this.datas?.cartons.forEach((e) => {
      e.checked = event;
    });
    this.bindAddress();
  }

  bindAddress() {
    if (this.datas?.cartons.some((e) => e.checked === true)) {
      this.hideAddress = false;
    } else {
      this.hideAddress = true;
    }
  }

  showAddressModal() {
    const modal = this.modal.create({
      nzTitle: this.translate.instant('Choose Address'),
      nzContent: AddressDetailModalComponent,
      nzComponentParams: {
        customerId: this.customerId,
        countryId: this.orderInfo?.countryId,
      },
      nzClosable: false,
      nzOnOk: (data) =>
        new Promise(async (resolve, reject) => {
          if (data) {
            if (!data.address) {
              this.message.warning(this.translate.instant('Please enter Address'));
              resolve(false);
              return;
            }

            if (!data.expectDeliveryType) {
              this.message.warning(this.translate.instant('Please enter Type'));
              resolve(false);
              return;
            }

            if (data.expectDeliveryType === -1 && !data.expectDeliveryDate) {
              this.message.warning(this.translate.instant('Please enter Date'));
              resolve(false);
              return;
            }
          }
          await this.getCustomerLocationAndFBALocations([data.address.id]);
          this.datas?.cartons.forEach((e: any) => {
            if (e.checked) {
              let selectedsAddress = this.addressList.find((e) => e.id === data.address.id);
              e.address = selectedsAddress;
              e.expectDeliveryType = data.expectDeliveryType;
              e.expectDeliveryDate = data.expectDeliveryDate;
            }
          });
          resolve(true);
        }),
    });
    const instance = modal.getContentComponent();
  }

  saveData() {
    this.saveLoading = true;
    this.bookingService
      .savePackingList({
        bookingId: this.bookingId,
        customerId: this.customerId,
        products: this.datas?.products,
        cartons: this.datas?.cartons,
      })
      .subscribe(
        (res) => {
          this.saveLoading = false;
          this.message.success(this.translate.instant('Save Success') + '!');
        },
        (error) => {
          this.saveLoading = false;
          // this.message.error(error.error.error.message);
        },
      );
  }

  setData() {
    this.bookingService
      .getPackingList({
        id: this.bookingId,
      })
      .subscribe((res: any) => {
        this.datas = res;
        this.datas?.cartons.forEach((e) => {
          if (e.expectDeliveryType) {
            e.expectDeliveryType = Number(e.expectDeliveryType);
          }
          let data = this.addressList.find((e) => e.id === e.address?.id);
          if (data) {
            e.address = data;
          } else {
            if (e.address) {
              if (!e.address?.streetAddress) {
                e.address.streetAddress = e.address.name;
              }
              this.addressList.push(e.address);
            }
          }
        });
      });
  }
}
