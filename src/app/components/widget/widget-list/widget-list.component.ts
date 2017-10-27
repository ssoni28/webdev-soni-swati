import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../models/widget.model.client';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgets: Widget[];
  widgetWidth: String;
  widgetId: String;
  url: String;
  constructor(private widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router,
              private domSanitizer: DomSanitizer) {
  }

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
      if (params['widgetId']) {
        this.widgetId = params['widgetId'];
      }
    });
    this.findWidgetsByPageId();
  }

  findWidgetsByPageId() {
    this.widgetService.findWidgetsByPageId(this.pageId)
      .subscribe(
        (data: any) => {
          this.widgets = data;
        }
      );
  }

  safeURL(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  assignWidth(width: string) {
    this.widgetWidth = width;
  }
}
