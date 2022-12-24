import {Component, OnInit} from '@angular/core';
import {CommentModel, PostModel, UserModel} from "../../models/common.model";
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
    public userInfo: UserModel;
    public isMyProfile: boolean = true;

    constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        if (!localStorage.getItem('token')) {
            this.router.navigate(['401']);
        }
        this.dataService.getUserStats(this.route.snapshot.url[1].path || '')
            .subscribe((user: any) => {
                console.log(user);
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

}
