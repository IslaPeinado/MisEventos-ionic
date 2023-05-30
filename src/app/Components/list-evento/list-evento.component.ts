import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-evento',
  templateUrl: './list-evento.component.html',
  styleUrls: ['./list-evento.component.scss'],
})
export class ListEventoComponent implements OnInit {

  public datoEvento: any[] = [{
    fotoEvento: 'data:image/jpeg;base64,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',
    tituloEvento: 'Festival de cine',
    anfitrionEvento: 'Cine Colombia',
    lugarEvento: 'Bogotá',
    fechaEvento: '2020-12-03',
    horaEvento: '18:00',
  },
    {
      fotoEvento: 'foto1.jpg',
      tituloEvento: 'Fiesta de cumpleaños',
      anfitrionEvento: 'Juan Pérez',
      lugarEvento: 'Salón de eventos XYZ',
      fechaEvento: '2023-06-15',
      horaEvento: '19:00',
    },
    {
      fotoEvento: 'foto2.jpg',
      tituloEvento: 'Aniversario de bodas',
      anfitrionEvento: 'María Gómez',
      lugarEvento: 'Restaurante ABC',
      fechaEvento: '2023-09-02',
      horaEvento: '20:30',
    },
    {
      fotoEvento: 'foto3.jpg',
      tituloEvento: 'Comunión de Laura',
      anfitrionEvento: 'Pedro Rodríguez',
      lugarEvento: 'Iglesia XYZ',
      fechaEvento: '2023-05-30',
      horaEvento: '11:00',
    },
    {
      fotoEvento: 'foto4.jpg',
      tituloEvento: 'Bautizo de Carlos',
      anfitrionEvento: 'Ana Martínez',
      lugarEvento: 'Parroquia ABC',
      fechaEvento: '2023-07-10',
      horaEvento: '12:30',
    },
    {
      fotoEvento: 'foto5.jpg',
      tituloEvento: 'Baby Shower de Julia',
      anfitrionEvento: 'Laura Sánchez',
      lugarEvento: 'Casa de Laura',
      fechaEvento: '2023-08-20',
      horaEvento: '16:00',
    }]

  public eventos = [...this.datoEvento];


  handleInput(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.eventos = this.datoEvento.filter(item =>
      item.tituloEvento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm) ||
      item.anfitrionEvento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm) ||
      item.lugarEvento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm) ||
      item.fechaEvento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm) ||
      item.horaEvento.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchTerm)
    );
  }



  ngOnInit(): void {
  }


}
