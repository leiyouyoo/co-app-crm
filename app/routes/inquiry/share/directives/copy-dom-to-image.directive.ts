import { Directive, HostBinding, HostListener, Input, NgZone } from '@angular/core';
import { DomToImageService } from '../services/dom-to-image.service';
import { NzButtonComponent } from 'ng-zorro-antd';

function makeSureArray(val) {
  if (Array.isArray(val)) {
    return val;
  } else {
    return [val];
  }
}

@Directive({
  selector: '[copyDomToImage]'
})
export class CopyDomToImageDirective {
  @Input() copyDomToImage: HTMLElement;
  @Input() domGenerator: () => HTMLElement | HTMLElement[] | Promise<HTMLElement> | Promise<HTMLElement[]>;
  @Input() domToImageOption = {};
  set nzLoading(val: boolean) {
    this.nzButtonComponent.nzLoading = val;
    //@ts-ignore
    this.nzButtonComponent.cdr.detectChanges();
  };

  constructor(public domToImageService: DomToImageService,
    private nzButtonComponent: NzButtonComponent,
  ) {
  }
  @HostListener('click')
  copyImage() {
    this.nzLoading = true;
    const func = (domArr: HTMLElement[]) => {
      this.domToImageService.copyImageByDom(domArr, {
        cacheBust: true,
        ...this.domToImageOption,
      }).finally(() => {
        this.nzLoading = false;
      }).catch(e => {
        console.error(e, "error Info")
      })
    }
    if (this.domGenerator) {
      const domOrPromise = this.domGenerator();
      if (domOrPromise instanceof Promise) {
        (domOrPromise as Promise<any>)
          .then((dom) => {
            func(makeSureArray(dom))
          })
      } else {
        func(makeSureArray(domOrPromise))
      }
    } else {
      func(makeSureArray(this.copyDomToImage));
    }
  }
}
