import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
    selector: 'header-carousel',
    templateUrl: './header-carousel.component.html',
    styleUrls: ['./header-carousel.component.less']
})
export class HeaderCarouselComponent implements OnInit, AfterViewInit {

    public images: { path: string }[] = [
        {path: 'https://via.placeholder.com/600.png/09f/fff'},
        {path: 'https://via.placeholder.com/600.png/09f/fff'},
        {path: 'https://via.placeholder.com/600.png/09f/fff'},
        {path: 'https://via.placeholder.com/600.png/09f/fff'},
        {path: 'https://via.placeholder.com/600.png/09f/fff'},
        {path: 'https://via.placeholder.com/600.png/09f/fff'},
        {path: 'https://via.placeholder.com/600.png/09f/fff'},
        {path: 'https://via.placeholder.com/600.png/09f/fff'},
        {path: 'https://via.placeholder.com/600.png/09f/fff'},
    ];

    public popular: any[] = ['VolumeCore', 'Prafdin', 'Haustova', 'Gleb.Putilove', 'Jendozzz', 'Divanchik', 'SirlLizz', 'Dezeniz', 'Twin'];

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


    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        const carouselCells: any = document.querySelectorAll(".carousel-cell");
        for (let i = 0; i < carouselCells.length; i++) {
            const info = document.createElement("div");
            info.classList.add("carousel-cell__info");
            info.innerHTML = this.popular[i].length > 7 ? this.popular[i].slice(0, 7) + '...' : this.popular[i];
            carouselCells[i].appendChild(info);
        }
    }

}
