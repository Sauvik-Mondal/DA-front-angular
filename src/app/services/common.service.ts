import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  user: any = {
    email: '',
    userId: '',
    expiresIn: '',
    authId: '',
    authenticated: '',
    isCoach: ''
  };
  mainTimer: any;
  constructor() { }

  logOut() {
    localStorage.clear();
    clearTimeout(this.mainTimer);
    this.user.email = null;
    this.user.userId = null;
    this.user.expiresIn = null;
    this.user.authId = null;
    this.user.authenticated = null;
    this.user.isCoach = null;
  }

  setUser(payload: {
    email: string, userId: string, expiresIn: number, authId: string,
    authenticated: boolean, isCoach: boolean
  }) {
    this.user.email = payload.email;
    this.user.userId = payload.userId;
    this.user.expiresIn = payload.expiresIn;
    this.user.authId = payload.authId;
    this.user.authenticated = true;
    this.user.isCoach = payload.isCoach;
    console.log(this.user);
  }

  // setMainTimer(time: number):void {
  //   this.mainTimer = setTimeout(() => {
  //     this.logOut();
  //   }, +time * 1000);
  // }

  autoLogin(): void{
    const cached_localId = localStorage.getItem('localId');
    const cached_expiresIn = +localStorage.getItem('expiresIn') - new Date().getTime() / 1000;
    const cached_idToken = localStorage.getItem('idToken');
    const cached_authenticated = localStorage.getItem('authenticated');
    const cached_email = localStorage.getItem('email');
    const cached_isCoach = localStorage.getItem('isCoach');

    // this.mainTimer = setTimeout(() => {
    //     this.logOut();
    // }, +cached_expiresIn * 1000);

    if (cached_localId && cached_expiresIn && cached_idToken && cached_authenticated) {
      this.user.userId = cached_localId;
      this.user.expiresIn = cached_expiresIn;
      this.user.authId = cached_idToken;
      this.user.authenticated = cached_authenticated;
      this.user.email = cached_email;
      this.user.isCoach = cached_isCoach;
    }
  }

  getUserId(): string {
    return this.user.userId;
  }

  getAuthToken(): string {
    return this.user.authId;
  }

  isAuthenticated(): boolean {
    return this.user.authenticated;
  }

  isCoach(): boolean {
    return this.user.isCoach==true? true: false;
  }

  setUserAsCoach() {
    this.user.isCoach = true;
    localStorage.setItem('isCoach', 'true');
  }

  removeUserAsCoach() {
    this.user.isCoach = false;
    localStorage.setItem('isCoach', 'false');
  }

  getUserMail(): string {
    return this.user.email;
  }
}

