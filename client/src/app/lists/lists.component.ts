import {Component, OnInit} from '@angular/core';
import * as http from "http";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  users: any

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.http.get("http://localhost:5162/api/users").subscribe(response => {
      this.users = response;
    }, error => console.log("ОШИБКА ОТМЕНА ОПЕРАЦИИ!!!!"))
  }

}
