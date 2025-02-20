import { Component,EventEmitter,Output } from '@angular/core';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  @Output() drawerToggle = new EventEmitter()

  baseApiUrl = environment.baseApiUrl;

}
