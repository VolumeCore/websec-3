import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostsListComponent} from './components/posts-list/posts-list.component';
import {PostComponent} from './components/post/post.component';
import {DataService} from "./services/data.service";
import {CommentsComponent} from './components/comments/comments.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
    declarations: [
        AppComponent,
        PostsListComponent,
        PostComponent,
        CommentsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
