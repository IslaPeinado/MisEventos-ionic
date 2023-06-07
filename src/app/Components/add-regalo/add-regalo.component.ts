import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventoService} from "../../../services/evento.service";
import {getDownloadURL, listAll, ref, Storage, uploadBytes} from '@angular/fire/storage';
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-add-regalo',
  templateUrl: './add-regalo.component.html',
  styleUrls: ['./add-regalo.component.scss'],
})
export class AddRegaloComponent implements OnInit {

  formRegalo: FormGroup;
  private imagenes: any[];
  private img: any;

  constructor(
    private eventoService: EventoService,
    private router: Router,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.imagenes = [];


    this.formRegalo = new FormGroup({
      imagenRegalo: new FormControl(),
      nombreRegalo: new FormControl('', [Validators.required]),
      descripcionRegalo: new FormControl('', [Validators.required]),
      marcaRegalo: new FormControl('', [Validators.required]),
      tallaRegalo: new FormControl('', [Validators.required]),
      precioRegalo: new FormControl('', [Validators.required]),
      linkRegalo: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.formRegalo.valid) {
      this.formRegalo.value.imagenRegalo = this.img;

      this.eventoService
        .addRegalo(this.formRegalo.value)
        .then(response => {
          console.log(response);
          this.presentToast('Creando regalo...');
        })
        .catch(error => {
          console.error('Error al crear el regalo', error)
          this.presentToast('Error al crear el regalo');
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

