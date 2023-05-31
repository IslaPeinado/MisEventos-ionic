import {Component, OnInit} from '@angular/core';
import {IonContent} from "@ionic/angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventoService} from "../../../services/evento.service";

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.scss'],
})
export class AddEventoComponent implements OnInit {

  formEvento: FormGroup;

  constructor(
    private eventoService: EventoService,
  ) {
    this.formEvento = new FormGroup({
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

  async onSubmit() {
    console.log(this.formEvento.value);
    const response = await this.eventoService.addEvento(this.formEvento.value);
    console.log(response);
  }


  ngOnInit() {
  }

  protected readonly onsubmit = onsubmit;

}
