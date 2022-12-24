import {Injectable} from '@angular/core';
import {CommentModel, PostModel, UserModel} from "../models/common.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {logoutIcon} from "../constants/icons.const";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public postsData: PostModel[] = [];
    private headers = new HttpHeaders();


    constructor(private http: HttpClient, private router: Router) {
        this.headers = this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');

        this.http.get('api/posts', {headers: this.headers})
            .subscribe((res: any) => {
                const dataResponse: any[] = res;

                for (let post of dataResponse) {
                    this.http.get('api/get/user?id=' + post.userID, {headers: this.headers})
                        .subscribe((user: any) => {
                                console.log(user);
                                this.postsData.push({
                                    user: {username: user.username, avatarSrc: 'img/' + user.imageUId},
                                    id: post.postId,
                                    date: post.date,
                                    likesCount: post.likes?.length || 0,
                                    commentsCount: post.comments?.length || 0,
                                    description: post.description,
                                    postImageSrc: `img/${post.imageUId}`,
                                    comments: []
                                });
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
                                        this.postsData[0].comments.push(resComment);
                                    })
                                }
                            },
                            (err: any) => {
                                if (err.status === 401) {
                                    this.updateToken();
                                }
                            });
                }
            })
    }

    getPosts(): PostModel[] {
        return this.postsData;
    }

    public getUserStats(username: string, byId?: boolean): Observable<UserModel> {
        return this.http.get<UserModel>(`api/get/user?${byId ? 'id' : 'username'}=` + username, {headers: this.headers});
    }

    public createPost(formData: any, description: string) {
        console.log('clicked');
        this.http.post('api/upload', formData, {headers: this.headers})
            // @ts-ignore
            .subscribe((res: any) => {
                    if (res?.imageUId) {
                        const body = JSON.stringify({"description": description, "imageUId": res.imageUId})
                        this.http.post('api/upload/post', body, {headers: this.headers})
                            .subscribe((res: any) => {
                                console.log(res);
                                if (res.status === 200) {
                                    return true;
                                } else {
                                    return false;
                                }
                            })
                    } else {
                        return false;
                    }
                },
                (err: any) => {
                    if (err.status === 401) {
                        this.updateToken();
                    }
                });
    }

    public addComment(commentText: string, postId: string): Observable<CommentModel> {
        const body = JSON.stringify({"commentText": commentText, "postId": postId});
        console.log(body);
        return this.http.post<CommentModel>('api/set/comment', body, {headers: this.headers});
    }

    public updateToken(): void {
        const body = "\"" + localStorage.getItem('refreshToken') + "\"" || '';
        console.log(body);
        this.http.post('api/refresh', body)
            .subscribe((res: any) => {
                console.log(res);
                if (res?.refreshToken) {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('refreshToken', res.refreshToken);
                    this.router.navigate(['']);
                    location.reload();
                }
            });
    }
}
