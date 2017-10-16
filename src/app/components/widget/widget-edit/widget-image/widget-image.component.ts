import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {


  userId: String;
  websiteId: String;
  pageId: string;
  widgetId: String;
  widgetType: String;
  widgetText: String;
  widgetSize: String;
  errorFlag: boolean;
  errorMsg = 'Fields can not be blank';
  widgetFlag: boolean;
  widget: Widget;
  widgetURL: String;
  widgetWidth: String;
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
      this.widgetText = this.widget.text;
    } else {
      this.widgetWidth = '';
      this.widgetURL = '';
      this.widgetText = '';
      this.widgetFlag = false;
    }
  }

  updateWidget() {
    if (this.widgetURL === '' || this.widgetWidth === '') {
      this.errorFlag = true;
    } else {
      const widget = new Widget(this.widgetId, 'IMAGE', this.pageId, '', this.widgetText, this.widgetWidth, this.widgetURL);
      if (!this.widgetFlag) {
        this.widgetService.createWidget(this.pageId, this.widget);
      } else {
        this.widgetService.updateWidget(this.widgetId, this.widget);
      }
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
    }
  }

  deleteWidget() {
    if (this.widgetId) {
      this.widgetService.deleteWidget(this.widgetId);
    }
  }

}
