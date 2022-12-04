import {Component, Input, OnInit} from '@angular/core';
import {CommentModel, PostModel} from "../../models/common.model";
import {DataService} from "../../services/data.service";

@Component({
    selector: 'post-entity',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {
    @Input() public postData: PostModel;
    public commentsVisible: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

}
