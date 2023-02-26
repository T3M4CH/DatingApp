import {Component, OnInit, ViewChild} from '@angular/core';
import {MembersService} from "../../_services/members.service";
import {ActivatedRoute} from "@angular/router";
import {Member} from "../../models/member";
import {Photo} from "../../models/photo";
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from "@kolkov/ngx-gallery";
import {TabDirective, TabsetComponent, TabsetConfig} from "ngx-bootstrap/tabs";
import {Message} from "../../models/message";
import {MessageService} from "../../_services/message.service";

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent = null!
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

  activeTab: TabDirective = null!;
  messages: Message[] = [];
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute,
              private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.route.data.subscribe((data : any) => {
      this.member = data.member;
    })

    this.route.queryParams.subscribe((params : any) => {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    });

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

    this.galleryImages = this.getImages();
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

  loadMessages(){
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    })
  }

  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab.heading === 'Messages' && this.messages.length === 0){
      this.loadMessages();
    }
  }

}
