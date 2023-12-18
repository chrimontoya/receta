import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SideNavService} from "../../../../core/services/side-nav.service";
import {NgStyle} from "@angular/common";
import {getAuth, signOut} from "firebase/auth";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {AlertService} from "../../../../core/services/alert.service";

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
    private sideNavService: SideNavService,
    private router: Router,
    private alertService: AlertService,
  ) {
    this.sideNavService.buttonSelected
      .subscribe( (idButton) => {
        this.idButtonSelected = idButton;
      });
  }

  logOut(){
    signOut(getAuth())
      .then(res => {
        this.alertService.info('Se ha cerrado la sesión', 'Iniciar sesión');
        this.router.navigateByUrl('/login');
      });
  }
}
