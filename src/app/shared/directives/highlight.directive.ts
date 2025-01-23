import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class HighlightDirective implements OnChanges{
  @Input()
  appHighlight = 'yellow'  

  @Input()
  bolder = false

  @Output()
  colorUpdate = new EventEmitter();


  constructor(
    private elementRef: ElementRef
  ) { 
    console.log(this.elementRef)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if( changes['appHighlight'] ){
      this.updateColor();
    }

    if( changes['bolder']){
      this.updateFontWeight()
    }
  }

  updateColor(){
    this.elementRef.nativeElement.style.backgroundColor = this.appHighlight || 'yellow';
    this.colorUpdate.emit()
  }

  updateFontWeight(){
    this.elementRef.nativeElement.style.fontWeight =  this.bolder ? 'bolder' : 'unset';
  }

}
