import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventoService} from "../../../services/evento.service";

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.scss'],
})
export class AddEventoComponent implements OnInit {
  public datoCat: string[] = [
    "Cumpleaños",
    "Aniversario",
    "Boda",
    "Comunión",
    "Bautizo",
    "Baby Shower",
    "Graduación",
    "Navidad",
    "Inauguración",
    "Despedida",
    "Promoción",
    "Jubilación",
    "Amigo invisible",
    "Otro"
  ];


  public categorias = [...this.datoCat]


  formEvento: FormGroup;

  constructor(
    private eventoService: EventoService
  ) {
    this.formEvento = new FormGroup({
      fotoEvento: new FormControl(),
      tituloEvento: new FormControl(Validators.required),
      anfitrionEvento: new FormControl(Validators.required),
      lugarEvento: new FormControl(Validators.required),
      fechaEvento: new FormControl(Validators.required),
      horaEvento: new FormControl(Validators.required),
    })
  }


  ngOnInit() {
  }

  async onSubmit() {
    const response = await this.eventoService.addEvento(this.formEvento.value);
    console.log(response);
  }

}
