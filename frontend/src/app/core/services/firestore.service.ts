import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  database: any;
  constructor() { }
  setInstanceFirestore(instance: any){
    this.database = getFirestore(instance);
  }

}
