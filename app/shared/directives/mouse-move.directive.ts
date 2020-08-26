import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[mouseMoveEvent]'
})
export class MouseMoveDirective {
  @Output() mouseMove = new EventEmitter<ElementRef>();
  @Output() mouseUp = new EventEmitter<ElementRef>();
  constructor(private el: ElementRef) { }

  @HostListener('mousemove') onmouseover() {
    this.mouseMove.next(this.el);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp() {
    this.mouseUp.next(this.el)
  }



}

