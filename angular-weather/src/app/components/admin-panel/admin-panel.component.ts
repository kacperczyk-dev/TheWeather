import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  cities: any[];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getCities().subscribe(cities => {
      this.cities = cities
    });
  }

  removeCity(i) {
    console.log(i);
  }
}
