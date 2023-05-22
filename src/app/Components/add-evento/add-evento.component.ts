import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventoService} from "../../../services/evento.service";

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.scss'],
})
export class AddEventoComponent  implements OnInit {

  eventoForm : FormGroup

  constructor(
    private eventoService: EventoService
  ) {
    this.eventoForm = new FormGroup({
      imagen: new FormControl(''),
      titulo: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      lugar: new FormControl('', Validators.required),
      dia: new FormControl('', Validators.required),
      hora: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  async onSubmit() {
    console.log(this.eventoForm.value);
    const response = await this.eventoService.addEvento(this.eventoForm.value);
    console.log(response);
  }

}
