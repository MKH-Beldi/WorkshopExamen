import {Injectable} from '@angular/core';
import firebase from '@firebase/app';
import '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signIn(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOut() {
    firebase.auth().signOut();
  }

  isAuth() {
    return new Promise(
      (resolve) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      }
    );
  }
}
