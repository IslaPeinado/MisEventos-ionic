import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {

  user = {
    fotoPerfil: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxU2Uh_HkAue3ZpgTltBywAypMS39yrMWEDw&usqp=CAU',
    nombre: 'Isla',
    apellidos: 'Peinado Henríquez',
    descripcion: '¡Hola! Soy Isla Peinado Henríquez. Me gusta la programación y el diseño web.',
  };

  settings = {
    notificaciones: true,
    tema: false,
  };


  constructor() {}

  ngOnInit() {}

}
