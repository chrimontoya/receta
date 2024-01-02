import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {state} from "@angular/animations";

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss'
})
export class RecipeCardComponent {
  constructor(
    private router: Router,
  ) {
  }

  @Input() recipeCard: any = {
    title: "Hola mundo",
    user: "christian",
    imageUrl: "https://img.freepik.com/foto-gratis/fresas-recien-recolectadas-campo-imagen-generada-ia_511042-1699.jpg?w=1480&t=st=1702431530~exp=1702432130~hmac=1bb143f7625de019e447a96c08dcab9c451ac3e4fa9c978718ed9518fb42d2c0",
    description: "Esta es una descripcion de prueba para ver el contenido de un card para ver como queda y ver los espacios al rededor como tambien se comporta el texto dentro de este",
    timeDuration: "24min"
  };
  public datos: any = [1,2,3];

  pressed = () => {
    console.log("Card pressed");
    this.router.navigateByUrl(`inicio/recetas/${this.recipeCard.title}/2`,{state: { recipe: this.recipeCard}});
  };
}
