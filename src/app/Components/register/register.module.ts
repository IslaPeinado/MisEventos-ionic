import {NgModule} from "@angular/core";
import {RegisterComponent} from "./register.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  imports: [IonicModule, RouterModule.forChild([{path: '', component: RegisterComponent}])]
})
export class RegisterModule {}
