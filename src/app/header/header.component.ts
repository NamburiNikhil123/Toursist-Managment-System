import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private userService: UserService) {}

  getLoginStatus(): boolean {
    return this.userService.getLoginStatus();
  }

  getUserName(): string {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      return user.name; // Assuming the user object has a 'name' property
    }
    return "";
  }

  logout() {
    localStorage.removeItem("user"); // Remove user data from local storage
    this.userService.setUserLogOut();
    // Other logout logic
  }
}
