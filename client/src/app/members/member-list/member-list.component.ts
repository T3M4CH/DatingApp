import { Component, OnInit } from '@angular/core';
import * as http from "http";
import {HttpClient} from "@angular/common/http";
import {Member} from "../../models/member";
import {MembersService} from "../../_services/members.service";
import {EMPTY} from "rxjs";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[] = new Array<Member>;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadMembers()
  }

  loadMembers(){
    this.memberService.getMembers().subscribe(members => {
      this.members = members;
    })
  }
}
