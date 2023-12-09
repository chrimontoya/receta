import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component'
import {RegisterComponent} from "./modules/auth/pages/register/register.component";
import {LandingComponent} from "./modules/home/pages/landing/landing.component";
import {RecipeComponent} from "./modules/home/pages/recipe/recipe.component";
import {MenuComponent} from "./modules/home/pages/menu/menu.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegisterComponent },
  { path: 'inicio', component: LandingComponent,
    children: [
      {
        path: 'recetas', component: RecipeComponent
      },
      {
        path: 'menus', component: MenuComponent
      }
    ]
  },
];
