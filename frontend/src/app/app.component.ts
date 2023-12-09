import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {FirestoreService} from "./core/services/firestore.service";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  database: any;
  title = 'frontend';
  firebaseConfig = {
    apiKey: "AIzaSyBicwWyy50fbOuGR8e39ZXrBS384KvM-uI",
    authDomain: "receta-cbdf0.firebaseapp.com",
    projectId: "receta-cbdf0",
    storageBucket: "receta-cbdf0.appspot.com",
    messagingSenderId: "253474104707",
    appId: "1:253474104707:web:f5116ff59fa006bac102b6",
    measurementId: "G-QE60HT1JM8"
  };

  constructor(
    private firestoreService: FirestoreService
  ) {
    const app = initializeApp(this.firebaseConfig);
    const analytics = getAnalytics(app);
    this.firestoreService.setInstanceFirestore(app);
  }

}
