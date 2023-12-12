import { Component } from '@angular/core';
import {SideNavService} from "../../../../core/services/side-nav.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.sass'
})
export class MenuComponent {
  constructor(
    private sideNavService: SideNavService
  ) {
    this.sideNavService.changeSelection(1);
  }

}
