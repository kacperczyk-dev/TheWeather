import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';


// Components
import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather/weather.component';
import { NavbarComponent } from './components/navbar/navbar.component';


// Services
import { DataService } from './services/data.service';
import { DetailsComponent } from './components/details/details.component';

const appRoutes: Routes = [
  {path: '', component: WeatherComponent},
  {path: 'details/:place', component: DetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    NavbarComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
