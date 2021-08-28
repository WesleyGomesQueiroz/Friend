import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/service/friend.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {
  userData: any;

  constructor(private friendService: FriendService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('usuario') || '{}');

    this.getAllFriends();
  }

  getAllFriends() {
    const obj = {
      IdUser: this.userData.value.resUser.id
    };

    this.friendService.getAllFriends(obj).subscribe(res => {
      // console.log('retorno da api ---> ', res);
    });
  }

}
