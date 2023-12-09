import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {FirestoreService} from "../../../../core/services/firestore.service";
import {addDoc, collection, deleteDoc, doc} from "firebase/firestore";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup = new FormGroup({});
  userId: string = "";
  dateBirth: string = "";

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      address: new FormControl(),
      dateBirth: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  async registration() {
    try {
      const docRef = await addDoc(collection(this.firestoreService.getInstanceFirestore(), "USER"), this.registerForm.value);

      if (docRef.id !== undefined) {
        this.userId = docRef.id;

        createUserWithEmailAndPassword(getAuth(), this.registerForm.get('email')!.value, this.registerForm.get('password')!.value)
          .then( () => this.router.navigateByUrl('login'))
          .catch(err => console.error("Error al registrar email y contraseña ", err));
      }

    } catch (err) {
      console.error("Error al guardar datos de usuario ", err);
      await deleteDoc(doc(this.firestoreService.getInstanceFirestore(), "USERS", this.userId));
    }
  }

  cleanForm() {

  }

}
