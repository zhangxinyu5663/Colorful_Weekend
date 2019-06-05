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

import {Camera,CameraOptions} from "@ionic-native/camera";
import {ImagePicker,ImagePickerOptions} from "@ionic-native/image-picker";

import { AddPage } from '../pages/add/add';
import { PlanonePage } from '../pages/planone/planone';
import { CalendarPage } from '../pages/calendar/calendar';
import { GuanzhuPage } from '../pages/guanzhu/guanzhu';
import { ZanPage } from '../pages/zan/zan';
import { MyPage } from '../pages/my/my';
import { AccountPage } from '../pages/account/account';
import { ChangepwdetailsPage } from '../pages/changepwdetails/changepwdetails';
import { ChangephonePage } from '../pages/changephone/changephone';
import { ChangepwPage } from '../pages/changepw/changepw';
import { CollectionPage } from '../pages/collection/collection';
import { FansPage } from '../pages/fans/fans';
import { PhonenumPage } from '../pages/phonenum/phonenum';
import { SetPage } from '../pages/set/set';
import { SetdataPage } from '../pages/setdata/setdata';
import { ReleaseonePage } from '../pages/releaseone/releaseone';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ForgetpwdPage } from '../pages/forgetpwd/forgetpwd';
import { Forgetpwd2Page } from '../pages/forgetpwd2/forgetpwd2';
import { ChangepwdalertPage } from '../pages/changepwdalert/changepwdalert';
import { Register2Page } from '../pages/register2/register2';
import { UserinfoPage } from '../pages/userinfo/userinfo';
import { EditmypublishPage } from '../pages/editmypublish/editmypublish';
import { SearchPage } from '../pages/search/search';
import { EditmyschedulePage } from '../pages/editmyschedule/editmyschedule';
import { CommentPage } from '../pages/comment/comment';
import {HomeDetailPage} from '../pages/homedetail/homedetail';
import {SearchresultPage} from '../pages/searchresult/searchresult';
import { AttentionuserprojectPage } from '../pages/attentionuserproject/attentionuserproject';
import { FansuserprojectPage } from '../pages/fansuserproject/fansuserproject';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MyPage,
    AddPage,
    PlanonePage,
    CalendarPage,
    GuanzhuPage,
    ZanPage,
    AccountPage,
    ChangepwdetailsPage,
    ChangephonePage,
    ChangepwPage,
    CollectionPage,
    FansPage,
    PhonenumPage,
    SetPage,
    SetdataPage,
    ReleaseonePage,
    LoginPage,
    RegisterPage,
    Register2Page,
    ForgetpwdPage,
    Forgetpwd2Page,
    ChangepwdalertPage,
    UserinfoPage,
    EditmypublishPage,
    SearchPage,
    SearchresultPage,
    EditmyschedulePage,
    CommentPage,
    HomeDetailPage,
    AttentionuserprojectPage,
    FansuserprojectPage
  ],
  imports: [
    BrowserModule,
    // IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      backButtonIcon:'',
      tabsHideOnSubPages:true //跳转之后隐藏下面的导航栏
    })
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
    PlanonePage,
    CalendarPage,
    GuanzhuPage,
    ZanPage,
    AccountPage,
    ChangepwdetailsPage,
    ChangephonePage,
    ChangepwPage,
    CollectionPage,
    FansPage,
    PhonenumPage,
    SetPage,
    SetdataPage,
    ReleaseonePage,
    LoginPage,
    RegisterPage,
    Register2Page,
    ForgetpwdPage,
    Forgetpwd2Page,
    ChangepwdalertPage,
    UserinfoPage,
    EditmypublishPage,
    UserinfoPage,
    SearchPage,
    SearchresultPage,
    EditmypublishPage,
    EditmyschedulePage,
    CommentPage,
    HomeDetailPage,
    AttentionuserprojectPage,
    FansuserprojectPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    ImagePicker
  ]
})
export class AppModule {}
