import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  payload: any = { email: '', password: '' };
  constructor(private http: HttpClient, private common: CommonService, private router: Router) { }

  ngOnInit(): void {

  }

  onLogin(): void {
    //console.log(this.payload);
    this.http.post<any>('http://localhost:3000/api/auth/',
      {
        email: this.payload.email,
        password: this.payload.password,
      })
      .subscribe(
        data => {
          const expieryTime = +data.expiresIn + new Date().getTime() / 1000;
          //console.log(data)

          localStorage.setItem('localId', data.localId);
          localStorage.setItem('expiresIn', expieryTime.toString());
          localStorage.setItem('idToken', data.idToken);
          localStorage.setItem('authenticated', 'true');
          localStorage.setItem('email', this.payload.email);
          localStorage.setItem('isCoach', data.isCoach);

          //this.common.setMainTimer(data.expiresIn * 1000);

          this.common.setUser({
            email: this.payload.email,
            userId: data.localId,
            expiresIn: expieryTime,
            authId: data.idToken,
            authenticated: true,
            isCoach: data.isCoach
          })
          this.router.navigate(['/coachlist']);
        },
        error => {
          console.log("error:")
          console.log(error);
          throw new Error("Error in Logging in user, error code: " + error.message);
        })
  }

  onSignUp(): void {
    this.http.post<any>('http://localhost:3000/api/users/',
      {
        email: this.payload.email,
        password: this.payload.password,
        isCoach: false
      })
      .subscribe(
        data=> {
          console.log(data)
        },
      error=> {
      console.log("error:");
      console.log(error);
      throw new Error("Error in creating user, error code: " + error.message);
    })
  }
}
