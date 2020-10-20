import { Component, Input, OnInit } from '@angular/core';
import { CRMLocationExternalService } from 'apps/crm/app/services/crm';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'fcm-address-detail-modal',
  templateUrl: './address-detail-modal.component.html',
  styleUrls: ['./address-detail-modal.component.less'],
})
export class AddressDetailModalComponent implements OnInit {
  address: any;
  @Input() customerId: any;
  @Input() countryId: any;
  expectDeliveryType: any;
  expectDeliveryDate: any;
  addressList: any;
  constructor(private locationExternalService: CRMLocationExternalService) {}

  ngOnInit(): void {
    this.getCustomerLocationAndFBALocations(null);
  }

  onSearchAddress(text = null) {
    this.getCustomerLocationAndFBALocations(text);
  }

  // 获取地址
  async getCustomerLocationAndFBALocations(text = null) {
    let res = await this.locationExternalService
      .getAllForUiPicker({ searchText: text, locationType: 1, customerId: this.customerId, countryId: this.countryId })
      .toPromise();
    this.addressList = res.items;
  }
}
