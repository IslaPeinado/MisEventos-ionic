import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Auth} from "@angular/fire/auth";
import {EventoService} from "../../../services/evento.service";
import EventoInterface from "../../../interface/evento.interface";

@Component({
  selector: 'app-add-regalo',
  templateUrl: './add-regalo.component.html',
  styleUrls: ['./add-regalo.component.scss'],
})
export class AddRegaloComponent implements OnInit {

  formRegalo: FormGroup;
  eventos: EventoInterface[]

  constructor(
    private eventoService: EventoService,
    private auth: Auth,
  ) {
    this.formRegalo = new FormGroup({
      imagenRegalo: new FormControl(null),
      nombreRegalo: new FormControl('', [Validators.required]),
      descripcionRegalo: new FormControl('', [Validators.required]),
      marcaRegalo: new FormControl('', [Validators.required]),
      tallaRegalo: new FormControl('', [Validators.required]),
      precioRegalo: new FormControl('', [Validators.required]),
      linkRegalo: new FormControl('', [Validators.required]),
    }),
      this.eventos = [
        {
          idEvento: '',
          tituloEvento: '',
          descripcionEvento: '',
          lugarEvento: '',
          diaEvento: '',
          horaEvento: '',
        }
      ];
  }


  async onSubmit() {

    const regalo = {
      //imagenRegalo: await this.eventoService.uploadImage(this.formRegalo.value.imagenRegalo),
      nombreRegalo: this.formRegalo.value.nombreRegalo,
      descripcionRegalo: this.formRegalo.value.descripcionRegalo,
      marcaRegalo: this.formRegalo.value.marcaRegalo,
      tallaRegalo: this.formRegalo.value.tallaRegalo,
      precioRegalo: this.formRegalo.value.precioRegalo,
      linkRegalo: this.formRegalo.value.linkRegalo,
      idEvento: this.eventoService.getEventos().subscribe(
        eventos => {
          this.eventos = eventos;
          console.log(eventos);
        }
      )
    }

    console.log(this.formRegalo.value);
    const response = await this.eventoService.addRegalo(this.formRegalo.value);
    console.log(response);
  }

  ngOnInit() {
  }

}

