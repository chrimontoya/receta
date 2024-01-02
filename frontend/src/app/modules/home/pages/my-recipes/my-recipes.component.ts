import { Component } from '@angular/core';
import {SideNavService} from "../../../../core/services/side-nav.service";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Ingredient} from "../../../../core/models/my-recipes/Ingredient";
import {MatListModule} from "@angular/material/list";
import {JsonPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {
  addRecipeUrl: string = "agregar-receta";

  constructor(
    private sideNavService: SideNavService,
  ) {
    this.sideNavService.changeSelection(2);


  }


  openFormToAddRecipe(){

  }

}



// {
//   ingredient1: new FormGroup({
//     id: new FormControl(),
//     name: new FormControl(),
//     cant: new FormControl(),
//     kilogram: new FormControl(),
//   }),
// }
//
//
// {
//   step1: new FormGroup({
//     description: new FormControl(),
//     number: new FormControl(),
//   }
