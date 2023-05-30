import {NgModule} from "@angular/core";
import {AddRegaloComponent} from "./add-regalo.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [AddRegaloComponent],
  exports: [AddRegaloComponent],
  imports: [IonicModule, RouterModule.forChild([{path: '', component: AddRegaloComponent}])]
})
export class AddRegaloModule {}
