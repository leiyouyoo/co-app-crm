import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'crm-customer-email',
  templateUrl: './customer-email.component.html',
  styleUrls: ['./customer-email.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerEmailComponent implements OnInit {
  @Input() customerId: string;

  constructor() { }

  ngOnInit(): void {
  }

}
