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
  loading = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  loginIn() {
    this.loading = true;
    this.loginService.login(this.loginForm.value).subscribe(res => {
      localStorage.setItem('usuario', JSON.stringify(res));
      this.loading = false;
    });
  }

  loginStatus(status: any) {
    this.login = status;
  }

}
