import { Component, OnInit } from '@angular/core';
import { IonContent} from "@ionic/angular";

@Component({
  selector: 'app-add-evento',
  templateUrl: './add-evento.component.html',
  styleUrls: ['./add-evento.component.scss'],
})
export class AddEventoComponent  implements OnInit {
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


  public categorias= [...this.datoCat]


  constructor() { }

  ngOnInit() {}

}
