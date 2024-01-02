import {Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/pages/login/login.component'
import {RegisterComponent} from "./modules/auth/pages/register/register.component";
import {LandingComponent} from "./modules/home/pages/landing/landing.component";
import {RecipeComponent} from "./modules/home/pages/recipe/recipe.component";
import {MenuComponent} from "./modules/home/pages/menu/menu.component";
import {authGuard} from "./core/guards/auth.guard";
import {RecipeDetailComponent} from "./modules/home/pages/recipe/recipe-detail/recipe-detail.component";
import {MyRecipesComponent} from "./modules/home/pages/my-recipes/my-recipes.component";
import {AddRecipeComponent} from "./modules/home/pages/my-recipes/add-recipe/add-recipe.component";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegisterComponent},
  {
    path: 'inicio', component: LandingComponent, canActivate: [authGuard],
    children: [
      {
        path: 'recetas', component: RecipeComponent, canActivate: [authGuard]
      },
      {
        path: 'menus', component: MenuComponent, canActivate: [authGuard]
      },
      {
        path: 'mis-recetas', component: MyRecipesComponent, canActivate: [authGuard]
      },
      {path: 'mis-recetas/agregar-receta', component: AddRecipeComponent, canActivate: [authGuard]},
    ]
  },
  {path: 'inicio/recetas/:nombre/:id', component: RecipeDetailComponent, canActivate: [authGuard]},
];
