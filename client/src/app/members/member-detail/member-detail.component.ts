import {Component, OnInit} from '@angular/core';
import {MembersService} from "../../_services/members.service";
import {ActivatedRoute} from "@angular/router";
import {Member} from "../../models/member";
import {Photo} from "../../models/photo";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "@kolkov/ngx-gallery";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member = new class implements Member {
    age: number = 0;
    city: string = "";
    country: string = "";
    created: Date = new Date();
    gender: string = "";
    id: number = 1;
    interests: string = "";
    knownAs: string = "";
    lastActive: Date = new Date();
    lookingFor: string = "";
    photoUrl: string = "";
    photos: Photo[] = [];
    username: string = "";
  };

  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadMember()

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  getImages() : NgxGalleryImage[]{
    const imageUrls = [];
    for (const photo of this.member.photos){
      imageUrls.push({
        small:photo?.url,
        medium:photo?.url,
        big:photo?.url
      })
    }
    return imageUrls;
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')!).subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImages();
    });
  }

}
