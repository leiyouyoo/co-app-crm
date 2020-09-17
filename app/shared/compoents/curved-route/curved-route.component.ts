import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { jsPlumb, jsPlumbInstance } from 'jsplumb';
import { debounce } from '../../utils/debounce';

@Component({
  selector: 'curved-route',
  templateUrl: './curved-route.component.html',
  styleUrls: ['./curved-route.component.less'],
})
export class CurvedRouteComponent implements OnInit {
  _data;
  @Input() set data(val) {
    this._data = val;
    if (val?.freightType === 0) {
      val = { ...val, freightType: 1 };
    }
    if (val && JSON.stringify(val) !== '{}') {
      this.drawRoute();
    }
  }
  get data() {
    return this._data;
  }
  @ViewChild('route') routeRef: ElementRef;
  @Input() transitTime: string;
  get transitTimeDisplay() {
    if (this.transitTime) return this.transitTime;
    return this.data?.quoteReplys?.[0]?.transitTime;
  }
  @Input() typeId: number;
  plumbInstance: jsPlumbInstance;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  @debounce(200)
  drawRoute() {
    this.plumbInstance?.deleteEveryConnection();
    setTimeout(() => {
      const locationList = Array.from((this.routeRef.nativeElement as HTMLDivElement).querySelectorAll('i')).filter(
        (o) => !(o.offsetHeight === 0 && o.offsetWidth === 0),
      );
      const instance = jsPlumb.getInstance({
        PaintStyle: {
          strokeWidth: 2,
          stroke: ' rgba(0,0,0, 0.2)',
          'stroke-dasharray': [20, 10],
        },
        // Endpoint:[ 'Blank', ],
        Connector: ['Bezier', { curviness: 40 }],
        Anchors: [
          [1, 0.2, 1, -1],
          [0, 0.2, -1, -1],
        ],
      } as any);
      instance.ready(() => {
        locationList.every((o, i) => {
          if (i > locationList.length - 2) return false;
          instance.connect({
            source: o.id,
            target: locationList[i + 1].id,
            connector: ['Bezier', { curviness: o.id.endsWith('i2') ? 90 : 55 }],
            endpoint: 'Blank',
            overlays: [['Arrow', { location: 1, width: 10, length: 10 }]],
          });
          return true;
        });
      });
      this.plumbInstance = instance;
    }, 0);
  }
}
