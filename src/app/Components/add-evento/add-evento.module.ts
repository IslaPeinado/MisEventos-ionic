import {NgModule} from "@angular/core";
import {AddEventoComponent} from "./add-evento.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AddEventoComponent],
  exports: [AddEventoComponent],
    imports: [IonicModule, RouterModule.forChild([{path: '', component: AddEventoComponent}]), ReactiveFormsModule]
})
export class AddEventoModule {}
