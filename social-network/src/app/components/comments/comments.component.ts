import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../../models/common.model";
import {DataService} from "../../services/data.service";

@Component({
    selector: 'comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.less']
})
export class CommentsComponent implements OnInit {
    @Input() public comments: CommentModel[] = [];
    @Input() public postId: string;
    public newCommentText: string;

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
    }

    public addComment(): void {
        // @ts-ignore
        const commentText = document.getElementById("commentText")?.value || 'Случайный текст комментария';
        this.dataService.addComment(commentText, this.postId)
            .subscribe((res: any) => {
                console.log(res);
                if (!res?.commentId) {
                    console.log('Error adding comment');
                } else {
                    this.dataService.getUserStats(res.userId, true)
                        .subscribe((user: any) => {
                            this.comments.push({
                                user: {
                                    username: user.username,
                                    avatarSrc: 'img/' + user.imageUId
                                },
                                date: res.date,
                                commentText: res.commentText
                            })
                    })
                }
            },
            (err: any) => {
                if (err.status === 401) {
                    this.dataService.updateToken();
                }
            })
    }
}
