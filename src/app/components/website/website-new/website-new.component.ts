import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  website: Website;
  userId: String;
  name: String;
  description: String;
  websites: Website[];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private websiteService: WebsiteService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['userId']) {
        this.userId = params['userId'];
      }
    });
    this.findWebsitesByUserId();
  }

  findWebsitesByUserId() {
     this.websiteService.findWebsitesByUser(this.userId)
      .subscribe(
        (websites: any) => {
          this.websites = websites;
        }
      );
  }

  createWebsite() {
    const newWebsite = {
      name: this.name,
      developerId: this.userId,
      description: this.description
    };
    /*this.website = new Website('', this.name, this.userId, this.description);*/
    this.websiteService.createWebsite(this.userId, newWebsite)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/user', this.userId, 'website']);
        }
      );
  }

}
