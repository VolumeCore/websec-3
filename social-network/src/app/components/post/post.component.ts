import {AfterViewInit, Component, Inject, Injector, Input, OnInit} from '@angular/core';
import {PostModel} from "../../models/common.model";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
    selector: 'post-entity',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
    @Input() public postData: PostModel;
    public isDialog: boolean = false;
    public commentsVisible: boolean = false;

    constructor(private injector: Injector) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        if (!this.postData) {
            this.isDialog = true;
            this.postData = this.injector.get(MAT_DIALOG_DATA, null);
        }
    }

}
