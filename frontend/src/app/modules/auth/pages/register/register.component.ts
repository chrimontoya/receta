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

    createUserWithEmailAndPassword(
      getAuth(),
      this.registerForm.get('email')!.value,
      this.registerForm.get('password')!.value
    ).then( res => {
      //guardar datos de usuario
      try {

      } catch (err) {
        console.error("Error al guardar datos de usuario ", err);
      }

      console.log("Usuario registrado");



    }).catch(err => {
      console.error("Error al registrar email y contraseña ", err)
    });

  }

  cleanForm(){

  }

}
