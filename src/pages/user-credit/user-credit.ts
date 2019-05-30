import { Component } from '@angular/core';
import { IonicPage, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Config } from '../../util/config';
import Util from '../../util/util'
import { Messages } from '../../util/messages';

/**
 * Generated class for the UserCreditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-credit',
  templateUrl: 'user-credit.html',
})
export class UserCreditPage {

  //userCredit page global variables
  creditForm: FormGroup
  creditAnswer : string = ''
  day: any


  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private messages: Messages) {

    this.creditForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      companyNit: ['', Validators.compose([Validators.pattern('[0-9-]+'), Validators.required])],
      userSalary: ['', Validators.compose([Validators.maxLength(8), Validators.pattern('^[0-9]*$'), Validators.required])],
      companyUserEntryDate: ['', Validators.required]
    });

    //nit character validation
    this.creditForm.controls.companyNit.valueChanges.subscribe(val => {
      if (val.length == 1 && this.creditForm.value.companyNit.length != 2) {
        this.creditForm.controls.companyNit.setValue(val + '-', { emitEvent: false })
      }
    });
  }

  CreditRequestValidation() {
    this.creditAnswer = ''
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="assets/imgs/testBankLoading.gif" />`
    });
    loading.present();

    let val = false
    //form validation
    if (!this.creditForm.valid) {
      for (let validator of Object.keys(this.creditForm.controls)) {
        this.creditForm.controls[validator].markAsTouched()
      }
      val = true
    }

    if (!Util.getAntiquity(this.creditForm.controls.companyUserEntryDate.value,Config.antiquityTime)) {
        //this.alertsProvider.toastController("Lo sentimos, tienes que contar con minimo año y medio en tu empresa");
        this.messages.generateToastMessage('Es necesario tener un año y medio de antigüedad para solicitar un credito')
        val = true
    }

    if (val) {
      loading.dismiss();
      return
    }

    if (this.creditForm.controls.userSalary.value > Config.creditRanges.minSalary) {
      if (this.creditForm.controls.userSalary.value < Config.creditRanges.range1.max) {
        this.creditAnswer = 'El credito que solicito fue aprobado por un monto de $' + Config.approvedCreditNumber.range1
      } else {
        if (this.creditForm.controls.userSalary.value < Config.creditRanges.range2.max) {
          this.creditAnswer = 'El credito que solicito fue aprobado por un monto de $' + Config.approvedCreditNumber.range2
        } else {
          this.creditAnswer = 'El credito que solicito fue aprobado por un monto de $' + Config.approvedCreditNumber.range3
        }
      }
    } else {
      this.messages.generateToastMessage('Su salario es menor a 800.000, su credito no puede ser aprobado')
    }
    loading.dismiss();
  }

}
