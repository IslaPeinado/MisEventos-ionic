import {NgModule} from "@angular/core";
import {PerfilComponent} from "./perfil.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [PerfilComponent],
  exports: [PerfilComponent],
  imports: [IonicModule, RouterModule.forChild([{path: '', component: PerfilComponent}]), FormsModule]
})
export class PerfilModule {}
