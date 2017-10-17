import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  userId: String;
  websiteId: String;
  name: String;
  description: String;
  websites: Website[];
  constructor( private websiteService: WebsiteService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['userId']) {
        this.userId = params['userId'];
      }
      if (params['websiteId']) {
        this.websiteId = params['websiteId'];
      }
    });
    this.findWebsitesByUserId();
    this.getWebsite();
  }

  getWebsite() {
    const currentWebsite = this.websiteService.findWebsiteById(this.websiteId);
    if (currentWebsite) {
      this.name = currentWebsite.name;
      this.description = currentWebsite.description;
      this.userId = currentWebsite.developerId;
    }
  }

  findWebsitesByUserId() {
    const websites = this.websiteService.findWebsitesByUser(this.userId);
    this.websites = websites;
  }

  updateWebsite() {
    const website = new Website(this.websiteId, this.name, this.userId, this.description);
    this.websiteService.updateWebsite(this.websiteId, website);
    this.router.navigate(['/user', this.userId, 'website']);
  }

}
