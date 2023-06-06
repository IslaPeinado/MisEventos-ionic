import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Auth, User } from "@angular/fire/auth";
import { getDownloadURL, listAll, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  currentUserSubject: BehaviorSubject<User | null>;
  private imagenes: any[];

  user = {
    photoURL: '',
    displayName: '',
    email: '',
  };

  settings = {
    notificaciones: true,
    tema: false,
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: Auth,
    private storage: Storage
  ) {
    this.imagenes = [];
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
  }

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = ref(this.storage, `users/${user.uid}/profile.jpg`);
        getDownloadURL(userRef)
          .then(url => {
            this.user.photoURL = url;
          })
          .catch(error => console.log(error));

        const profileImagesRef = ref(this.storage, `users/${user.uid}`);
        listAll(profileImagesRef)
          .then(res => {
            res.items.forEach(itemRef => {
              getDownloadURL(itemRef)
                .then(url => {
                  this.imagenes.push(url);
                })
                .catch(error => console.log(error));
            });
          })
          .catch(error => console.log(error));

        this.user = {
          photoURL: user.photoURL || 'https://ionicframework.com/docs/img/demos/avatar.svg',
          displayName: user.displayName || '',
          email: user.email || '',
        };
      }
    });
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
        console.log('Sesión cerrada')
      })
      .catch(error => console.log(error));
  }
}
