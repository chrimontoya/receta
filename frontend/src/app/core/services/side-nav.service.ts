import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private currentButton = new BehaviorSubject<number>(0);
  buttonSelected = this.currentButton.asObservable();
  constructor() { }
  changeSelection(idButton: number){
    this.currentButton.next(idButton);
  }

}
