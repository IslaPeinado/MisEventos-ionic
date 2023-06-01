import {NgModule} from "@angular/core";
import {AyudaComponent} from "./ayuda.component";
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [AyudaComponent],
  exports: [AyudaComponent],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: AyudaComponent}])
  ]
})
export class AyudaModule { }
