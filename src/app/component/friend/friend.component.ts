import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/service/friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  userData: any;
  friends: any;

  constructor(public friendService: FriendService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('usuario') || '{}');

    this.getAllFriends();
  }

  getAllFriends() {
    const obj = {
      IdUser: this.userData.value.resUser.id
    };

    this.friendService.getAllFriends(obj).subscribe(res => {
      this.friends = res;
    });

  }

}
