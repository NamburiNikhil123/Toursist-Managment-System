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

  constructor(private service: UserService) {
    this.user = {
      "name": "",
      "email_id": "",
      "country": "",
      "gender": "",
      "password": "",
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
    const retypePassword = this.user.retypepassword;
  
    if (password !== retypePassword) {
      this.passwordErrorMessage = "Passwords do not match.";
      this.passwordMatches = false;
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,}$/;
  
      if (!password.match(passwordRegex)) {
        this.passwordErrorMessage = "Password must have 8 or more characters, including at least one lowercase letter, one uppercase letter, one digit, and one special character.";
        this.passwordMatches = false;
      } else {
        this.passwordErrorMessage = "";
        this.passwordMatches = true;
      }
    }
  }
  

  register() {
    // Make sure validatePassword() has been called to update the passwordMatches value
    this.validatePassword();
    
    if (this.passwordMatches) {
      // Passwords match and meet criteria
      console.log(this.user);
      this.service.registerUser(this.user).subscribe((data: any) => {
        console.log(data);
        // You can add further logic here, such as redirecting the user after successful registration.
      });
    } else {
      // Password validation failed, handle or display an error message.
      console.log("Registration failed: Passwords do not match or criteria not met.");
    }
  }
}
