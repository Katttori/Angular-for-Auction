import { LoginService } from './../../Services/login.service';
import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import UserInfo from 'src/app/models/userInfo';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: UserInfo[];
  selectedUser: UserInfo;

  onSelect(user: UserInfo) {
    this.selectedUser = user;
    this.userService.getSpecialRole(this.selectedUser.id)
    .subscribe(data => this.selectedUser.role = data, error => console.log(error.message));
  }
  constructor(private userService: UserService) { }

  makeModerator() {
    this.userService.makeModerator(this.selectedUser.id).subscribe(data => console.log(data),
    error => console.log(error.message),
    () => this.userService.getSpecialRole(this.selectedUser.id)
    .subscribe(data => this.selectedUser.role = data, error => console.log(error.message)));
  }
  makeAdmin() {
    this.userService.makeAdmin(this.selectedUser.id).subscribe(data => console.log(data),
    error => console.log(error.message),
    () => this.userService.getSpecialRole(this.selectedUser.id)
    .subscribe(data => this.selectedUser.role = data, error => console.log(error.message)));
  }
  makeUser() {
    this.userService.makeUser(this.selectedUser.id).subscribe(data => console.log(data),
    error => console.log(error.message),
    () => this.userService.getSpecialRole(this.selectedUser.id)
    .subscribe(data => this.selectedUser.role = data, error => console.log(error.message)));
  }
  getUsers() {
    this.userService.getAll().subscribe(data => this.users = data, error => console.log(error.message));
  }
  ngOnInit() {
    this.getUsers();
  }

}
