import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CarrouselComponent} from "../../../../core/components/carrousel/carrousel.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CarrouselComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userControl: FormControl = new FormControl();
  passControl: FormControl = new FormControl();

  constructor(
    private router: Router
  ) {
  }

  logIn(){
    signInWithEmailAndPassword(getAuth(), this.userControl!.value, this.passControl!.value)
      .then( (userCredential) => {
        this.router.navigateByUrl('/inicio');
      })
      .catch((err) => {
        console.error("Error " + err.code, "mensaje: " + err.message)
      });
  }

}
