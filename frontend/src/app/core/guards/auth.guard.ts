import {ActivatedRouteSnapshot,CanActivateFn,Router,RouterStateSnapshot} from '@angular/router';
import { getAuth,onAuthStateChanged,} from 'firebase/auth';
import {map,Observable} from "rxjs";
import {inject} from "@angular/core";
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  return new Observable<boolean>((observer) => {

    const unsubscribe = onAuthStateChanged(getAuth(),(user: any) => {
      observer.next(!!user);
    });
    return () => unsubscribe();

  }).pipe(
    map((authenticated) => {
      if (authenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }}));
};
