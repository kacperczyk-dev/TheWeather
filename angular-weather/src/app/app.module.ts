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
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

// Services
import { DataService } from './services/data.service';
import { ChartService } from './services/chart.service';
import { AuthService } from './services/auth.service';


// Guards
import { RegisterGuard } from './guards/register.guard';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  {path: '', component: WeatherComponent},
  {path: 'details/:place', component: DetailsComponent},
  {path: 'register', component: RegisterComponent, canActivate: [RegisterGuard]},
  {path: 'signin', component: LoginComponent, canActivate: [RegisterGuard]},
  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    NavbarComponent,
    DetailsComponent,
    RegisterComponent,
    LoginComponent,
    AdminPanelComponent
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
    AuthService,
    RegisterGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
