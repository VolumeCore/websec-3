import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DataService} from "../../services/data.service";
import {PostModel} from "../../models/common.model";

@Component({
    selector: 'posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PostsListComponent implements OnInit {
    public postsList: PostModel[] = [];

    constructor(public dataService: DataService) {
    }

    ngOnInit(): void {
        this.postsList = this.dataService.getPosts();
    }

}
