import { Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { LocationListComponent } from '../location/location-list/location-list.component';
import { ContactsListComponent } from '../contact/contacts-list/contacts-list.component';
import { CreateContactsComponent } from '../contact/create-contacts/create-contacts.component';
import { CreateLocationComponent } from '../location/create-location/create-location.component';
import { NzMessageService } from 'ng-zorro-antd';
import { CustomerAuthComponent } from '../customer-auth/customer-auth.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'partner-details',
  templateUrl: './partner-details.component.html',
  styleUrls: ['./partner-details.component.less'],
})
export class PartnerDetailsComponent implements OnInit {
  customerId: any = this.activeRoute.snapshot.params.id;
  @Output() private outerPartnerDetails = new EventEmitter<string>();
  @Input() partnerId: any;
  @Input() isOwner: any;

  contactOrlocation = 0;
  partnerInfo: any;
  partnerName: string;
  partnerDetial: any;
  partnerIsOwner: any;
  edit = false;
  cusState:any;

  constructor(
    private activeRoute: ActivatedRoute,
    private el: ElementRef,
    private translate: TranslateService,
    private customerService: CustomerService,
    public msessage: NzMessageService,
  ) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getdetial();
  }

  getdetial() {
    this.getPartner(this.partnerId).subscribe(
      (res: any) => {
        this.partnerName = res.name;
        this.partnerInfo = res;
        this.partnerIsOwner = res.isOwner;

        this.cusState = res?.partnerCustomer?.state;

        if (this.partnerInfo) {
          this.partnerInfo.locationCount = res.locationCount;
          this.partnerInfo.contactCount = res.contactCount;
        }
      },
      (err) => {},
    );
  }

  back() {
    this.outerPartnerDetails.emit();
  }

  getPartner(id: any) {
    return this.customerService.getPartner(id);
  }

  onBack() {
    this.outerPartnerDetails.emit();
  }
}
