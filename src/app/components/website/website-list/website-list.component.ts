import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WebsiteService} from '../../../services/website.service.client';

import 'rxjs/Rx';
import {Website} from '../../../models/website.model.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  userId: String;
  websiteId: String;
  websites: Website[];
  constructor(private websiteService: WebsiteService,
              private router: Router,
              private route: ActivatedRoute) { }

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
        (data: any) => {
          this.websites = data;
        }
      );
  }

}
