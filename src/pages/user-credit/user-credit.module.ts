import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCreditPage } from './user-credit';

@NgModule({
  declarations: [
    UserCreditPage,
  ],
  imports: [
    IonicPageModule.forChild(UserCreditPage),
  ],
})
export class UserCreditPageModule {}
