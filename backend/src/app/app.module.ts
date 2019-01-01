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
import { NewhomeSchedulePage } from '../pages/newhome-schedule/newhome-schedule';
import { ProjectDetailPage } from '../pages/project-detail/project-detail';
import { OfficalprojectPage } from '../pages/officalproject/officalproject';
import { UserprojectPage } from '../pages/userproject/userproject';
import { CreateprojectPage } from '../pages/createproject/createproject';

@NgModule({
  declarations: [
    MyApp,
    HomePage, //首页
    UserdetailPage, //用户详情页
    LoginPage,  //登录页
    HomeScheduleDetailPage,  //首页推荐日程详情页
    NewhomeSchedulePage, //新建首页推荐日程页
    ProjectDetailPage,//作品详情页
    OfficalprojectPage,//系统作品详情
    UserprojectPage,//用户作品详情页
    CreateprojectPage,//创建新作品页面
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
    HomeScheduleDetailPage,
    NewhomeSchedulePage,
    ProjectDetailPage,
    OfficalprojectPage,
    UserprojectPage,
    CreateprojectPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
