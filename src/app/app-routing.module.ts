import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {TabMenuComponent} from "./Components/tab-menu/tab-menu.component";

const routes: Routes = [
  //{
  //  path: 'home',
  //  loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
  //},
  //{
  //  path: '',
  //  redirectTo: 'home',
  //  pathMatch: 'full'
  //},
  {
    path: '',
    component: TabMenuComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list-evento'
      },
      {
        path: 'list-evento',
        loadChildren: () => import('./Components/list-evento/list-evento.module').then(m => m.ListEventoModule)
      },
      {
        path: 'add-evento',
        loadChildren: () => import('./Components/add-evento/add-evento.module').then(m => m.AddEventoModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./Components/perfil/perfil.module').then(m => m.PerfilModule)
      }
      ]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
