import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfilPage } from './perfil';
import { Camera } from '@ionic-native/camera'

@NgModule({
  declarations: [
    PerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(PerfilPage),
  ],
  providers: [
    Camera
  ]
})
export class PerfilPageModule {}
