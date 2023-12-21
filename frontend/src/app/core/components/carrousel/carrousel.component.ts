import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {NgStyle} from "@angular/common";
@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [MatButtonModule, NgStyle],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.scss'
})
export class CarrouselComponent {
  //image content to select
  firstBackground: string = 'red';
  secondBackground: string = 'green';
  thirdBackground: string = 'blue';
  //current image
  backgroundSelected: string = this.firstBackground;
  //default colors buttons
  firstButton: string = '#FF8E3C';
  secondButton: string = '#FFFFFE';
  thirdButton: string = '#FFFFFE';

  


  changeSelection(position: number){
    switch (position){
      case 1:
        this.firstButton = "#FF8E3C";
        this.secondButton = "#FFFFFE";
        this.thirdButton = "#FFFFFE";
        this.backgroundSelected = this.firstBackground;
        break;
      case 2:
        this.firstButton = "#FFFFFE";
        this.secondButton = "#FF8E3C";
        this.thirdButton = "#FFFFFE";
        this.backgroundSelected = this.secondBackground;
        break;
      case 3:
        this.firstButton = "#FFFFFE";
        this.secondButton = "#FFFFFE";
        this.thirdButton = "#FF8E3C";
        this.backgroundSelected = this.thirdBackground;
        break;
    }
  }
}
