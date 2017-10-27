import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../services/widget.service.client';
import {Widget} from '../../../models/widget.model.client';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widgetFlag: boolean;
  widget: Widget;
  constructor(private widgetService: WidgetService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.widgetFlag = false;
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
     this.widgetService.findWidgetById(this.widgetId)
        .subscribe(
          (data: Widget) => {
            this.widget = data;
            this.widgetFlag = true;
          }
        );
    });
  }
  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe(
        (data: any) => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        }
      );
  }

}
