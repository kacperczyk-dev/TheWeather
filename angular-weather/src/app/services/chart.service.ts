import { Injectable } from '@angular/core';
import Chart from 'chart.js';

@Injectable()
export class ChartService {

  constructor() { }

  createChart(ctx, data, options) {
    return new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
  }
}
