import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
// import { RateService } from '../../../../../projects/cityocean/rate-library/src/lib/service/rate.service';
import { FormControl } from '@angular/forms';
import { NzSelectComponent } from 'ng-zorro-antd';
import { filter } from 'rxjs/operators';
import { merge } from 'rxjs';
// import { debounce } from '@shared/utils/debounce';
import { PUBPlaceService } from '@co/cds';
@Component({
  selector: 'app-trucking-from-to',
  templateUrl: './trucking-from-to.component.html',
  styleUrls: ['./trucking-from-to.component.less'],
})
export class TruckingFromToComponent implements OnInit, OnChanges {
  @Input() isFromPort: boolean = false; // isFromPort为true时，为港后场景，默认false为港前
  @Input() isVisibleEdit: boolean;

  @Input() controlFrom: FormControl;
  @Input() controlZipCode: FormControl;
  @Input() controlTo: FormControl;

  @Output() readonly fromChange = new EventEmitter<NzSelectComponent>();
  @Output() readonly toChange = new EventEmitter<NzSelectComponent>();
  @Output() readonly fromExtraChange = new EventEmitter<any>();
  @Output() readonly toExtraChange = new EventEmitter<any>();

  countyList: any[];
  toList: any[];

  constructor(
    // private rateService: RateService
    private pubPlace: PUBPlaceService,
  ) { }

  ngOnInit(): void {
    // 根据地址自动带出邮编
    const fromExtraChange$ = this.fromExtraChange.asObservable().pipe(filter(() => !this.isFromPort)); // 港前监听from
    const toExtraChange$ = this.toExtraChange.asObservable().pipe(filter(() => this.isFromPort)); // 港后时监听to
    merge(fromExtraChange$, toExtraChange$).subscribe((optionValue) => {
      this.controlZipCode.setValue((optionValue || { zipCode: null }).zipCode);
    });
  }

  ngOnChanges({ isFromPort }: SimpleChanges): void {
    if (!isFromPort.isFirstChange() && (isFromPort.currentValue !== isFromPort.previousValue)) {
      this.reverse();
    }
  }

  // 获取to /from 的基础数据
  @debounce(200)
  getFromList(value = null, id = null, isPort) {
    if (!value && !id) {
      return;
    }
    const params = { searchText: value, isPort: isPort, id: id, maxResultCount: 1000 };
    this.pubPlace.getFromToList(params).subscribe((res: any) => {
      this.countyList = res.items;
      if (res.items.length === 0) {
        this.controlFrom.reset();
      }
    });
  }

  @debounce(200)
  getToList(value = null, id = null, isPort) {
    if (!value && !id) {
      return;
    }
    const params = { searchText: value, isPort: isPort, id: id, maxResultCount: 1000 };
    this.pubPlace.getFromToList(params).subscribe((res: any) => {
      this.toList = res.items;
      if (res.items.length === 0) {
        this.controlTo.reset();
      }
    });
  }

  reverse() {
    const [from, to, countyList, toList] = [
      this.controlFrom.value,
      this.controlTo.value,
      this.countyList,
      this.toList,
    ];
    this.countyList = toList;
    this.toList = countyList;
    this.controlTo.setValue(from);
    this.controlFrom.setValue(to);
  }
}

export function debounce(delay: number = 300): MethodDecorator {
  // tslint:disable-next-line: only-arrow-functions
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const timeoutKey = Symbol();

    const original = descriptor.value;

    descriptor.value = function (...args) {
      clearTimeout(this[timeoutKey]);
      this[timeoutKey] = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}
