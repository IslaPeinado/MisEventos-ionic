import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-regalo2',
  templateUrl: './add-regalo2.component.html',
  styleUrls: ['./add-regalo2.component.scss'],
})
export class AddRegalo2Component  implements OnInit {

  public datoColor: string[] = [
    "Rojo",
    "Azul",
    "Verde",
    "Amarillo",
    "Naranja",
    "Rosa",
    "Morado",
    "Negro",
    "Blanco",
    "Gris",
    "Marrón",
    "Cian",
    "Lila",
    "Turquesa",
    "Ocre",
    "Celeste",
    "Violeta",
    "Dorado",
    "Plateado",
    "Beige"]

  public colores = [...this.datoColor]

  constructor() { }

  ngOnInit() {}

}
