import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crm-potentailcustomer-info',
  templateUrl: './potentailcustomer-info.component.html',
  styleUrls: ['./potentailcustomer-info.component.less'],
})
export class PotentailcustomerInfoComponent implements OnInit {
  index = 0;
  constructor() {}

  ngOnInit(): void {}

  onIndexChange(e) {
    this.index = e;
  }
}
