import { Directive, input } from '@angular/core';

@Directive({
  selector: '[appActiveHighlight]',
  host: {
    '[class.active-card]': 'appActiveHighlight()',
  },
})
export class ActiveHighlight {
  appActiveHighlight = input<boolean>();
}
