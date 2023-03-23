import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {map, Observable} from 'rxjs';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AccountService, private toastr: ToastrService) {

  }

  canActivate(): Observable<boolean> {
    // @ts-ignore
    return this.accountService.currentUser$.pipe(
      map((user : User) => {
        const rights = (right:any) => right == "Admin" || right == "Moderator";
        if(user.roles.some(rights)){
          return true;
        }
        this.toastr.error('You cannot enter this area');
        return false;
      })
    )
  }

}
