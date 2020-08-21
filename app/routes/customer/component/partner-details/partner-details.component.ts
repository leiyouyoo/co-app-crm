import { Component, OnInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { CRMPartnerService } from 'apps/crm/app/services/crm';

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
  cusState: any;

  constructor(private activeRoute: ActivatedRoute, public msessage: NzMessageService, private crmPartnerService: CRMPartnerService) {}

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
    return this.crmPartnerService.get({
      id: id,
    });
  }

  onBack() {
    this.outerPartnerDetails.emit();
  }
}
