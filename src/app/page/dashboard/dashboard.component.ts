import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/service/login.service';
import { AlertComponent } from '../../component/alert/alert.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  menu = 'painel';
  changeText: boolean | undefined;
  userData: any;
  closeModal: any;

  updateUser = new FormGroup({});

  constructor(
    private modalService: NgbModal,
    private loginService: LoginService,
    private alertComponent: AlertComponent,
    private router: Router
  ) {
    this.changeText = false;
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (JSON.stringify(this.userData) == '{}') {
      this.router.navigateByUrl('/login');
    }

    this.updateUser = new FormGroup({
      id: new FormControl(this.userData.value.resUser.id, [Validators.required]),
      name: new FormControl(this.userData.value.resUser.name, [Validators.required]),
      email: new FormControl(this.userData.value.resUser.email, [Validators.required, Validators.email]),
      document: new FormControl(this.userData.value.resUser.document, [Validators.required, Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
    });
  }

  menuSelected(painel: any) {
    this.menu = painel;
  }

  update() {
    this.loginService.update(this.updateUser.value).subscribe(res => {
      this.alertComponent.alertTimer('success', `Dados alterado com sucesso!`);
      this.modalService.dismissAll();
    });
  }

  exit() {
    localStorage.clear();
    this.modalService.dismissAll();
    this.router.navigateByUrl('/login');
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
