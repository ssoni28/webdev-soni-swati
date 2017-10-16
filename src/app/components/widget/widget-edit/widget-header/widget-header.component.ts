import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

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
      if (params['widgetType']) {
        this.pageId = params['widgetType'];
      }
      this.findWidgetById();
    });

  }

  findWidgetById() {
    this.widget = this.widgetService.findWidgetById(this.widgetId);
    if (this.widget) {
      this.widgetFlag = true;
      this.widgetText = this.widget.text;
      this.widgetSize = this.widget.size;
    } else {
      this.widgetText = '';
      this.widgetSize = '';
      this.widgetFlag = false;
    }
  }

  updateWidget() {
    if (this.widgetText === '' || this.widgetSize === '') {
      this.errorFlag = true;
    } else {
      if (!this.widgetFlag) {
        const widget = new Widget(this.widgetId, this.widgetType, this.pageId, this.widgetSize, this.widgetText, '', '');
        this.widgetService.createWidget(this.pageId, this.widget);
      } else {
        const widget = new Widget(this.widgetId, this.widgetType, this.pageId, this.widgetSize, this.widgetText, '', '');
        this.widgetService.updateWidget(this.widgetId, this.widget);
      }
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
    }
  }

}
