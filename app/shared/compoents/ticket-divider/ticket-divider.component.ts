import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ticket-divider',
  templateUrl: './ticket-divider.component.html',
  styleUrls: ['./ticket-divider.component.less']
})
export class TicketDividerComponent implements OnInit {
  _size = 20;
  @Input() set size(val) {
    this._size = val;
    if (this.paddingX === void 0) {
      this.paddingXpx = val * .8;
    }
  }
  get size() {
    return this._size;
  }
  @Input() paddingX;
  @Input() borderWidth = 2;
  paddingXpx = this._size * .8;

  constructor() { }

  ngOnInit(): void {
  }

}
