import { Component, OnInit } from '@angular/core';
import * as http from "http";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  getUsers() : void
  {
  }

}
