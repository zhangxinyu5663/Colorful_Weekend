import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

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
import { FollowPage } from '../pages/follow/follow';
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



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MyPage,
    AddPage,
    Content02Page,
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
    FollowPage,
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
    SetdataPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
    Content02Page,
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
    FollowPage,
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
    SetdataPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
