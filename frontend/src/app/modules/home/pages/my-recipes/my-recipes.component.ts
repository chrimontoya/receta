import { Component } from '@angular/core';
import {SideNavService} from "../../../../core/services/side-nav.service";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Ingredient} from "../../../../core/models/my-recipes/Ingredient";
import {MatListModule} from "@angular/material/list";
import {JsonPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatListModule,
    NgForOf,
    KeyValuePipe,
    NgIf,
    MatButtonModule
  ],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {
  recipeForm: FormGroup = this.fb.group({});
  ingredientList!: FormArray;
  constructor(
    private sideNavService: SideNavService,
    private fb: FormBuilder
  ) {
    this.sideNavService.changeSelection(2);

    this.recipeForm = this.fb.group({
      title: new FormControl(),
      description: new FormControl(),
      portion: new FormControl(),
      timeDuration: new FormControl(),
      ingredients: this.fb.array([this.createIngredient()]),
    });

    this.ingredientList = this.recipeForm.get('ingredients') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      kilogram: new FormControl(),
      cant: new FormControl(),
    });
  }

  addIngredient(){
    this.ingredientList.push(this.createIngredient());
  }
  getIngredientsForm(): FormArray{
    return this.recipeForm.get('ingredients') as FormArray;
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
