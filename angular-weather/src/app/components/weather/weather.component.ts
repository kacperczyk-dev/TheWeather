import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  places: Object[];

  constructor(
    private dataService: DataService
    
  ) { }

  ngOnInit() {
    this.dataService.getCurrentData().then((res) =>{
      this.places = res.json();
      console.log(this.places[0]);
    }).catch((err) => {
      console.log('Cannot fetch data');
    });
  }

}
