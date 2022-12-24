import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/common.model";

@Component({
    selector: 'right-side-panel',
    templateUrl: './right-side-panel.component.html',
    styleUrls: ['./right-side-panel.component.less']
})
export class RightSidePanelComponent implements OnInit, AfterViewInit {
    public loggedInUser: UserModel = {
        username: "VolumeCore",
        avatarSrc: "https://sun9-8.userapi.com/impg/Zje0KOAAxoWJ0GXZLGALjHsiPfABuZe3ZAsaQw/voVgMBbZIU8.jpg?size=541x600&quality=95&sign=4d2d823aaca1b47b216eb815ce6c0d2b&type=album"
    };
    public subscriptions: UserModel[] = [
        {
            username: "VolumeCore",
            avatarSrc: "https://sun9-8.userapi.com/impg/Zje0KOAAxoWJ0GXZLGALjHsiPfABuZe3ZAsaQw/voVgMBbZIU8.jpg?size=541x600&quality=95&sign=4d2d823aaca1b47b216eb815ce6c0d2b&type=album"
        },
        {
            username: "Dejavu",
            avatarSrc: "https://sun9-8.userapi.com/impg/Zje0KOAAxoWJ0GXZLGALjHsiPfABuZe3ZAsaQw/voVgMBbZIU8.jpg?size=541x600&quality=95&sign=4d2d823aaca1b47b216eb815ce6c0d2b&type=album"
        },
        {
            username: "SirlLizz",
            avatarSrc: "https://sun9-8.userapi.com/impg/Zje0KOAAxoWJ0GXZLGALjHsiPfABuZe3ZAsaQw/voVgMBbZIU8.jpg?size=541x600&quality=95&sign=4d2d823aaca1b47b216eb815ce6c0d2b&type=album"
        },
        {
            username: "VladaHaustova",
            avatarSrc: "https://sun9-8.userapi.com/impg/Zje0KOAAxoWJ0GXZLGALjHsiPfABuZe3ZAsaQw/voVgMBbZIU8.jpg?size=541x600&quality=95&sign=4d2d823aaca1b47b216eb815ce6c0d2b&type=album"
        }
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        const followedBlock = document.getElementById("followedBlock");
        const viewPort = followedBlock?.getBoundingClientRect();
        const topOffset = viewPort?.top;
        window.addEventListener("scroll", () => {
            if (followedBlock && topOffset) {
                if (window.pageYOffset < topOffset - 15) {
                    followedBlock.style.top = topOffset - 15 - window.pageYOffset + 'px';
                }
                if (parseInt(followedBlock.style.top) !== 5 && window.pageYOffset > topOffset + 15) {
                    followedBlock.style.top = "5px";
                }
            }
        })
    }

}
