import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  database: any;
  storage: any;
  constructor() { }
  setInstanceFirestore(instance: any){
    this.database = getFirestore(instance);
  }

  getInstanceFirestore(): any {
    return this.database;
  }

  setInstanceStorage(instance: any){
    this.storage = getStorage(instance);
  }
  getStorage(): any {
    return this.storage;
  }

}
