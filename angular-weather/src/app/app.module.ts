import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FlashMessagesModule } from 'angular2-flash-messages';
import { ChartsModule } from 'ng2-charts';

// Components
import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetailsComponent } from './components/details/details.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

// Services
import { DataService } from './services/data.service';
import { ChartService } from './services/chart.service';
import { AuthService } from './services/auth.service';

const appRoutes: Routes = [
  {path: '', component: WeatherComponent},
  {path: 'details/:place', component: DetailsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'signin', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    NavbarComponent,
    DetailsComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ChartsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    DataService,
    ChartService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
