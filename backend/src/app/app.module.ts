import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpClientModule} from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserdetailPage } from '../pages/userdetail/userdetail';
import { LoginPage } from '../pages/login/login';
import { HomeScheduleDetailPage } from '../pages/home-schedule-detail/home-schedule-detail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    UserdetailPage,
    LoginPage,
    HomeScheduleDetailPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UserdetailPage,
    LoginPage,
    HomeScheduleDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
