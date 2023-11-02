import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  registerUser(user: any): any {
    return this.http.post('registerUser', user);
  }
  loginStatus: Subject<any>;
  isUserLogged: boolean;

  //Dependency Injection for HttpClient
  constructor(private http: HttpClient) { 
    this.isUserLogged = false;

    //To Enable and Disable Login, Register and Logout
    this.loginStatus = new Subject();
  }

  getCountries(): any {
    return this.http.get('https://restcountries.com/v3.1/all');
  }

userLogin(loginForm: any) {
  return this.http.get("http://localhost:8085/userLogin/" + loginForm.emailId + "/" + loginForm.password).toPromise();
}

 //Login
 setUserLogIn() {
  this.isUserLogged = true;

  //To Enable and Disable Login, Register and Logout
  this.loginStatus.next(true);
}
//Logout
setUserLogOut() {
  this.isUserLogged = false;

  //To Enable and Disable Login, Register and Logout
  this.loginStatus.next(false);
}
//AuthGuard
getLoginStatus(): boolean {
  return this.isUserLogged;
}

//To Enable and Disable Login, Register and Logout
getStatusLogin(): any {
  return this.loginStatus.asObservable();
}

}
