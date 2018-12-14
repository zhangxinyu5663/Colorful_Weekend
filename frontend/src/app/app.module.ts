import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import {HttpClientModule} from '@angular/common/http'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddPage } from '../pages/add/add';
import { Content02Page } from '../pages/content02/content02';
import { PlanonePage } from '../pages/planone/planone';
import { PlantwoPage } from '../pages/plantwo/plantwo';
import { PlanthreePage } from '../pages/planthree/planthree';
import { PlanfourPage } from '../pages/planfour/planfour';
import { PlanfivePage } from '../pages/planfive/planfive';
import { PlansixPage } from '../pages/plansix/plansix';
import { PlansevenPage } from '../pages/planseven/planseven';
import { PlaneightPage } from '../pages/planeight/planeight';
import { CalendarPage } from '../pages/calendar/calendar';
import { AtPage } from '../pages/at/at';
import { GuanzhuPage } from '../pages/guanzhu/guanzhu';
import { FollowpersonPage } from '../pages/followperson/followperson';
import { ZanPage } from '../pages/zan/zan';
import { MyPage } from '../pages/my/my';
import { AccountPage } from '../pages/account/account';
import { ChangepwdetailsPage } from '../pages/changepwdetails/changepwdetails';
import { ChangephonePage } from '../pages/changephone/changephone';
import { ChangepwPage } from '../pages/changepw/changepw';
import { CollectionPage } from '../pages/collection/collection';
import { CreatePage } from '../pages/create/create';
import { FansPage } from '../pages/fans/fans';
import { PhonenumPage } from '../pages/phonenum/phonenum';
import { SetPage } from '../pages/set/set';
import { SetdataPage } from '../pages/setdata/setdata';
import { FansmyPage } from '../pages/fansmy/fansmy';
import { ReleaseonePage } from '../pages/releaseone/releaseone';
import { PicturePage } from '../pages/picture/picture';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgetpwdPage } from '../pages/forgetpwd/forgetpwd';
import { Forgetpwd2Page } from '../pages/forgetpwd2/forgetpwd2';
import { ChangepwdalertPage } from '../pages/changepwdalert/changepwdalert';
import { Register2Page } from '../pages/register2/register2';
import { UserinfoPage } from '../pages/userinfo/userinfo';
import { Content01Page } from '../pages/content01/content01';
import { Content03Page } from '../pages/content03/content03';
import { Content04Page } from '../pages/content04/content04';
import { Content05Page } from '../pages/content05/content05';
import { Content06Page } from '../pages/content06/content06';
import { Content12Page } from '../pages/content12/content12';
import { Content11Page } from '../pages/content11/content11';
import { Content10Page } from '../pages/content10/content10';
import { Content09Page } from '../pages/content09/content09';
import { Content08Page } from '../pages/content08/content08';
import { Content07Page } from '../pages/content07/content07';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MyPage,
    AddPage,
    Content01Page,
    Content02Page,
    Content03Page,
    Content04Page,
    Content05Page,
    Content06Page,
    Content07Page,
    Content08Page,
    Content09Page,
    Content10Page,
    Content11Page,
    Content12Page,
    PlanonePage,
    PlantwoPage,
    PlanthreePage,
    PlanfourPage,
    PlanfivePage,
    PlansixPage,
    PlansevenPage,
    PlaneightPage,
    CalendarPage,
    AtPage,
    GuanzhuPage,
    FollowpersonPage,
    ZanPage,
    AccountPage,
    ChangepwdetailsPage,
    ChangephonePage,
    ChangepwPage,
    CollectionPage,
    CreatePage,
    FansPage,
    PhonenumPage,
    SetPage,
    SetdataPage,
    FansmyPage,
    ReleaseonePage,
    PicturePage,
    LoginPage,
    RegisterPage,
    Register2Page,
    ForgetpwdPage,
    Forgetpwd2Page,
    ChangepwdalertPage,
    UserinfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    // IonicModule.forRoot(MyApp,{
    //   backButtonText: '',
    //   backButtonIcon:'ios-arrow-back',
    //   tabsHideOnSubPages:true, //跳转之后隐藏下面的导航栏

    //    iconMode: 'ios',
    // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MyPage,
    AddPage,
    Content01Page,
    Content02Page,
    Content03Page,
    Content04Page,
    Content05Page,
    Content06Page,
    Content07Page,
    Content08Page,
    Content09Page,
    Content10Page,
    Content11Page,
    Content12Page,
    PlanonePage,
    PlantwoPage,
    PlanthreePage,
    PlanfourPage,
    PlanfivePage,
    PlansixPage,
    PlansevenPage,
    PlaneightPage,
    CalendarPage,
    AtPage,
    GuanzhuPage,
    FollowpersonPage,
    ZanPage,
    AccountPage,
    ChangepwdetailsPage,
    ChangephonePage,
    ChangepwPage,
    CollectionPage,
    CreatePage,
    FansPage,
    PhonenumPage,
    SetPage,
    SetdataPage,
    FansmyPage,
    ReleaseonePage,
    PicturePage,
    LoginPage,
    RegisterPage,
    Register2Page,
    ForgetpwdPage,
    Forgetpwd2Page,
    ChangepwdalertPage,
    UserinfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
