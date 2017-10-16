import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: string;
  widgetId: String;
  widgetType: String;
  widgetText: String;
  widgetURL: String;
  widgetWidth: String;
  errorFlag: boolean;
  errorMsg = 'Fields can not be blank';
  widgetFlag: boolean;
  widget: Widget;
  constructor(private widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.errorFlag = false;
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
      this.findWidgetById();
    });

  }

  findWidgetById() {
    this.widget = this.widgetService.findWidgetById(this.widgetId);
    if (this.widget) {
      this.widgetFlag = true;
      this.widgetURL = this.widget.url;
      this.widgetWidth = this.widget.width;
    } else {
      this.widgetURL = '';
      this.widgetWidth = '';
      this.widgetFlag = false;
    }
  }

  updateWidget() {
    const widget = new Widget(this.widgetId, 'YOUTUBE', this.pageId, '', '', 'widgetWidth', 'widgetURL');
    if (this.widgetId) {
      this.widgetService.updateWidget(this.widgetId, widget);
    } else {
          this.widgetService.createWidget(this.pageId, widget);
      }
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
    }

  deleteWidget() {
    if (this.widgetId) {
      this.widgetService.deleteWidget(this.widgetId);
    }
  }
}
