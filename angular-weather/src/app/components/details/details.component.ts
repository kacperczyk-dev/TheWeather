import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  place: string;
  details: any[];
  daily: any[];
  hourly: any[];
  forecast: boolean;

  constructor(
     private dataService: DataService,
     public route:ActivatedRoute
  ) { 
    this.forecast = false;
  }

  ngOnInit() {
    this.place = this.route.snapshot.params['place'];
    this.dataService.getPlaceDetails(this.place).then((res) => {
      this.details = res.json();
      this.daily = this.details[0].daily.data;
    }).catch((err) => {
      console.log('Cannot fetch data');
    });
  }

  getForecast() {
    this.forecast = !this.forecast;
  }

  getHistData() {
    this.forecast = !this.forecast;
  }

  getDate(timestamp:number){
    return new Date(timestamp * 1000).toDateString()
  }
}
