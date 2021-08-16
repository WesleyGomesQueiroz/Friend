import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = true;
  confirmLogin: any;
  loading = false;
  msg: any;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  createLoginForm = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    cpf: new FormControl('', [Validators.required, Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})')])
  });

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  loginIn() {
    this.loading = true;
    this.loginService.login(this.loginForm.value).subscribe(res => {
      this.confirmLogin = res;

      if (this.confirmLogin.value.status) {
        localStorage.setItem('usuario', JSON.stringify(res));
      } else {
        this.msg = this.confirmLogin.value.message;
      }

      this.loading = false;

    });
  }

  loginStatus(status: any) {
    this.login = status;
  }

  createLogin() {
    console.log('formulario ', this.createLoginForm);
  }

}
