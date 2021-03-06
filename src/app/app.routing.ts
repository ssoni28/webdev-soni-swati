import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import { WebsiteNewComponent } from './components/website/website-new/website-new.component';
import { WebsiteEditComponent } from './components/website/website-edit/website-edit.component';
import { PageListComponent } from './components/page/page-list/page-list.component';
import { PageNewComponent } from './components/page/page-new/page-new.component';
import { PageEditComponent } from './components/page/page-edit/page-edit.component';
import { WidgetListComponent } from './components/widget/widget-list/widget-list.component';
import { WidgetChooserComponent } from './components/widget/widget-chooser/widget-chooser.component';
import { WidgetEditComponent } from './components/widget/widget-edit/widget-edit.component';
import {WidgetHeaderComponent} from './components/widget/widget-edit/widget-header/widget-header.component';
import {WidgetYoutubeComponent} from './components/widget/widget-edit/widget-youtube/widget-youtube.component';
import {WidgetImageComponent} from './components/widget/widget-edit/widget-image/widget-image.component';
import {FlickrImageSearchComponent} from './components/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import {WidgetHtmlComponent} from './components/widget/widget-edit/widget-html/widget-html.component';
import {WidgetTextComponent} from './components/widget/widget-edit/widget-text/widget-text.component';
import {AuthenticationService} from './services/authentication.service.server';
import {HomeComponent} from './components/home/home.component';



const APP_ROUTES: Routes = [
  { path: '', component : HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:userId', component: ProfileComponent, canActivate: [AuthenticationService]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationService]},
  { path: 'user/:userId/website', component: WebsiteListComponent, canActivate: [AuthenticationService] },
  { path: 'user/:userId/website/new', component: WebsiteNewComponent, canActivate: [AuthenticationService] },
  { path: 'user/:userId/website/:websiteId', component: WebsiteEditComponent, canActivate: [AuthenticationService] },
  { path: 'user/:userId/website/:websiteId/page', component: PageListComponent, canActivate: [AuthenticationService] },
  { path: 'user/:userId/website/:websiteId/page/new', component: PageNewComponent },
  { path: 'user/:userId/website/:websiteId/page/:pageId', component: PageEditComponent },
  { path: 'user/:userId/website/:websiteId/page/:pageId/widget', component: WidgetListComponent },
  { path: 'user/:userId/website/:websiteId/page/:pageId/widget/new', component: WidgetChooserComponent },
  { path: 'user/:userId/website/:websiteId/page/:pageId/widget/new/HEADING', component: WidgetHeaderComponent },
  { path: 'user/:userId/website/:websiteId/page/:pageId/widget/new/YOUTUBE', component: WidgetYoutubeComponent },
  { path: 'user/:userId/website/:websiteId/page/:pageId/widget/new/IMAGE', component: WidgetImageComponent },
  { path: 'user/:userId/website/:websiteId/page/:pageId/widget/new/HTML', component: WidgetHtmlComponent },
  { path: 'user/:userId/website/:websiteId/page/:pageId/widget/new/TEXT', component: WidgetTextComponent },
  { path: 'user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/search', component: FlickrImageSearchComponent },
  { path: 'user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', component: WidgetEditComponent }
];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
