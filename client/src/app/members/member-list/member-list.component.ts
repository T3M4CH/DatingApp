import {Component, OnInit} from '@angular/core';
import * as http from "http";
import {HttpClient} from "@angular/common/http";
import {Member} from "../../models/member";
import {MembersService} from "../../_services/members.service";
import {EMPTY, Observable, take} from "rxjs";
import {Pagination} from "../../models/pagination";
import {UserParams} from "../../_modules/userParams";
import {AccountService} from "../../_services/account.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[] | null = [];
  pagination?: Pagination;
  user: User = new class implements User {
    gender: string = '';
    knownAs: string = '';
    photoUrl: string = '';
    token: string = '';
    username: string = '';
  };
  userParams: UserParams = new UserParams(this.user);
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  resetFilters(){
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
