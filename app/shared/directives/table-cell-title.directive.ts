import {AfterViewInit, Directive, ElementRef, Host, Optional, Renderer2} from '@angular/core';
import {NzTableComponent} from 'ng-zorro-antd';

@Directive({
  selector: 'td:not(.nz-disable-td):not([data-no-title])',
})
export class TableCellTitleDirective implements AfterViewInit {

  constructor(private render: Renderer2, private elRef: ElementRef, @Optional() @Host() private host: NzTableComponent) {
  }

  ngAfterViewInit() {
    const el = this.elRef.nativeElement;
    if (this.host && el.attributes.getNamedItem('title') === null) {
      this.render.setAttribute(el, 'title', el.innerText);
    }
  }

}
