import { Directive, ElementRef, SimpleChanges, EventEmitter, Input, Output } from '@angular/core';

@Directive({
  selector: '[appFontsize]',
  standalone: false
})
export class FontsizeDirective {


  constructor(
      private elementRef: ElementRef
    ) { 
        //console.log(this.elementRef)
        this.elementRef.nativeElement.style.fontSize = '20px'
    }


}
