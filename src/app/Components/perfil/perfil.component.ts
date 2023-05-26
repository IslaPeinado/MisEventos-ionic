import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {

  username: string = 'username';
  fullName: string = 'Full Name';
  bio: string = 'Bio text goes here';
  profilePicture: string = 'path/to/profile-picture.jpg';
  posts: any[] = [
    { imageUrl: 'path/to/post-image1.jpg' },
    { imageUrl: 'path/to/post-image2.jpg' },
    { imageUrl: 'path/to/post-image3.jpg' },
  ];
  followers: number = 1000;
  following: number = 500;

  constructor() {}

  ngOnInit() {}

}
