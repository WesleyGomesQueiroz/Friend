import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menu = 'painel';
  changeText: boolean | undefined;

  constructor() { this.changeText = false; }

  ngOnInit(): void { }

  menuSelected(painel: any) {
    this.menu = painel;
  }

}
