import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Member} from "../../models/member";
import {Photo} from "../../models/photo";
import {User} from "../../models/user";
import {AccountService} from "../../_services/account.service";
import {MembersService} from "../../_services/members.service";
import {take} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm = new NgForm([],[]);
  member: Member = new class implements Member {
    age: number = 0;
    city: string = "";
    country: string = "";
    created: Date = new Date();
    gender: string = '';
    id: number = 1;
    interests: string = '';
    knownAs: string = '';
    lastActive: Date = new Date();
    lookingFor: string = '';
    photoUrl: string = '';
    photos: Photo[] = [];
    username: string = '';
  };

  user: User = new class implements User {
    gender: string  = '';
    knownAs: string  = '';
    token: string = '';
    username: string = '';
    photoUrl: string = '';
    roles = [];
  }
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(private accountService: AccountService, private memberService: MembersService, private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    })
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success("Profile updated successfully");
      this.editForm.reset(this.member);
    }, error => {
      this.toastr.error("Unsuccess");
    })
  }
}
