import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SideNavService} from "../../../../core/services/side-nav.service";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    NgStyle,
    RouterLink
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  idButtonSelected: number = 0;
  primaryColor: string = "#FF8E3C";
  secondaryColor: string = "#FFFFFE";
  constructor(
    private sideNavService: SideNavService
  ) {
    this.sideNavService.buttonSelected
      .subscribe( (idButton) => {
        this.idButtonSelected = idButton;
      });
  }
}
