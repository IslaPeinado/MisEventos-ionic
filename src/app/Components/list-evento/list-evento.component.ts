import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../../services/evento.service";
import EventoInterface from "../../../interface/evento.interface";

@Component({
  selector: 'app-list-evento',
  templateUrl: './list-evento.component.html',
  styleUrls: ['./list-evento.component.scss'],
})
export class ListEventoComponent implements OnInit {


  eventos: EventoInterface[];

  constructor(
    private eventoService: EventoService,
  ) {
    this.eventos = [
      {
        tituloEvento: '',
        descripcionEvento: '',
        lugarEvento: '',
        diaEvento: '',
        horaEvento: '',
      }
    ];
  }


  ngOnInit(): void {
    this.eventoService.getEventos().subscribe(
      eventos => {
        this.eventos = eventos;
        console.log(eventos);
      }
    );
  }


  handleInput(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.eventos = this.eventos.filter(item =>
      item.tituloEvento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm) ||
      item.lugarEvento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm) ||
      item.diaEvento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm) ||
      item.horaEvento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm)
    );
  }



}
