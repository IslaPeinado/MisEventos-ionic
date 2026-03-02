import {NgModule} from "@angular/core";
import {InfoComponent} from "./info.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [InfoComponent],
  exports: [InfoComponent],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: InfoComponent}])
  ]
})
export class InfoModule { }
