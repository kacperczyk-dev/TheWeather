import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  forecasts: Object[];
  time: Number;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.time = new Date().getTime();
    this.dataService.getCurrentData().then((res) =>{
      this.forecasts = res.json();
    }).catch((err) => {
      console.log('Cannot fetch data');
    });
  }

}
