import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { debounce } from '@co/core';

@Directive({
  selector: '[wrapChildrenHeight]',
})
export class WrapChildrenHeightDirective {
  @Input() set wrapChildrenHeight(val: any) {
    this.calc(null);
  }

  constructor(private elementRef: ElementRef,
              private renderer2: Renderer2,
              ) { }

  @HostListener('window:resize', ['$event'])
  @debounce(200)
  calc(e) {
    const el = this.elementRef.nativeElement as HTMLElement;
    const height = Array.from(el.children || [])
      .reduce((acc, cur) => {
        const _height = cur.getBoundingClientRect().height;
        return _height > acc ? _height : acc;
      }, 0)

    if (!height) return;
    this.renderer2.setStyle(el, 'height', `${height}px`);
  }
}
