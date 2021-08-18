import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-perfil',
    templateUrl: 'perfil.html',
    providers: [
        Camera
    ]
})
export class PerfilPage {
    img = "";
    constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PerfilPage');
    }

    tirarFoto() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            this.img = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {

        });
    }

}
