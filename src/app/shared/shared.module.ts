import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { MultiplyDirective } from './directives/multiply.directive';
import { FontsizeDirective } from './directives/fontsize.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    HighlightDirective,
    MultiplyDirective,
    FontsizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [FullNamePipe,HighlightDirective, MultiplyDirective,FontsizeDirective]
})
export class SharedModule { }
