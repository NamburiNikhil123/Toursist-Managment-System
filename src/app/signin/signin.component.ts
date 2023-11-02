import { Component , OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  user : any;
  users : any;
  isLoggedIn: boolean = false; // Initially, the user is not logged in


  constructor(private service: UserService, private router:Router) {
  
  }

  ngOnInit(){

  }

  async loginSubmit(loginForm: any) {
    localStorage.setItem("emailId", loginForm.emailId);
    console.log(loginForm.emailId);
    console.log(loginForm.password);

    if (loginForm.emailId == 'HR' && loginForm.password == 'HR') {
      this.service.setUserLogIn();
      this.isLoggedIn=true;
      this.router.navigate(['home']);
    } else {
     
      await this.service.userLogin(loginForm).then((empData: any) => {
        this.user = empData;
      });

      if (this.user != null) {
        localStorage.setItem("user", JSON.stringify(this.user)); // Store user data in local storage
        this.service.setUserLogIn();
        this.router.navigate(['home']);
        this.isLoggedIn = true;
      } else {
        alert("Invalid Credentials");
        this.isLoggedIn = false;
      }
    }
  }
}
