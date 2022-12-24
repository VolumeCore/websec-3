import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserModel} from "../models/common.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) {
    }

    public registerRequest(username: string, password: string): void {
        console.log(username);
        console.log(password);
        this.http.post('api/register', {username: username, password: password})
            .subscribe((res: any) => {
                if (res.status !== 500) {
                    this.router.navigate(['login']);
                }
            })
    }

    public loginRequest(username: string, password: string): void {
        this.http.post('api/login', {username: username, password: password})
            .subscribe((res: any) => {
                if (res.status !== 500) {
                    this.router.navigate(['']);
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('refreshToken', res.refreshToken);
                    localStorage.setItem('username', username);
                }
            })
    }
}
