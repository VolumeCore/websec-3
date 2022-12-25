import {Component, OnInit} from '@angular/core';
import {CommentModel, PostModel, UserModel} from "../../models/common.model";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {PostComponent} from "../post/post.component";

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
    public userInfo: UserModel;
    public isMyProfile: boolean = true;
    public isSubscribed: boolean;
    private followSubscription: Subscription;

    constructor(private dataService: DataService, public router: Router, private route: ActivatedRoute, public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.followSubscription = this.dataService.subscriptionChange.subscribe((value: any) => value ? (this.isSubscribed = !this.isSubscribed) : false);
        if (!localStorage.getItem('token')) {
            this.router.navigate(['401']);
        }
        this.dataService.getUserStats(this.route.snapshot.url[1].path || '')
            .subscribe((user: any) => {
                console.log(user);

                this.dataService.getUserStats(localStorage.getItem('username') || '')
                    .subscribe((myUser: any) => {
                        console.log(myUser);
                        if (myUser.follows.find((u: any) => u.followId === user.userId)) {
                            this.isSubscribed = true;
                        } else {
                            this.isSubscribed = false;
                        }
                        if (myUser.userId === user.userId) {
                            this.isMyProfile = true;
                        } else {
                            this.isMyProfile = false;
                        }
                    })

                const dataResponse: any[] = user.posts;

                this.userInfo = {
                    username: user.username,
                    avatarSrc: 'img/' + user.imageUId,
                    followersCount: user.followers?.length || 0,
                    followsCount: user.follows?.length || 0,
                    postsCount: user.posts?.length || 0,
                    followers: user.followers || [],
                    follows: user.follows || [],
                    posts: []
                }
                console.log(this.userInfo);

                for (let post of dataResponse) {
                    this.userInfo.posts?.push({
                        user: {username: user.username, avatarSrc: 'img/' + user.imageUId},
                        id: post.postId,
                        date: post.date,
                        likesCount: post.likes?.length || 0,
                        commentsCount: post.comments?.length || 0,
                        description: post.description,
                        postImageSrc: 'img/' + post.imageUId,
                        comments: []
                    });
                    if (post.comments) {
                        for (let comment of post.comments) {
                            let resComment: CommentModel;
                            // @ts-ignore
                            this.getUserStats(comment.userId, true).subscribe((res: any) => {
                                resComment = {
                                    user: {
                                        username: res.username,
                                        avatarSrc: 'img/' + res.imageUId
                                    },
                                    commentText: comment.commentText,
                                    date: comment.date,
                                };
                                this?.userInfo?.posts?.[0]?.comments.push(resComment);
                            })
                        }
                    }
                }
            })
    }

    public subscribeButton(): void {
        this.isSubscribed ? this.dataService.unfollowRequest(this.userInfo.username) : this.dataService.followRequest(this.userInfo.username);
        // this.router.navigate(['']);
    }

    public openPost(post: PostModel): void {
        console.log(post);
        this.dialog.open(PostComponent, {
            data: post
        })
    }

}
