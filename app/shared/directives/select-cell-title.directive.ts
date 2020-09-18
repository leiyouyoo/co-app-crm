import {AfterViewInit, Directive, ElementRef, Host, Renderer2, SimpleChanges} from '@angular/core';
import {NzSelectComponent} from 'ng-zorro-antd';
import {take} from 'rxjs/operators';

@Directive({
  selector: 'nz-select',
})
export class SelectCellTitleDirective implements AfterViewInit {

  constructor(private render: Renderer2, private el: ElementRef, @Host() private host: NzSelectComponent) {
  }

  ngAfterViewInit() {
    this.setTopControlNgOnChanges();
    this.observeOptions();
  }

  setTopControlNgOnChanges() {
    const selectTopControlComponent = this.host.nzSelectTopControlComponent;
    const onChanges = selectTopControlComponent.ngOnChanges;
    selectTopControlComponent.ngOnChanges = (changes: SimpleChanges) => {
      onChanges.call(selectTopControlComponent, changes);
      if (changes.listOfTopItem !== undefined) {
        const labels = selectTopControlComponent.listOfTopItem.map(item => item.nzLabel).join();
        this.render.setAttribute(this.el.nativeElement, 'title', labels);
      }
    };
  }

  observeOptions() {
    this.host.cdkConnectedOverlay.attach.asObservable().pipe(take(1)).subscribe(() => {
      const overlayElement = this.host.cdkConnectedOverlay.overlayRef.overlayElement;
      const callback: MutationCallback = (mutationsList, observer) => {
        mutationsList.forEach(record => {
          if ((record.target as HTMLElement).classList.contains('cdk-virtual-scroll-content-wrapper')) {
            this.setTitle(record.target as HTMLElement);
          }
        });
      };
      const observer = new MutationObserver(callback);
      observer.observe(overlayElement, {childList: true, subtree: true});
    });
  }

  private setTitle(element: HTMLElement) {
    const options = element.getElementsByTagName('nz-option-item');
    [].forEach.call(options, option => {
      this.render.setAttribute(option, 'title', option.innerText);
    });
  }
}
