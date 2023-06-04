import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";
import { ToastController, ModalController } from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  FormRegister: FormGroup;
  showTermsModal = false;
  termsAccepted = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController
  ) {
    this.FormRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      terms: new FormControl(false, Validators.requiredTrue)
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.FormRegister.valid) {
      this.userService.register(this.FormRegister.value.email, this.FormRegister.value.password)
        .then((userCredential) => {
          this.userService
          const user = userCredential.user;
          console.log(user);
          this.router.navigate(['/login']);
          this.presentToast('Se ha registrado correctamente');
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
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración del Toast en milisegundos
      position: 'bottom'
    });
    toast.present();
  }

  handleTermsChange(event:any) {
    if (event.detail.checked) {
      this.showTermsModal = true;
    } else {
      this.termsAccepted = false;
    }
  }

  dismissTermsModal() {
    this.showTermsModal = false;
  }

  acceptTerms() {
    this.termsAccepted = true;
    this.showTermsModal = false;
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
