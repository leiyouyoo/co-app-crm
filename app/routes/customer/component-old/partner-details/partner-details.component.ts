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

  partnerInfo: any;

  constructor(private activeRoute: ActivatedRoute, public msessage: NzMessageService, private crmPartnerService: CRMPartnerService) {}

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.getDetail();
  }

  getDetail() {
    this.crmPartnerService
      .get({
        id: this.partnerId,
      })
      .subscribe(
        (res: any) => {
          this.partnerInfo = res;
        },
        (err) => {},
      );
  }

  onBack() {
    this.outerPartnerDetails.emit();
  }
}
