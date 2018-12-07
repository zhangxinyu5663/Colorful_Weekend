import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Tabs } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MinePage } from '../pages/mine/mine';
import { AddPage } from '../pages/add/add';
import { ZanPage } from '../pages/zan/zan';
import { AtPage } from '../pages/at/at';
import { FollowPage } from '../pages/follow/follow';
import { FollowpersonPage } from '../pages/followperson/followperson';
import { PicturePage } from '../pages/picture/picture';
import { ReleaseonePage } from '../pages/releaseone/releaseone';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MinePage,
    AddPage,
    ZanPage,
    AtPage,
    FollowPage,
    FollowpersonPage,
    PicturePage,
    ReleaseonePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MinePage,
    AddPage,
    ZanPage,
    AtPage,
    FollowPage,
    FollowpersonPage,
    PicturePage,
    ReleaseonePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
