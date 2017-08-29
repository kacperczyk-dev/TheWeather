import { Injectable } from '@angular/core';
import Chart from 'chart.js';

@Injectable()
export class ChartService {
  chartData: number[];
  chartLabels: any[];
  chartSetup: any[];

  constructor() { }

  prepareChartData(data: any[]){
    this.chartData = [];
    this.chartLabels = [];
    this.chartSetup = [];
    for(let i=0; i<24; i++){
      this.chartData.push(Math.round(data[i].temperature));
      var hour = new Date(data[i].time * 1000).getUTCHours() + 1;
      var res = hour < 10 ? "0" + hour + ":00" : hour + ":00";
      this.chartLabels.push(res);
    }
    this.chartSetup.push({
      data: this.chartData,
      label: 'Temp.',
      backgroundColor: 'RED'
      //fill: false
    });
    this.chartSetup.push(this.chartLabels);
    return this.chartSetup;
  }
}
