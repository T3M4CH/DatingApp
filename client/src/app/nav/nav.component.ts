import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUser$: Observable<User> = new Observable<User>();
  usernameTest: string = ""
  model: any = {};

  constructor(public accountService: AccountService) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
      this.usernameTest = this.model.username;
    }, error => {
      console.log(error);
    })
  }

  logout() {
    this.accountService.logout();
  }
}
