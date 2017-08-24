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

const appRoutes: Routes = [
  {path: '', component: WeatherComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    NavbarComponent
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
