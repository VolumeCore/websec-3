import {Injectable} from '@angular/core';
import {CommentModel, PostModel, UserModel} from "../models/common.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {finalize, Observable, Subject, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public postsData: PostModel[] = [];
    private headers = new HttpHeaders();
    public subscriptionChange: Subject<any> = new Subject<any>();


    constructor(private http: HttpClient, private router: Router) {
        this.headers = this.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token') || '');

        this.http.get('api/posts', {headers: this.headers})
            .subscribe((res: any) => {
                const dataResponse: any[] = res;

                for (let post of dataResponse) {
                    this.http.get('api/get/user?id=' + post.userID, {headers: this.headers})
                        .subscribe((user: any) => {
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
                                        this.postsData.find((p) => p.id === comment.postId)?.comments.push(resComment);
                                        // this.postsData[-postsLoadedCount].comments.push(resComment);
                                        // postsLoadedCount++;
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

    public updateAvatar(imageUId: string) {
        const body = JSON.stringify({"imageUId": imageUId});
        return this.http.post('api/set/userphoto', body, {headers: this.headers});
    }

    public uploadPhoto(formData: any): Observable<any> {
        return this.http.post('api/upload', formData, {headers: this.headers});
    }

    public followRequest(username: string): void {
        this.http.get('api/subscribe?username=' + username, {headers: this.headers})
            .subscribe((res: any) => {
                    this.subscriptionChange.next({subscribed: true, username: username});
                },
                (err: any) => {
                    this.subscriptionChange.next(false);
                });
    }

    public unfollowRequest(username: string): void {
        this.http.get('api/unsubscribe?username=' + username, {headers: this.headers})
            .subscribe((res: any) => {
                    this.subscriptionChange.next({subscribed: false, username: username});
                },
                (err: any) => {
                    this.subscriptionChange.next(false);
                });
    }

    public createPost(formData: any, description: string) {
        this.http.post('api/upload', formData, {headers: this.headers})
            // @ts-ignore
            .subscribe((res: any) => {
                    if (res?.imageUId) {
                        const body = JSON.stringify({"description": description, "imageUId": res.imageUId})
                        this.http.post('api/upload/post', body, {headers: this.headers})
                            .subscribe((res: any) => {
                                if (res?.username) {
                                    this.getUserStats(res.username)
                                        .subscribe((user: any) => {
                                            this.postsData.unshift({
                                                user: {
                                                    username: res.username,
                                                    avatarSrc: 'img/' + user.imageUId
                                                },
                                                id: res.postId,
                                                date: res.date,
                                                likesCount: 0,
                                                commentsCount: 0,
                                                comments: [],
                                                postImageSrc: 'img/' + res.imageUId,
                                                description: res.description
                                            })
                                        })
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

    public getUsers(): Observable<any> {
        return this.http.get('api/get/users', { headers: this.headers });
    }
}
