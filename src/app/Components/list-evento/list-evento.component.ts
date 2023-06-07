import {Component, OnInit} from '@angular/core';
import {EventoService} from "../../../services/evento.service";
import EventoInterface from "../../../interface/evento.interface";
import {Router} from "@angular/router";
import {getDownloadURL, listAll, ref, Storage, uploadBytes} from '@angular/fire/storage';
import {Auth, User} from "@angular/fire/auth";
import {BehaviorSubject, Observable} from "rxjs";
import {collection, collectionData} from "@angular/fire/firestore";


@Component({
  selector: 'app-list-evento',
  templateUrl: './list-evento.component.html',
  styleUrls: ['./list-evento.component.scss'],
})
export class ListEventoComponent implements OnInit {

  eventos: EventoInterface[];
  currentUserSubject: BehaviorSubject<User | null>;
  private imagenes: any[];

  constructor(
    private router: Router,
    private eventoService: EventoService,
    private auth: Auth,
    private storage: Storage
  ) {
    this.eventos = [];
    this.imagenes = [];
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
  }


  ngOnInit(): void {
    this.currentUserSubject = this.eventoService.getCurrentUser();
    this.eventoService.getEventosAnfitrion().subscribe((eventos) => {

      this.eventoService.getEventos().subscribe(
        eventos => {
          this.eventos = eventos;
          console.log(eventos);
        }
      );
    });
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

  onclick(idEvento: string) {
   if (idEvento) {
      this.router.navigate(['/evento', idEvento]);
    }
  }



}
