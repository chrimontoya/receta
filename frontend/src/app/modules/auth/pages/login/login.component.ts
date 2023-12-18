import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CarrouselComponent} from "../../../../core/components/carrousel/carrousel.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Router, RouterLink} from "@angular/router";
import {AlertService} from "../../../../core/services/alert.service";
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
  formLogin: FormGroup = new FormGroup({
    userControl: new FormControl(null, [Validators.required]),
    passControl: new FormControl(null, [Validators.required])
  });
  constructor(
    private router: Router,
    private alertService: AlertService,
  ) {
  }

  logIn(){
    if(this.formLogin.valid){
      signInWithEmailAndPassword(getAuth(), this.formLogin.get('userControl')!.value, this.formLogin.get('passControl')!.value)
        .then( (userCredential) => {
          this.alertService.success("Se ha iniciado sesión","Iniciar sesión");
          this.router.navigateByUrl('/inicio/recetas');
        })
        .catch((err) => {
          if("auth/missing-email"){
            this.alertService.error(`Error 400 - Usuario o contraseña incorrectos`,'Iniciar sesión',5000, true);
          }
        });
    }
  }

}
