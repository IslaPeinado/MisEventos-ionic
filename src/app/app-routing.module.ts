import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {TabMenuComponent} from "./Components/tab-menu/tab-menu.component";
import {canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import {OneEventoComponent} from "./Components/one-evento/one-evento.component";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./Components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Components/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'terminosycondiciones',
    loadChildren: () => import('./Components/terminos/terminos.module').then(m => m.TerminosModule)
  },
  {
    path: 'informacion',
    loadChildren: () => import('./Components/info/info.module').then(m => m.InfoModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./Components/ayuda/ayuda.module').then(m => m.AyudaModule)
  },
  {
    path: 'inicio',
    component: TabMenuComponent,
    children: [
      {
        path: 'inicio',
        pathMatch: 'full',
        redirectTo: 'list-evento',
      },
      {
        path: 'list-evento',
        loadChildren: () => import('./Components/list-evento/list-evento.module').then(m => m.ListEventoModule),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
      },
      {
        path: 'add-evento',
        loadChildren: () => import('./Components/add-evento/add-evento.module').then(m => m.AddEventoModule),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
      },
      {
        path: 'perfil',
        loadChildren: () => import('./Components/perfil/perfil.module').then(m => m.PerfilModule),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
      }
      ]
  },
  {
    path: 'evento/:idEvento',
    component: OneEventoComponent
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
