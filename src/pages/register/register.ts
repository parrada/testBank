import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Util from '../../util/util'
import { Messages } from '../../util/messages';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../models/user.model';
import { UserCreditPage } from '../user-credit/user-credit';
import { Config } from '../../util/config';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [Messages]
})
export class RegisterPage {

  //register page global variables
  registerForm: FormGroup

  constructor(private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private messages: Messages,
    private userProv: UserProvider) {

    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      identification: ['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required, Validators.pattern('^[0-9]*$')])]
    });

  }

  validateUser() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/testBankLoading.gif" />`
    });
    loading.present();
    let val = false
    //form validation
    if (!this.registerForm.valid) {
      for (let validator of Object.keys(this.registerForm.controls)) {
        this.registerForm.controls[validator].markAsTouched()
      }
      val = true
    }

    //age validation
    if (Config.minAge > Util.calculateAge(this.registerForm.controls.birthdate.value)) {
      this.messages.generateToastMessage("La edad minima para solicitar un credito es de: " + Config.minAge + "años");
      val = true
    }

    if (val) {
      loading.dismiss();
      return
    }

    //users search
    this.userProv.getRegisteredUsers().subscribe(
      registeredUsers => {
        //user existence validation
        for (let usr in registeredUsers) {
          if (registeredUsers[usr].identification == this.registerForm.controls.identification.value) {
            this.messages.generateToastMessage("Ya ahi un usuario registrado con esa identificación");
            loading.dismiss();
            return
          }
        }

        let user: User = new User(this.registerForm.controls.name.value,
          this.registerForm.controls.lastName.value,
          this.registerForm.controls.identification.value,
          this.registerForm.controls.birthdate.value)
        //register user
        this.registerUser(user, loading)

      },
      err => {
        this.messages.generateToastMessage("se ha presentado un error al consultar los usuarios");
        loading.dismiss();
      })
  }

  registerUser(user: User, loading) {
    this.userProv.newUser(user).subscribe(data => {
      this.messages.generateToastMessage("El usuario se ha creado correctamente");
      this.navCtrl.push(UserCreditPage);
      loading.dismiss();
    }, error => {
      this.messages.generateToastMessage("Se presento un error al intentar registrar el usuario");
      loading.dismiss();
    })
  }

}
