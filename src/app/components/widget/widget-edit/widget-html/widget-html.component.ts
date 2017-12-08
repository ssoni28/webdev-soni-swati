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
  widgetSize: String;
  errorFlag: boolean;
  errorMsg = 'Fields can not be blank';
  widgetFlag: boolean;
  widget: any;
  widgetURL: String;
  widgetWidth: String;
  widgetName: String;
  public editor;
  public widgetText: any;
  constructor(private widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) { }

  onEditorCreated(quill) {
    this.editor = quill;
  }

  onContentChanged({quill, html, text}) {

  }
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
    if (this.widgetId) {
      this.widgetService.findWidgetById(this.widgetId)
        .subscribe(
          (data: any) => {
            if (data) {
              this.widgetFlag = true;
              this.widget = data;
              this.widgetSize = data.size;
              this.widgetText = data.text;
              this.widgetName = data.name;
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
      size: this.widgetSize,
      name: this.widgetName
    };
    /* const widget = new Widget(this.widgetId, 'IMAGE', this.pageId, '', this.widgetText, this.widgetWidth, this.widgetURL);*/
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
