import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostListComponent} from './components/posts-list/post-list.component';
import {PostComponent} from './components/post/post.component';
import {DataService} from "./services/data.service";
import {CommentsComponent} from './components/comments/comments.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RightSidePanelComponent} from './components/right-side-panel/right-side-panel.component';
import {HeaderCarouselComponent} from './components/header-carousel/header-carousel.component';
import {IvyCarouselModule} from "angular-responsive-carousel";
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
    declarations: [
        AppComponent,
        PostListComponent,
        PostComponent,
        CommentsComponent,
        RightSidePanelComponent,
        HeaderCarouselComponent,
        UserProfileComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        IvyCarouselModule
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
