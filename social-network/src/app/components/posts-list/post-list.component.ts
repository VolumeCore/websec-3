import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataService} from "../../services/data.service";
import {CommentModel, PostModel} from "../../models/common.model";

@Component({
    selector: 'post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PostListComponent implements OnInit {
    public postsList: PostModel[] = [];

    constructor(public dataService: DataService) {
    }

    ngOnInit(): void {
        this.postsList = this.dataService.getPosts();

        console.log(this.postsList);
    }

}
