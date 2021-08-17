import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any;

  constructor() { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('usuario') || '{}');

    console.log('dados em cahe --> ', this.userData)
  }

}
