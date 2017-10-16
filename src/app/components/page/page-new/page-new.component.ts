import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  userId: String;
  websiteId: String;
  page: Page;
  pages: Page[];
  name: String;
  title: String;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private pageService: PageService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['userId']) {
        this.userId = params['userId'];
      }
      if (params['websiteId']) {
        this.websiteId = params['websiteId'];
      }
    });
    this.findPagesByWebsiteId();
  }

  findPagesByWebsiteId() {
    const pages = this.pageService.findPageByWebsiteId(this.websiteId);
    this.pages = pages;
  }

  createPage() {
    this.page = new Page('', this.name, this.websiteId, this.title);
    this.pageService.createPage(this.websiteId, this.page);
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
  }


}
