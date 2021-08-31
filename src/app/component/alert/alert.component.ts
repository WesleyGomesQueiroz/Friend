import { Component, Injectable, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  alertBasic(icon: any, title: any, text: any) {
    Swal.fire({ icon: icon, title: title, text: text });
  }

  alertTimer(icon: any, title: any) {
    Swal.fire({ icon: icon, title: title, showConfirmButton: false, timer: 1500 })
  }

}
