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
  widgetName: String;
  errorFlag: boolean;
  errorMsg: String;
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
    this.widgetService.findWidgetById(this.widgetId)
      .subscribe(
        (data: any) => {
          if (data) {
            this.widgetFlag = true;
            this.widgetName = data.name;
            this.widgetText = data.text;
            this.widgetSize = data.size;
          } else {
            this.widgetName = '';
            this.widgetText = '';
            this.widgetSize = '';
            this.widgetFlag = false;
          }
        }
      );
  }
  updateWidget() {
    const widget = {
      widgetType: 'HEADING',
      name: this.widgetName,
      pageId: this.pageId,
      size: this.widgetSize,
      text: this.widgetText
    };
     /* new Widget(this.widgetId, 'HEADING', this.pageId, this.widgetSize, this.widgetText, '', '');*/
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
          );
      } else {
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
