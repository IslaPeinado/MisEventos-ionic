import {Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  User, getAuth
} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //currentUser: User | null;

  constructor(
    private auth: Auth
  ) {
  }

  register(email: string, password: string, displayName: string, photoURL: string) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        return updateProfile(user, {
          displayName: displayName,
          photoURL: photoURL
        })
          .then(() => {
            console.log('Usuario registrado y perfil actualizado');
            return signInWithEmailAndPassword(auth, email, password); // Iniciar sesión automáticamente
          })
          .then(() => {
            console.log('Usuario inició sesión automáticamente');
          })
          .catch((error) => {
            console.log('Error al iniciar sesión:', error);
          });
      })
      .then(() => {
        console.log('Usuario registrado y perfil actualizado');
      })
      .catch((error) => {
        console.log('Error al registrar el usuario:', error);
      });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

}
