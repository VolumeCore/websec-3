import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../../models/common.model";
import {DataService} from "../../services/data.service";

@Component({
    selector: 'comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.less']
})
export class CommentsComponent implements OnInit {
    public comments: CommentModel[];

    constructor(private dataService: DataService) {
    }

    ngOnInit(): void {
        this.comments = this.dataService.getComments();
    }

    loadNextComments(): void {
        this.comments.push(...this.dataService.getComments());
    }
}
