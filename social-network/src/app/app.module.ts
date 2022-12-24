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
import {MatGridListModule} from "@angular/material/grid-list";
import {RouterModule, Routes} from "@angular/router";
import { AuthorizationComponent } from './components/authorization/authorization.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

const routes: Routes = [
    {path : '', component : HomeComponent},
    {path : 'user/:username', component : UserProfileComponent},
    {path : 'login', component : AuthorizationComponent},
    {path : 'register', component : AuthorizationComponent},
    {path : '401', component : UnauthorizedComponent}
];

@NgModule({
    declarations: [
        AppComponent,
        PostListComponent,
        PostComponent,
        CommentsComponent,
        RightSidePanelComponent,
        HeaderCarouselComponent,
        UserProfileComponent,
        AuthorizationComponent,
        HomeComponent,
        UnauthorizedComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        IvyCarouselModule,
        MatGridListModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatCheckboxModule,
        [RouterModule.forRoot(routes)],
        [RouterModule],
        HttpClientModule
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
