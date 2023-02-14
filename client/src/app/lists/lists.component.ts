import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Member} from "../models/member";
import {MembersService} from "../_services/members.service";
import {Pagination} from "../models/pagination";

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {

  members: Partial<Member[]> = new Array<Member>();
  predicate = 'liked';
  pageNumber = 1;
  pageSize = 5;
  pagination: Pagination = new class implements Pagination {
    currentPage: number = 1;
    itemsPerPage: number = 1;
    totalItems: number = 1;
    totalPages: number = 1;
  };

  constructor(private memberService : MembersService) {
  }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(){
    this.memberService.getLikes(this.predicate, this.pageNumber, this.pageSize).subscribe(response => {
      this.members = response.result!;
      this.pagination = response.pagination!;
    })
  }

  pageChanged(event : any){
    this.pageNumber = event.page;
    this.loadLikes();
  }
}
