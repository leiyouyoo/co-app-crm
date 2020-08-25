import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { InputBoolean, NzTableComponent } from 'ng-zorro-antd';
import { debounce } from '../utils';

@Directive({
  selector: 'nz-table[calcScroll]',
})
export class CalcNzTableBodyScrollDirective implements AfterContentInit, AfterViewChecked {
  @Input() @InputBoolean() disableCalcX = false;
  el: HTMLElement;
  lastHeight = 0;

  constructor(private host: ElementRef, private nzTableComponent: NzTableComponent) {}

  ngAfterContentInit(): void {
    this.el = this.host.nativeElement;
  }

  ngAfterViewChecked(): void {
    if (this.lastHeight !== this.el.clientHeight) {
      this.lastHeight = this.el.clientHeight;
      this.calc();
    }
  }

  // todo performance
  @HostListener('window:resize')
  @debounce()
  calc() {
    setTimeout(() => {
      const thead = this.el.querySelector('.ant-table-thead');
      this.nzTableComponent.nzScroll = {
        x: this.disableCalcX ? this.nzTableComponent.scrollX : `${this.el.clientWidth - 8}px`,
        y: `${this.el.clientHeight - thead.clientHeight}px`,
      };
      this.nzTableComponent.ngOnChanges({ nzScroll: this.nzTableComponent.nzScroll } as any);
      // hack
      //@ts-ignore
      (this.nzTableComponent.cdr as ChangeDetectorRef).markForCheck();
    });
  }
}
