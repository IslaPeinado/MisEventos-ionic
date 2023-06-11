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

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  formEvento: FormGroup;
  formRegalo: FormGroup;
  private imagenes: any[];
  private img: any;
  private regalos: any[];


  constructor(
    private eventoService: EventoService,
    private router: Router,
    private toastController: ToastController,
    private storage: Storage
  ) {
    this.imagenes = [];
    this.regalos = [];

    this.formEvento = new FormGroup({
      fotoEvento: new FormControl(''),
      tituloEvento: new FormControl('', [Validators.required]),
      descripcionEvento: new FormControl('', [Validators.required]),
      lugarEvento: new FormControl('', [Validators.required]),
      diaEvento: new FormControl('', [Validators.required]),
      horaEvento: new FormControl('', [Validators.required]),
      regalos: new FormControl(''),
    });

    this.formRegalo = new FormGroup({
      imagenRegalo: new FormControl(),
      nombreRegalo: new FormControl('', [Validators.required]),
      descripcionRegalo: new FormControl('', [Validators.required]),
      marcaRegalo: new FormControl(),
      tallaRegalo: new FormControl(),
      precioRegalo: new FormControl('', [Validators.required]),
      linkRegalo: new FormControl(),
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
     this.formEvento.value.regalos = this.regalos;


     this.eventoService
       .addEvento(this.formEvento.value, this.formEvento.value.regalos)
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

    console.log(this.formEvento.value);
  }

  onSubmitRegalo() {
    console.log(this.formRegalo.value);
    if (this.formRegalo.valid) {
      this.regalos?.push(this.formRegalo.value);
      this.formRegalo.reset({
        imagenRegalo: '',
        nombreRegalo: '',
        descripcionRegalo: '',
        marcaRegalo: '',
        tallaRegalo: '',
        precioRegalo: '',
        linkRegalo: '',
      });
    }
    this.closeModal();
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


  closeModal() {
    this.setOpen(false);
  }
}


