import {Component, OnInit} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {Router} from "@angular/router";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUser$: Observable<User> = new Observable<User>();
  usernameTest: string = ""
  model: any = {};

  constructor(public accountService: AccountService, private router:Router, private toast:ToastrService) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl("/members");
      console.log(response);
      this.usernameTest = this.model.username;
    })
  }

  logout() {
    this.router.navigateByUrl("/");
    this.accountService.logout();
  }
}
