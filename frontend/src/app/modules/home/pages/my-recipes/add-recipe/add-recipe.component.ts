import { Component } from '@angular/core';
import {SideNavService} from "../../../../../core/services/side-nav.service";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FirestoreService} from "../../../../../core/services/firestore.service";
import {AlertService} from "../../../../../core/services/alert.service";
import {getAuth} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {
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
    if(ingredientIndex !== 0){
      this.ingredientList.removeAt(ingredientIndex);
    }
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
    if(stepIndex !==0 ){
      this.stepList.removeAt(stepIndex);
    }
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
