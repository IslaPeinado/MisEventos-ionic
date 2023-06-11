import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {getDownloadURL, listAll, ref, Storage, uploadBytes} from '@angular/fire/storage';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  FormRegister: FormGroup;
  showTermsModal = false;
  termsAccepted = false;
  confirmPasswordInvalid = false;
  private imagenes: any[];
  private img: any;


  constructor(
    private userService: UserService,
    private router: Router,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.imagenes = [];

    this.FormRegister = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
      displayName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      photoURL: new FormControl(),
      terms: new FormControl(false, Validators.requiredTrue)
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.FormRegister.valid) {

      this.FormRegister.value.photoURL = this.img;

      const email = this.FormRegister.value.email;
      const password = this.FormRegister.value.password;
      const displayName = this.FormRegister.value.displayName;
      const photoURL = this.FormRegister.value.photoURL;

      this.userService
        .register(email, password, displayName, photoURL)
        .then(userCredential => {
          const user = userCredential.user;
          console.log(user);
          this.router.navigate(['/inicio/list-evento']);
          this.presentToast('Se ha registrado correctamente');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          let toastMessage;
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
              toastMessage =
                'Ha ocurrido un error. Por favor, inténtalo nuevamente.';
              break;
          }
          this.presentToast(toastMessage).then(r =>
            console.log(r));
        });
    }
  }

  handleTermsChange(event: any) {
    if (event.detail.checked) {
      this.showTermsModal = true;
    } else {
      this.termsAccepted = false;
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

  uploadImage(event: any) {
    const file = event.target.files[0];
    console.log(file);

    const imgRef = ref(this.storage, `imagenes/${file.name}`);

    uploadBytes(imgRef, file)
      .then(async (response) => {
        console.log(response);
        const url = await getDownloadURL(imgRef);
        this.img = url;
        console.log(url);
        this.getImages();
      })
      .catch((error) => console.log(error));
  }


  getImages() {
    const imagesRef = ref(this.storage, 'images');

    listAll(imagesRef)
      .then(async response => {
        console.log(response);
        this.imagenes = [];
        for (let item of response.items) {
          const url = await getDownloadURL(item);
          this.imagenes.push(url);
        }
      })
      .catch(error => console.log(error));
  }

  generateRef() {
    const id = Math.random().toString(36).substring(2);
    return id;
  }

}
