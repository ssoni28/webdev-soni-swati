import {Component, OnInit, ViewChild} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Website} from '../../../models/website.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  @ViewChild('f') websiteEditForm: NgForm;
  userId: String;
  websiteId: String;
  name: String;
  description: String;
  websites: Website[];
  errorFlag: boolean;
  errorMsg: String;
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
    this.websiteService.findWebsiteById(this.websiteId)
      .subscribe(
        (currentWebsite: Website) => {
          this.name = currentWebsite.name;
          this.description = currentWebsite.description;
          this.userId = currentWebsite.developerId;
        }
      );
  }

  findWebsitesByUserId() {
    this.websiteService.findWebsitesByUser(this.userId)
      .subscribe(
        (data: any) => {
          this.websites = data;
        }
      );
  }

  updateWebsite() {
    const website = new Website(this.websiteId, this.name, this.userId, this.description);
    if (website.name !== '') {
      this.websiteService.updateWebsite(this.websiteId, website)
        .subscribe(
          (data: any) => {
            this.router.navigate(['/user/', this.userId, 'website']);
          });
    } else {
      this.errorFlag = true;
      this.errorMsg = 'Please provide website name';
    }
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/user/', this.userId, 'website']);
        }
      );
  }
}
