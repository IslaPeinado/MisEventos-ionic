import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  FormLogin :FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.FormLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.userService.login(this.FormLogin.value.email, this.FormLogin.value.password)
      .then(response =>{
        this.router.navigate(['/inicio/list-evento']);
        console.log(response);
        this.presentToast('Iniciando sesión...');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        let toastMessage = '';

        switch (errorCode) {
          case 'auth/invalid-email':
            toastMessage = 'Por favor, ingresa un email válido.';
            break;
          case 'auth/weak-password':
            toastMessage = 'La contraseña es demasiado débil.';
            break;
          case 'auth/email-already-in-use':
            toastMessage = 'El email ya está en uso por otro usuario.';
            break;
          default:
            toastMessage = 'Ha ocurrido un error. Por favor, inténtalo nuevamente.';
            break;
        }
        this.presentToast(toastMessage);
      });
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración del Toast en milisegundos
      position: 'bottom'
    });
    toast.present();
  }

  loginGoogle() {
    this.userService.loginWithGoogle()
      .then(response => {
        this.router.navigate(['/inicio/list-evento']);
        console.log(response);
        this.presentToast('Iniciando sesión...');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
}
