import { ToastController } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class Messages{
    constructor(private toastCtrl : ToastController){
    }

    /* messages controller */

    generateToastMessage(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2500,
            position: 'bottom'
        });
        toast.present();
    }

}