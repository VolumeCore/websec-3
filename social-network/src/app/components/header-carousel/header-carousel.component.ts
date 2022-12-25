import {AfterViewInit, Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {UserModel} from "../../models/common.model";
import {Router} from "@angular/router";

@Component({
    selector: 'header-carousel',
    templateUrl: './header-carousel.component.html',
    styleUrls: ['./header-carousel.component.less']
})
export class HeaderCarouselComponent implements OnInit, AfterViewInit {

    public images: { path: string }[];
    public popular: any[] = [];
    public viewInit: boolean = false;
    public dataLoaded: boolean = false;

    public carouselConfig: {
        cellWidth: number,
        height: number,
        borderRadius: number,
        cellsToScroll: number,
        transitionDuration: number,
        margin: number
    } = {
        cellWidth: 56,
        height: 56,
        borderRadius: 50,
        cellsToScroll: 2,
        transitionDuration: 500,
        margin: 25
    };

    constructor(private dataService: DataService, private router: Router) {
    }

    ngOnInit(): void {
        this.dataService.getUsers()
            .subscribe((users: any) => {
                this.images = new Array(users.length);
                for (let i = 0; i < users.length; i++) {
                    this.images[i] = { path: 'img/' + users[i].imageUId };
                    this.popular.push(users[i].username);
                }
                this.dataLoaded = true;
                if (this.viewInit && this.dataLoaded) {
                    this.renderCarousel();
                }
            })
    }

    ngAfterViewInit(): void {
        this.viewInit = true;
        if (this.viewInit && this.dataLoaded) {
            this.renderCarousel();
        }
    }

    private renderCarousel(): void {
        let carousel = document.querySelector(".carousel-cells");
        console.log(JSON.stringify(carousel?.children));
        // @ts-ignore
        for (let i = 0; i < this.popular.length; i++) {
            const info = document.createElement("div");
            info.classList.add("carousel-cell__info");
            console.log(carousel?.children[i]);
            info.innerHTML = this.popular[i].length > 7 ? this.popular[i].slice(0, 7) + '...' : this.popular[i];
            info.addEventListener('click', () => this.router.navigate(['user', this.popular[i]]));
            carousel?.children[i].appendChild(info);
            carousel?.children[i].addEventListener('click', () => this.router.navigate(['user', this.popular[i]]));
        }
    }

}
