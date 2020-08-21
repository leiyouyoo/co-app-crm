import { Component, OnInit, HostListener } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.less'],
})
export class InquiryListComponent implements OnInit {
  constructor(public translate: TranslateService, public activeRoute: ActivatedRoute, private router: Router) { }
  selectIndex = 0;
  type: any;
  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      if (params?.type) {
        if (params?.type == 1) {
          this.selectIndex = 0;
          this.type = 0;
        } else if (params?.type == 3) {
          this.selectIndex = 1;
          this.type = 1;
        }
      }
    });
    //
  }

  onselectRate(event) {
    if (this.type !== undefined && this.type != event.index) this.router.navigate(['/crm/inquiry/list/']);
  }
}
