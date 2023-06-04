import {NgModule} from "@angular/core";
import {AddRegaloComponent} from "./add-regalo.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AddRegaloComponent],
  exports: [AddRegaloComponent],
  imports: [
    IonicModule,
    RouterModule.forChild([{path: '', component: AddRegaloComponent}]),
    ReactiveFormsModule
  ]
})
export class AddRegaloModule {}
