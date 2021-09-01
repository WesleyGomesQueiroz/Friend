import { Component, OnInit } from '@angular/core';
import { FriendService } from 'src/app/service/friend.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  userData: any;
  friends: any;
  closeModal: any;
  friendData: any;

  createFriend = new FormGroup({});

  constructor(
    public friendService: FriendService,
    private modalService: NgbModal,
    private alertComponent: AlertComponent
  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('usuario') || '{}');

    this.createFriend = new FormGroup({
      idUser: new FormControl(this.userData.value.resUser.id, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      ddd: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
    });

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

  create() {
    this.friendService.create(this.createFriend.value).subscribe(res => {
      this.alertComponent.alertTimer('success', `Amigo adicionado com sucesso!`);
      this.modalService.dismissAll();
      this.getAllFriends();
    });

    this.createFriend = new FormGroup({
      idUser: new FormControl(this.userData.value.resUser.id, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      ddd: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
    });
  }

  delete(data: any, modal: any) {
    this.friendData = {
      id: data.id,
      idUser: data.idUser,
      name: data.name,
      email: data.email,
      ddd: data.ddd,
      phone: data.phone,
      adress: data.adress,
      status: false,
    };

    this.triggerModal(modal);
  }

  confirmDelete() {
    this.friendService.update(this.friendData).subscribe(res => {
      this.alertComponent.alertTimer('success', `Deletado com sucesso!`);
      this.modalService.dismissAll();
      this.getAllFriends();
    })
  }

  triggerModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
