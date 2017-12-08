import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {WidgetService} from '../../../../../services/widget.service.client';
import {FlickrService} from '../../../../../services/flickr.service.client';
import {Widget} from '../../../../../models/widget.model.client';


@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widgetType: String;
  widgetText: String;
  widgetSize: String;
  searchText: String;
  widget: any;
  widgetURL: String;
  widgetWidth: String;
  search: boolean;
  photos: any;

  constructor(private widgetService: WidgetService,
              private flickrService: FlickrService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
        this.userId = params['userId'];
        this.websiteId = params['websiteId'];
        this.pageId = params['pageId'];
       // this.widgetId = params['widgetId'];
      }
    );
    this.widgetService.findWidgetById(this.widgetId).subscribe(
      (widget: any) => {
        this.widget = widget;
      }
    );

  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          console.log(data);
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          console.log(val);
          this.photos = val.photos;
          this.search = true;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
    const widget = {
      widgetType: 'IMAGE',
      websiteId: this.websiteId,
      pageId: this.pageId,
      url: url
    };

    this.widgetService.createWidget(this.pageId, widget)
      .subscribe((data: any) => {
            //  console.log(data);
              this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
      });
  }

}
