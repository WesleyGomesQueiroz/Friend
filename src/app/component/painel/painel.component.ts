import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FriendService } from 'src/app/service/friend.service';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  @ViewChild("meuCanvas", { static: true }) elemento: ElementRef | undefined;

  userData: any;
  friends: any;
  qtdFriends: any = [];
  loadingGraphic = false;

  paginaAtual = 1;
  contador = 6;

  months: any = [
    { id: 1, qtd: 0 },
    { id: 2, qtd: 0 },
    { id: 3, qtd: 0 },
    { id: 4, qtd: 0 },
    { id: 5, qtd: 0 },
    { id: 6, qtd: 0 },
    { id: 7, qtd: 0 },
    { id: 8, qtd: 0 },
    { id: 9, qtd: 0 },
    { id: 10, qtd: 0 },
    { id: 11, qtd: 0 },
    { id: 12, qtd: 0 },
  ];

  constructor(private friendService: FriendService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('usuario') || '{}');

    this.getAllFriends();

  }

  getAllFriends() {
    this.loadingGraphic = true;

    const obj = {
      IdUser: this.userData.value.resUser.id
    };

    this.friendService.getAllFriends(obj).subscribe(res => {
      this.loadingGraphic = false;
      this.friends = res;

      this.friends.value.resFriend.forEach((dayOfMonths: any) => {
        this.months.forEach((element: any) => {
          if (element.id == dayOfMonths.dtCreate.substring(5, 7)) {
            element.qtd += 1;
          }
        });

      });

      this.months.forEach((qtd: any) => {
        this.qtdFriends.push(qtd.qtd);
      });

      this.graphic();
    });
  }

  graphic() {
    new Chart(this.elemento?.nativeElement, {
      type: 'line',
      data: {
        labels: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
        datasets: [
          {
            hoverBackgroundColor: '#000',
            data: this.qtdFriends,
            borderColor: '#2199e8',
            backgroundColor: '#2199e8',
            label: 'Amigos'
          }
        ]
      }
    });
  }


}
