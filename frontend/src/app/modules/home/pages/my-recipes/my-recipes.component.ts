import {Component, HostListener} from '@angular/core';
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
import {FirestoreService} from "../../../../core/services/firestore.service";
import {query,collection,where,getDocs} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {MatGridListModule} from "@angular/material/grid-list";
import {RecipeCardComponent} from "../../../../core/components/recipe-card/recipe-card.component";
import {ViewportRuler} from "@angular/cdk/overlay";

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatGridListModule,
    RecipeCardComponent,
    NgForOf
  ],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {
  addRecipeUrl: string = "agregar-receta";
  recipeList: any[] = [];
  user: any = getAuth().currentUser;
  cols: number = 1;
  constructor(
    private sideNavService: SideNavService,
    private firestoreService: FirestoreService,
    private viewportRuler: ViewportRuler,
  ) {
    this.sideNavService.changeSelection(2);
    this.getRecipes();
    this.cols = Math.max(1, Math.min(Math.floor(this.viewportRuler.getViewportSize().width/325), 4));
  }

  async getRecipes(){
    const q = query(collection(this.firestoreService.getInstanceFirestore(), "RECIPE"), where("user", "==", this.user.email || this.user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      this.recipeList.push(doc.data());
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cols = Math.max(1, Math.min(Math.floor(this.viewportRuler.getViewportSize().width/325), 4));
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
