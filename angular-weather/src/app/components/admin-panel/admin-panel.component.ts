import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  cities: any[];
  newCity: String;

  constructor(
    private dataService: DataService,
    private flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.newCity = "";
    this.dataService.getCities().then((res) => {
      this.cities = res.json();
    });
  }

  removeCity(city) {
    var length = this.cities.length;
    for(var i=0; i<length; i++){
      if(this.cities[i] === city){
        this.cities.splice(i, 1);
      }
      this.dataService.removeCity(city);
    }
  }

  addCity() {
    if(this.newCity.length >= 2) {
      if(this.cities.length < 20){
        this.dataService.saveCity(this.newCity).then((res) => {
          this.cities.push(this.newCity);
          this.flashMessagesService.show(`${this.newCity} succesfuly saved`, {
            cssClass: 'alert-success',
            timeout: 3000
          });
        }).catch((err) => {
          if(err.status === 406){
            this.flashMessagesService.show(`${this.newCity} already exists`, {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          } else {
            this.flashMessagesService.show(err, {
              cssClass: 'alert-danger',
              timeout: 3000
            });
          }
        });
      } else {
        this.flashMessagesService.show("Maximum number of cities is 20, please delete a city to add another one", {
              cssClass: 'alert-danger',
              timeout: 3000
        });
      }
    }
  }
  
  
}
