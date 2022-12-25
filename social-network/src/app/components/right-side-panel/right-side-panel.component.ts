import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/common.model";
import {DataService} from "../../services/data.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'right-side-panel',
    templateUrl: './right-side-panel.component.html',
    styleUrls: ['./right-side-panel.component.less']
})
export class RightSidePanelComponent implements OnInit {
    public loggedInUser: UserModel;
    public subscriptions: UserModel[] = [];
    public isAuthorized: boolean = false;
    public createPostDescription: string = '';
    public uploadedFileName: string = '';
    public followersSubscriptions: Subscription;

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.isAuthorized = !!localStorage.getItem("token");
        console.log(localStorage.getItem("username"));
        this.followersSubscriptions = this.dataService.subscriptionChange.subscribe(
            (value: any) => value ? this.updateSubs(value) : false,
            (err: any) => console.log(err)
        );
        this.loadSubs();
    }

    private updateSubs(result: { subscribed: boolean, username: string }): void {
        console.log('VVVVVVVVVVVVVV');
        if (result.subscribed) {
            console.log('IIIIIIIIIII');
            this.dataService.getUserStats(result.username).subscribe((res: any) => {
                console.log(res);
                console.log('JJJJJJJJJ');
                this.subscriptions.push({
                    username: res.username,
                    avatarSrc: 'img/' + res.imageUId,
                    followersCount: res.followers?.length || 0,
                    postsCount: res.posts?.length || 0,
                });
            })
        } else {
            this.subscriptions = this.subscriptions.filter((sub) => sub.username !== result.username);
        }
    }

    private loadSubs(): void {
        this.dataService.getUserStats(localStorage.getItem("username") || '')
            .subscribe((res: any) => {
                    console.log(res);
                    this.loggedInUser = {
                        username: res.username,
                        avatarSrc: 'img/' + res.imageUId,
                        followersCount: res.followers?.length || 0,
                        followsCount: res.follows?.length || 0,
                        postsCount: res.posts?.length || 0,
                    };
                    console.log(res.follows);

                    for (let follower of res.follows) {
                        this.dataService.getUserStats(follower.followId, true).subscribe((res: any) => {
                            this.subscriptions.push({
                                username: res.username,
                                avatarSrc: 'img/' + res.imageUId,
                                followersCount: res.followers?.length || 0,
                                postsCount: res.posts?.length || 0,
                            });
                        })
                    }
                    console.log(this.subscriptions);
                },
                (err: any) => {
                    if (err.status === 401) {
                        this.dataService.updateToken();
                    }
                });
    }

    public logout(): void {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("username");
        this.isAuthorized = false;
        location.reload();
    }

    public updateFileName(): void {
        const inputNode: any = document.querySelector('#file');
        this.uploadedFileName = inputNode?.files?.[0]?.name || '';
    }

    public updateAvatar(): void {
        const inputNode: any = document.querySelector('#avatarFile');
        let formData = new FormData();
        formData.append("file", inputNode?.files[0] || null);
        this.dataService.uploadPhoto(formData)
            .subscribe((res: any) => {
                console.log(res);
                this.dataService.updateAvatar(res.imageUId)
                    .subscribe((result: any) => {
                        this.loggedInUser.avatarSrc = 'img/' + result.imageUId;
                    })
            })
    }

    public async createPostRequest() {
        const inputNode: any = document.querySelector('#file');
        this.uploadedFileName = inputNode?.files?.[0]?.name || '';
        let photo = inputNode?.files?.[0];
        let formData = new FormData();

        formData.append("file", photo);
        // @ts-ignore
        this.dataService.createPost(formData, document.getElementById("postDescription")?.value || '');
    }

    unfollow(username: string): void {
        this.dataService.unfollowRequest(username);
    }

}
