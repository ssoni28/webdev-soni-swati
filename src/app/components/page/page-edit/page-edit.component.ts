import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  @ViewChild('f') pageEditForm: NgForm;
  userId: String;
  websiteId: String;
  pageId: String;
  name: String;
  title: String;
  pages: Page[];
  errorFlag: boolean;
  errorMsg: String;
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
      if (params['pageId']) {
        this.pageId = params['pageId'];
      }
    });
    this.findPagesByWebsiteId();
    this.getPage();
  }

  getPage() {
    this.pageService.findPageById(this.pageId)
      .subscribe(
        (currentPage: Page) => {
          this.name = currentPage.name;
          this.title = currentPage.description;
          this.websiteId = currentPage.websiteId;
        }
      );
  }

  findPagesByWebsiteId() {
    this.pageService.findPageByWebsiteId(this.websiteId)
      .subscribe(
        (pages: any) => {
          this.pages = pages;
        }
      );
  }

  updatePage() {
    const page = new Page(this.pageId, this.name, this.websiteId, this.title);
    if (page.name !== '') {
      this.pageService.updatePage(this.pageId, page)
        .subscribe(
          (data: any) => {
            this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
          }
        );
    } else {
      this.errorFlag = true;
      this.errorMsg = 'Please provide page name';
    }
  }

  deletePage() {
    this.pageService.deletePage(this.pageId)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page']);
        }
      );
  }

}
