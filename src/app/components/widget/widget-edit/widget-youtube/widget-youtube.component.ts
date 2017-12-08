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
  widgetFlag: boolean;
  widgetName: String;
  widget: Widget;errorFlag: boolean;
  errorMsg = 'Fields can not be blank';

  constructor(private widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) { }

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
      this.findWidgetById();
    });

  }

  findWidgetById() {
    const widget = this.widgetService.findWidgetById(this.widgetId)
      .subscribe(
        (data: any) => {
          if (data) {
            this.widget = data;
            this.widgetName = data.name;
            this.widgetFlag = true;
            this.widgetURL = data.url;
            this.widgetWidth = data.width;
          } else {
            this.widgetName = '';
            this.widgetURL = '';
            this.widgetWidth = '';
            this.widgetFlag = false;
          }
        }
      );
  }

  updateWidget() {
    const widget = {
      widgetType: 'YOUTUBE',
      pageId: this.pageId,
      width: this.widgetWidth,
      url: this.widgetURL,
      name: this.widgetName
    };
   /* const widget = new Widget(this.widgetId, 'YOUTUBE', this.pageId, '', '', this.widgetWidth, this.widgetURL);*/
    if (this.widgetId) {
      if (widget.name !== '') {
      this.widgetService.updateWidget(this.widgetId, widget)
        .subscribe(
          (data: any) => {
            this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
          }
        );
      } else {
        this.errorFlag = true;
        this.errorMsg = 'Please provide widget name';
      }
    } else {
      if (widget.name !== '') {
          this.widgetService.createWidget(this.pageId, widget)
            .subscribe(
              (data: any) => {
                this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
              }
            ); } else {
        this.errorFlag = true;
        this.errorMsg = 'Please provide widget name';
      }

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
