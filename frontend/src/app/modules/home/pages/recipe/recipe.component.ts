import { Component } from '@angular/core';
import {SideNavService} from "../../../../core/services/side-nav.service";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RecipeCardComponent} from "../../../../core/components/recipe-card/recipe-card.component";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    RecipeCardComponent
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {
  constructor(
    private sideNavService: SideNavService
  ) {
    this.sideNavService.changeSelection(0);
  }


}
