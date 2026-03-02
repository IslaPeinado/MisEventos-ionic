import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {TabMenuComponent} from "./shared/layout/tab-menu/tab-menu.component";
import {canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./features/auth/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'terminosycondiciones',
    loadChildren: () => import('./features/content/terminos/terminos.module').then(m => m.TerminosModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'informacion',
    loadChildren: () => import('./features/content/info/info.module').then(m => m.InfoModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./features/content/ayuda/ayuda.module').then(m => m.AyudaModule),
    ...canActivate(() => redirectUnauthorizedTo(['/login']))
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
        loadChildren: () => import('./features/eventos/list-evento/list-evento.module').then(m => m.ListEventoModule),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
      },
      {
        path: 'one-evento/:idEvento',
        loadChildren: () => import('./features/eventos/one-evento/one-evento.module').then(m => m.OneEventoModule),
      },
      {
        path: 'add-evento',
        loadChildren: () => import('./features/eventos/add-evento/add-evento.module').then(m => m.AddEventoModule),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
      },
      {
        path: 'perfil',
        loadChildren: () => import('./features/profile/perfil/perfil.module').then(m => m.PerfilModule),
        ...canActivate(() => redirectUnauthorizedTo(['/login']))
      }
      ]
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
