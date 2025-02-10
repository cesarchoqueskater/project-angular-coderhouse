import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { MultiplyDirective } from './directives/multiply.directive';
import { FontsizeDirective } from './directives/fontsize.directive';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    FullNamePipe,
    HighlightDirective,
    MultiplyDirective,
    FontsizeDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [FullNamePipe,HighlightDirective, MultiplyDirective,FontsizeDirective,MatListModule]
})
export class SharedModule { }
