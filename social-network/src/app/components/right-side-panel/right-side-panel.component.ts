import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/common.model";
import {DataService} from "../../services/data.service";
import {Observable, switchMap} from "rxjs";

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

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.isAuthorized = !!localStorage.getItem("token");
        console.log(localStorage.getItem("username"));
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
        this.isAuthorized = false;
    }

    public updateFileName(): void {
        const inputNode: any = document.querySelector('#file');
        this.uploadedFileName = inputNode?.files?.[0]?.name || '';
    }

    public createPostRequest(): void {
        const inputNode: any = document.querySelector('#file');
        this.uploadedFileName = inputNode?.files?.[0]?.name || '';
        let photo = inputNode?.files?.[0];
        let formData = new FormData();

        formData.append("file", photo);
        // @ts-ignore
        this.dataService.createPost(formData, document.getElementById("postDescription")?.value || '');
    }

}
