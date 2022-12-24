import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from "@angular/platform-browser";
import {commentIcon, favoriteIcon, heartRed, heartWhite, sendIcon} from "./constants/icons.const";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIconLiteral('heart-white', sanitizer.bypassSecurityTrustHtml(heartWhite));
        iconRegistry.addSvgIconLiteral('heart-red', sanitizer.bypassSecurityTrustHtml(heartRed));
        iconRegistry.addSvgIconLiteral('send-icon', sanitizer.bypassSecurityTrustHtml(sendIcon));
        iconRegistry.addSvgIconLiteral('favorite-icon', sanitizer.bypassSecurityTrustHtml(favoriteIcon));
        iconRegistry.addSvgIconLiteral('comment-icon', sanitizer.bypassSecurityTrustHtml(commentIcon));
    }
    title = 'social-network';
}
