import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  userId: String;
  websites: Website[];
  constructor(private websiteService: WebsiteService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

  }

}
