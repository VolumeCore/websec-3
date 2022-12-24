import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.less']
})
export class AuthorizationComponent implements OnInit {
    public username: string = '';
    public password: string = '';
    public passwordType: string = 'password';
    public isLogin: boolean = false;

    constructor(private route: ActivatedRoute, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.isLogin = this.route.snapshot.url[0].path === 'login';
    }

    showPassword(): void {
        if (this.passwordType === "password") {
            this.passwordType = "text";
        } else {
            this.passwordType = "password";
        }
    }

    public sendRequest(): void {
        console.log(this.username);
        console.log(this.password);
        this.isLogin ? this.authService.loginRequest(this.username, this.password) : this.authService.registerRequest(this.username, this.password);
    }

}
