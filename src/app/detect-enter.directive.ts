import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDetectEnter]'
})
export class DetectEnterDirective {
  @Output() enterDetected = new EventEmitter<KeyboardEvent>();

  constructor() { }

  @HostListener('keyup', ['$event'])
  handleKeyUpOnComponent(e: KeyboardEvent): void {
    if (e.code === `Enter` || e.code === `NumpadEnter` || e.keyCode === 13) {
      this.enterDetected.next(e);
    }
  }

}
