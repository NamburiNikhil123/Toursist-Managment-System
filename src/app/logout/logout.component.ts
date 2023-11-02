import { Component,OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{
  isLoggedIn: boolean = false;
  ngOnInit(){
   
  }
  constructor(private service: UserService, private router: Router) {
    // Check the user's login status when the component is initialized
    this.isLoggedIn = this.service.getLoginStatus();
}

// ...

// Function to handle logout
logout() {
    // Perform logout logic (e.g., clear session, navigate to the login page, etc.)
    // After successful logout, set isLoggedIn to false
    this.isLoggedIn = false;
    this.service.setUserLogOut();
    this.router.navigate(['signin']); // You can navigate to the login page or any other desired page.
}


}
