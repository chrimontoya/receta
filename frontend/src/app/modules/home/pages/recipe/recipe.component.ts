import { Component } from '@angular/core';
import {SideNavService} from "../../../../core/services/side-nav.service";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.sass'
})
export class RecipeComponent {
  constructor(
    private sideNavService: SideNavService
  ) {
    this.sideNavService.changeSelection(0);
  }


}
