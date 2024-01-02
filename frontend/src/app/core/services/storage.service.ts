import {Injectable} from '@angular/core';
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {FirestoreService} from "./firestore.service";
import {getAuth} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private STORAGE_URL = "gs://receta-cbdf0.appspot.com/images/" + getAuth().currentUser?.uid + "/";
  private metadata = {
    contentType: 'image/jpeg',
  };
  constructor(
    private firestoreService: FirestoreService,
  ) { }

  async uploadFile(file: File): Promise<string>{
    const storageRef = ref(this.firestoreService.getStorage(), this.STORAGE_URL + file.name);
    return await uploadBytes(storageRef, file, this.metadata).then( (snapshot) => getDownloadURL(snapshot.ref));
  }

  async getFile(file: File): Promise<string | undefined> {
    try {
      return await getDownloadURL(ref(this.firestoreService.getStorage(), file.name));
    } catch (err) {
      return undefined;
    }
  }
}
