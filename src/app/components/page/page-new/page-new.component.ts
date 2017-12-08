import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Page} from '../../../models/page.model.client';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
  @ViewChild('f') pageForm: NgForm;
  userId: String;
  websiteId: String;
  page: Page;
  pages: Page[];
  name: String;
  title: String;
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

  createPage() {
    const newPage = {
      name: this.pageForm.value.name,
      websiteId: this.websiteId,
      title: this.pageForm.value.title
    };
    /* this.page = new Page('', this.name, this.websiteId, this.title);*/
    if (newPage.name !== '') {
      this.pageService.createPage(this.websiteId, newPage)
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


}
