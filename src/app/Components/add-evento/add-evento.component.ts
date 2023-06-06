import {Component, OnInit} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventoService} from "../../../services/evento.service";
import {Router} from "@angular/router";
import {getDownloadURL, listAll, ref, Storage, uploadBytes} from '@angular/fire/storage';

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.scss'],
})
export class AddEventoComponent implements OnInit {

  formEvento: FormGroup;
  private imagenes: any[];
  private img: any;


  constructor(
    private eventoService: EventoService,
    private router: Router,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.imagenes = [];

    this.formEvento = new FormGroup({
      fotoEvento: new FormControl(),
      tituloEvento: new FormControl('', [Validators.required]),
      descripcionEvento: new FormControl('', [Validators.required]),
      lugarEvento: new FormControl('', [Validators.required]),
      diaEvento: new FormControl('', [Validators.required]),
      horaEvento: new FormControl('', [Validators.required]),

    });

    // Obtener el valor de diaEvento y convertirlo a una cadena de texto
    const diaEventoControl = this.formEvento.get('diaEvento');
    if (diaEventoControl) {
      const diaEventoValue = diaEventoControl.value;
      if (diaEventoValue instanceof Date) {
        diaEventoControl.setValue(diaEventoValue.toISOString());
      }
    }

    // Obtener el valor de horaEvento y convertirlo a una cadena de texto
    const horaEventoControl = this.formEvento.get('horaEvento');
    if (horaEventoControl) {
      const horaEventoValue = horaEventoControl.value;
      if (typeof horaEventoValue === 'string') {
        const horaEventoDate = new Date(horaEventoValue);
        const horaEventoString = horaEventoDate.toLocaleTimeString();
        horaEventoControl.setValue(horaEventoString);
      }
    }
  }

  ngOnInit() {
  }


  onSubmit() {
    if (this.formEvento.valid) {

      this.formEvento.value.fotoEvento = this.img;

      this.eventoService
        .addEvento(this.formEvento.value)
        .then(response => {
          console.log(response);
          this.presentToast('Evento creado correctamente');
          this.router.navigate(['/inicio/list-evento']);
        })
        .catch(error => {
          console.log(error);
          this.presentToast('No se ha podido crear el evento');
        })
    }

  }

  protected readonly onsubmit = onsubmit;

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


