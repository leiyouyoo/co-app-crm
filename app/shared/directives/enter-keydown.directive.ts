import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[enterKeydown]',
})
export class EnterKeydownDirective {

  @Output() enterKeydown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

  constructor() {
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (!e || e.defaultPrevented) {
      return;
    }
    if (e.key === '13' || e.keyCode === 13) { // enter 键
      this.enterKeydown.emit(e);
    }
  }

}
