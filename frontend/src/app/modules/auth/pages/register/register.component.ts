import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  dateBirth: string = "";
  constructor() {
    this.registerForm = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      address: new FormControl(),
      dateBirth: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }
  registration(){


  }

  cleanForm(){

  }

}
