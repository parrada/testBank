import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { RegisterPage } from '../pages/register/register';
import { UserCreditPage } from '../pages/user-credit/user-credit';
import { UserProvider } from '../providers/user/user';
import { HttpClientModule } from '@angular/common/http';
import { Messages } from '../util/messages';

@NgModule({
  declarations: [
    MyApp,
    RegisterPage,
    UserCreditPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      scrollAssist: false, 
      autoFocusAssist: false
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegisterPage,
    UserCreditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    Messages
  ]
})
export class AppModule {}
