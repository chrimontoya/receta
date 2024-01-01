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
import {getAuth} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";
import {FirestoreService} from "../../../../core/services/firestore.service";
import {AlertService} from "../../../../core/services/alert.service";

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
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {
  recipeForm: FormGroup = this.fb.group({});
  ingredientList!: FormArray;
  stepList!: FormArray;
  constructor(
    private sideNavService: SideNavService,
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private alertService: AlertService,
  ) {
    this.sideNavService.changeSelection(2);

    this.recipeForm = this.fb.group({
      title: new FormControl(),
      description: new FormControl(),
      portion: new FormControl(),
      timeDuration: new FormControl(),
      ingredients: this.fb.array([this.createIngredient()]),
      steps: this.fb.array( [this.createStep()]),
    });

    this.ingredientList = this.recipeForm.get('ingredients') as FormArray;
    this.stepList = this.recipeForm.get('steps') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      id: new FormControl(),
      name: new FormControl(),
      // kilogram: new FormControl(),
      // cant: new FormControl(),
    });
  }

  addIngredient(){
    this.ingredientList.push(this.createIngredient());
  }
  getIngredientsForm(): FormArray{
    return this.recipeForm.get('ingredients') as FormArray;
  }
  removeIngredient(ingredientIndex: number){
    this.ingredientList.removeAt(ingredientIndex);
  }
  createStep(): FormGroup {
    return this.fb.group({
      name: new FormControl(),
      // kilogram: new FormControl(),
      // cant: new FormControl(),
    });
  }
  addStep(){
    this.stepList.push(this.createStep());
  }
  getStepsForm(): FormArray{
    return this.recipeForm.get('steps') as FormArray;
  }
  removeStep(stepIndex: number){
    this.stepList.removeAt(stepIndex);
  }

  async saveRecipe(){
    console.log(this.recipeForm.value);
    console.log(getAuth().currentUser?.email);

    const docRef = await addDoc(collection(this.firestoreService.getInstanceFirestore(), "RECIPE"), this.recipeForm.value);

    if(docRef.id !== undefined){
      this.alertService.success("Se ha creado la receta", "Mis Recetas");
    } else {
      this.alertService.error("Error al crear la receta", "Mis Recetas");
    }

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
