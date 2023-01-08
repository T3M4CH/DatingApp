import {Component, Input, OnInit} from '@angular/core';
import {Member} from "../../models/member";
import {Photo} from "../../models/photo";
import {FileUploader} from "ng2-file-upload";
import {environment} from "../../../environments/environment";
import {AccountService} from "../../_services/account.service";
import {take} from "rxjs";
import {User} from "../../models/user";
import {MembersService} from "../../_services/members.service";

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member = new class implements Member {
    age: number = 0;
    city: string = '';
    country: string = '';
    created: Date = new Date;
    gender: string = '';
    id: number = 0;
    interests: string = '';
    knownAs: string = '';
    lastActive: Date = new Date;
    lookingFor: string = '';
    photoUrl: string = '';
    photos: Photo[] = [];
    username: string = '';
  };

  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User = new class implements User {
    token: string = '';
    username: string = '';
    photoUrl: string = '';
  }

  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.uploader = new FileUploader({
      url: this.baseUrl + "users/add-photo",
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;

      this.uploader.onSuccessItem = (item, response, status,headers) => {
        if(response){
          const photo = JSON.parse(response);
          this.member.photos.push(photo);
        }
      }
    }
  }

  ngOnInit(): void {
  }

  fileOverBase(event : any){
    this.hasBaseDropzoneOver = event;
  }

  setMainPhoto(photo : Photo){
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;
      this.member.photos.forEach(p => {
        if(p.isMain) p.isMain = false
        if(p.id === photo.id) p.isMain = true;
      })
    });
  }

  deletePhoto(photoId : number){
    this.memberService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(x => x.id !== photoId);
    })
  }
}
