import { Directive, ElementRef, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChartService } from '../../services/chart.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Chart from 'chart.js';

@Directive({ selector: '[ctx]' })
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
  chart: Chart;
  ctx;

  constructor(
     private dataService: DataService,
     private chartService: ChartService,
     public route:ActivatedRoute,
     public el: ElementRef
  ) { 
    this.forecast = false;
  }

  ngOnInit() {
    this.place = this.route.snapshot.params['place'];
    this.dataService.getPlaceDetails(this.place).then((res) => {
      this.details = res.json();
      this.daily = this.details[0].daily.data;
      this.hourly = this.details[0].hourly.data;
      this.chartService.createChart(this.el.nativeElement, this.hourly, undefined);
    }).catch((err) => {
      console.log('Cannot fetch data');
      console.log(err);
    });
  }


  getForecast() {
    this.forecast = !this.forecast;
  }

  getHistData() {
   
  }

  getDate(timestamp:number){
    return new Date(timestamp * 1000).toDateString()
  }

}
