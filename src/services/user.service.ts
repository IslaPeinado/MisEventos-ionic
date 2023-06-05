import {Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  User,
  UserCredential
} from "@angular/fire/auth";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserSubject: BehaviorSubject<User | null>;

  constructor(
    private auth: Auth
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);

    // Suscribirse a los cambios en el estado de autenticación
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        // El usuario ha iniciado sesión
        this.currentUserSubject.next(user);
      } else {
        // El usuario ha cerrado sesión
        this.currentUserSubject.next(null);
      }
    });
  }

  register(email: string, password: string, displayName: string, photoURL: string): Promise<User> {
    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password)
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
            return user; // Devuelve el objeto user
          })
          .catch((error) => {
            console.log('Error al iniciar sesión:', error);
            throw error; // Lanza el error para que se maneje en el bloque catch externo
          });
      })
      .catch((error) => {
        console.log('Error al registrar el usuario:', error);
        throw error; // Lanza el error para que se maneje en el bloque catch externo
      });
  }

  login(email: string, password: string): Promise<User> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
        return userCredential.user;
      });
  }

  loginWithGoogle(): Promise<User> {
    return signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((userCredential: UserCredential) => {
        return userCredential.user;
      });
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  getCurrentUser(): BehaviorSubject<User | null> {
    return this.currentUserSubject;
  }
}
