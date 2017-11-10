import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

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
    if (this.websiteId) {
      this.widgetService.findWidgetById(this.widgetId)
        .subscribe(
          (data: any) => {
            if (data) {
              this.widgetFlag = true;
              this.widget = data;
              this.widgetSize = this.widget.size;
              this.widgetText = this.widget.text;
            }
          }, (error: any) => {
          }
        );
    }

  }
  updateWidget() {
    const widget = {
      widgetType: 'HTML',
      text: this.widgetText,
      size: this.widgetSize
    };
    /* const widget = new Widget(this.widgetId, 'IMAGE', this.pageId, '', this.widgetText, this.widgetWidth, this.widgetURL);*/
    if (this.widgetId) {
      this.widgetService.updateWidget(this.widgetId, widget)
        .subscribe(
          (data: any) => {
            this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
          }
        );
    } else {
      this.widgetService.createWidget(this.pageId, widget)
        .subscribe(
          (data: any) => {
            this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
          }
        );
    }

  }

  deleteWidget() {
    if (this.widgetId) {
      this.widgetService.deleteWidget(this.widgetId)
        .subscribe(
          (data: any) => {
            this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
          }
        );
    }
  }

}
