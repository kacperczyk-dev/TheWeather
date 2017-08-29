import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChartService } from '../../services/chart.service';
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

  //Chart
  chartOptions: Object;
  chartData: Object[];
  chartLabels: String[];
  

  constructor(
     private dataService: DataService,
     private chartService: ChartService,
     public route:ActivatedRoute
  ) { 
      this.forecast = false;
      this.chartData = [];
      this.chartLabels = [];
      this.chartOptions = {
      responsive: true,
      title:{
        display:true,
        text:'Temperature'
      },
      scales: {
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Temperature'
              }
            }],
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Time'
              }
            }]
        }
    };
  }

  ngOnInit() {
    this.place = this.route.snapshot.params['place'];
    this.dataService.getPlaceDetails(this.place).then((res) => {
      this.details = res.json();
      this.daily = this.details[0].daily.data;
      this.hourly = this.details[0].hourly.data;
      this.prepareChart(this.hourly);
    }).catch((err) => {
      console.log('Cannot fetch data');
      console.log(err);
    });
  }

  getForecast() {
    this.forecast = !this.forecast;
  }

  prepareChart(hourly: any[]){
    let setup = this.chartService.prepareChartData(hourly);
    this.chartData.push(setup[0]);
    this.chartLabels = setup[1];
  }

  getDate(timestamp:number){
    return new Date(timestamp * 1000).toDateString();
  }
}
