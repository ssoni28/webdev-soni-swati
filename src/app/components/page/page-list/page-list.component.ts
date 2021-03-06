import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  name: String;
  description: String;
  pages: Page[];
  constructor(private pageService: PageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['websiteId']) {
        this.websiteId = params['websiteId'];
      }
      if (params['userId']) {
        this.userId = params['userId'];
      }
    });
    this.findPagesByWebsiteId();
  }

  findPagesByWebsiteId() {
    this.pageService.findPageByWebsiteId(this.websiteId)
      .subscribe(
        (data: any) => {
          this.pages = data;
        }
      );
  }

}
