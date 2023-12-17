import {Component, HostListener} from '@angular/core';
import {SideNavService} from "../../../../core/services/side-nav.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RecipeCardComponent} from "../../../../core/components/recipe-card/recipe-card.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {ViewportRuler} from "@angular/cdk/overlay";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RecipeCardComponent,
    MatGridListModule,
    MatCardModule
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  cols: number = 1;
  constructor(
    private sideNavService: SideNavService,
    private viewportRuler: ViewportRuler
  ) {
    this.sideNavService.changeSelection(0);
    this.cols = Math.max(1, Math.min(Math.floor(this.viewportRuler.getViewportSize().width/325), 4));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cols = Math.max(1, Math.min(Math.floor(this.viewportRuler.getViewportSize().width/325), 4));
  }

}
