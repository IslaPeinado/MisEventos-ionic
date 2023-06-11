import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventoService} from "../../../services/evento.service";
import RegaloInterface from "../../../interface/regalo.interface";
import { ScrollDetail } from '@ionic/angular';
import EventoInterface from "../../../interface/evento.interface";

@Component({
  selector: 'app-one-evento',
  templateUrl: './one-evento.component.html',
  styleUrls: ['./one-evento.component.scss'],
})
export class OneEventoComponent implements OnInit {
  evento: any;
  eventos: EventoInterface[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService
  ) {
    this.eventos = [];
  }

  ngOnInit(): void {
    const idEvento = this.route.snapshot.paramMap.get('idEvento');
    if (idEvento) {
      this.eventoService.getEventoByIdEvento(idEvento)
        .then(res =>{
          this.evento = res.data();
        });
    }
  }

  eliminarEvento() {
    const idEvento = this.route.snapshot.paramMap.get('idEvento');
    if (idEvento) {
      this.eventoService.deleteEvento(idEvento)
        .then(() => {
          this.router.navigate(['/inicio/list-evento']);
        })
        .catch(err => console.log(err));
    }
  }

  handleScrollStart() {
    console.log('scroll start');
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    console.log('scroll', ev.detail);
  }

  handleScrollEnd() {
    console.log('scroll end');
  }

  // verRegalo(regalo: RegaloInterface) {
  //   this.router.navigate(['one-evento/', evento.idEvento,'/list-regalo/', regalo.idRegalo]);
  // }


}
