import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  countries: any;
  user: any;
  passwordErrorMessage: string = '';
  passwordMatches: boolean = true;
  retypepassword: any;

  constructor(private service: UserService) {
    this.user = {
      "name": "",
      "country": "",
      "emailId": "",
      "gender": "",
      "phonenumber":"",
      "password": "",
    }
    this.retypepassword = {
      "retypepassword": "",
    }
  }

  ngOnInit() {
    this.service.getCountries().subscribe((data: any) => {
      this.countries = data;
      console.log(data);
    });
  }

  validatePassword() {
    const password = this.user.password;
    const retypePassword = this.retypepassword.retypepassword;

    if (password !== retypePassword) {
      this.passwordErrorMessage = "Passwords do not match.";
      this.passwordMatches = false;
    } else {
      this.passwordErrorMessage = "";
      this.passwordMatches = true;
    }
  }

  register() {
    // Make sure validatePassword() has been called to update the passwordMatches value
    this.validatePassword();
  
    if (this.passwordMatches) {
      // Passwords match
      alert("Employee Registration Success");
      this.service.registerUser(this.user).subscribe((data: any) => {
        console.log(data);
        // Reset the input fields to clear the data
        this.user = {
          "name": "",
          "country": "",
          "emailId": "",
          "gender": "",
          "phonenumber":"",
          "password": "",
        };
        this.retypepassword = {
          "retypepassword": "",
        };
      });
    } else {
      // Password validation failed, handle or display an error message
      console.log("Registration failed: Passwords do not match.");
    }
  }
  
}
