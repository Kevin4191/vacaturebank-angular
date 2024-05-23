import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.isLoggedIn()) {
            return true
        } else {
            // Navigate to login page if the user is not authenticated
            this.router.navigate(['/login']);
            return false;
        }
        
        
    }

    public isLoggedIn(): boolean {
        let status = false;
        if (localStorage.getItem('isLoggedIn') === 'true') {
            status = true;
        } else {
            status = false;
        }
        return status;
    }
}
