import { Component, Output, Input, EventEmitter, OnInit, SimpleChanges } from '@angular/core';

/**
 * 船期查询-列表
 */
@Component({
  selector: 'sailing-schedules-content',
  templateUrl: './sailing-schedules-content.component.html',
  styleUrls: ['./sailing-schedules-content.component.less'],
})
export class SailingSchedulesContentComponent {
  @Input() maxResultCount: any;
  @Input() skipCount: any;

  @Input() datas: any;

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onMaxResultCountChanged = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSkipCountChanged = new EventEmitter();
  @Input() loading: any;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSortChanged = new EventEmitter();
  /**
   *
   */
  constructor() {}

  /**
   *
   * @param changes
   */
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.datas && changes.datas.currentValue) {
      this.datas = changes.datas && changes.datas.currentValue;
    }

    if (changes.maxResultCount && changes.maxResultCount.currentValue) {
      this.maxResultCount = changes.maxResultCount && changes.maxResultCount.currentValue;
    }

    if (changes.skipCount && changes.skipCount.currentValue) {
      this.skipCount = changes.skipCount && changes.skipCount.currentValue;
    }
  }

  /**
   * 偏移量改变
   */
  onPageIndexChanged(pageIndex) {
    this.onSkipCountChanged.emit(pageIndex);
  }

  /**
   * 页大小改变
   */
  onPageSizeChanged(maxResultCount) {
    // tslint:disable-next-line: object-literal-shorthand
    this.onMaxResultCountChanged.emit(maxResultCount);
  }

  /**
   * 排序
   */
  sort(sortName: string, value: string): void {
    this.onSortChanged.emit({
      sortName: sortName,
      value: value,
    });
  }
}
