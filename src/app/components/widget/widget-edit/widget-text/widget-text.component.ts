import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: string;
  widgetId: String;
  widgetType: String;
  widgetText: String;
  widgetSize: String;
  errorFlag: boolean;
  widgetName: String;
  errorMsg = 'Fields can not be blank';
  widgetFlag: boolean;
  widget = {placeholder: '', rows: '', formatted: '', name: '', text: '', size: '', type: 'TEXT'};
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
      this.widgetService.findWidgetById(this.widgetId)
        .subscribe(
          (data: any) => {
            if (data) {
              this.widgetFlag = true;
              this.widget = data;
              this.widgetName = data.name;
              this.widgetSize = data.size;
              this.widgetText = data.text;
            }
          }, (error: any) => {
          }
        );

  }
  updateWidget() {
    const widget = {
      widgetType: 'TEXT',
      text: this.widgetText,
      size: this.widgetSize,
      name: this.widgetName
    };
    /* const widget = new Widget(this.widgetId, 'IMAGE', this.pageId, '', this.widgetText, this.widgetWidth, this.widgetURL);*/
    if (this.widgetId) {
      if (widget.name !== '') {
      this.widgetService.updateWidget(this.widgetId, this.widget)
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
      this.widgetService.createWidget(this.pageId, this.widget)
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
