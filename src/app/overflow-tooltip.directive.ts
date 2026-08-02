import {AfterViewChecked, Directive, ElementRef, inject} from '@angular/core';
import {MatTooltip} from '@angular/material/tooltip';

// The overview cards are a fifth of the row wide, so a line longer than this is clipped with no way
// to read the rest of it. Reading the row's own text keeps the tooltip correct as values change,
// rather than repeating every label in a tooltip expression.
const VISIBLE_CHARACTERS = 26;

@Directive({
  selector: '[overflowTooltip]',
  hostDirectives: [MatTooltip]
})
export class OverflowTooltipDirective implements AfterViewChecked {
  private element: ElementRef<HTMLElement> = inject(ElementRef);
  private tooltip = inject(MatTooltip);

  ngAfterViewChecked(){
    const text = (this.element.nativeElement.textContent || '').replace(/\s+/g, ' ').trim();
    this.tooltip.message = text.length > VISIBLE_CHARACTERS ? text : '';
  }
}
