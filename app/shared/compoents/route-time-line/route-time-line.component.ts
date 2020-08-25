import { Component, OnInit, Input } from '@angular/core';

enum FreightMethodType {
  Unknown,
  Ocean,
  Air,
}


@Component({
  selector: 'route-time-line',
  templateUrl: './route-time-line.component.html',
  styleUrls: ['./route-time-line.component.less']
})
export class RouteTimeLineComponent implements OnInit {

  @Input() originAddress: any = {};
  @Input() destinationAddress: any = {};
  @Input() originPort: any = {};
  @Input() destinationPort: any = {};
  @Input() freightMethodType: FreightMethodType;


  @Input() subOriginAddress: any = null;
  @Input() subDestinationAddress: any = null;
  @Input() subOriginPort: any = null;
  @Input() subDestinationPort: any = null;

readonly FreightMethodType = FreightMethodType;

  constructor() { }

  ngOnInit() {
  }

}
