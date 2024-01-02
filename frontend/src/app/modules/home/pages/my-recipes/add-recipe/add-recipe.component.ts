import { Component } from '@angular/core';
import {SideNavService} from "../../../../../core/services/side-nav.service";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FirestoreService} from "../../../../../core/services/firestore.service";
import {AlertService} from "../../../../../core/services/alert.service";
import {getAuth} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore";
import {getStorage,ref,uploadBytes } from "firebase/storage";
import {StorageService} from "../../../../../core/services/storage.service";

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
  loading: boolean = false;
  user: any = getAuth().currentUser;
  constructor(
    private sideNavService: SideNavService,
    private fb: FormBuilder,
    private firestoreService: FirestoreService,
    private alertService: AlertService,
    private storageService: StorageService,
  ) {
    this.sideNavService.changeSelection(2);
    this.recipeForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      portion: new FormControl('', [Validators.min(1), Validators.required]),
      timeDuration: new FormControl(),
      ingredients: this.fb.array([this.createIngredient()]),
      steps: this.fb.array( [this.createStep()]),
      user: this.user.email !== undefined ? this.user.email : this.user.uid,
      imageUrl: new FormControl(),
    });

    this.ingredientList = this.recipeForm.get('ingredients') as FormArray;
    this.stepList = this.recipeForm.get('steps') as FormArray;
  }

  createIngredient(): FormGroup {
    return this.fb.group({
      id: new FormControl( this.ingredientList !== undefined ? this.ingredientList.length : 0),
      name: new FormControl('',[Validators.required]),
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
      id: new FormControl(this.stepList !== undefined ? this.stepList.length : 0),
      name: new FormControl('', [Validators.required]),
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
    this.loading = true;

    if(docRef.id !== undefined){
      this.loading = false;
      this.alertService.success("Se ha creado la receta", "Mis Recetas");
    } else {
      this.loading = false;
      this.alertService.error("Error al crear la receta", "Mis Recetas");
    }

  }

  getFile(event: any){
    const file = event.target.files[0] as File;
    this.storageService.uploadFile(file)
      .then(
        (res: string) => this.recipeForm.get('imageUrl')?.patchValue(res)
      );
  }

}
