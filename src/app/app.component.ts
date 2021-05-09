import {Component} from '@angular/core';
import firebase from '@firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCJznohDMrOEcqGjpgeVQp5aqpc04MUYn4',
      authDomain: 'examen-af1c3.firebaseapp.com',
      projectId: 'examen-af1c3',
      storageBucket: 'examen-af1c3.appspot.com',
      messagingSenderId: '539470810076',
      appId: '1:539470810076:web:d0749db7b3062739c4dd19'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
