import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-evento',
  templateUrl: './list-evento.component.html',
  styleUrls: ['./list-evento.component.scss'],
})
export class ListEventoComponent  implements OnInit {

  public datoEvento : any[] = [{}]

  public eventos = [...this.datoEvento];

  constructor() { }

  ngOnInit() {}

  handleInput(event : any) {
    this.eventos = this.datoEvento.filter(item => item.nombreEvento.includes(event.target.value))
  }
}
