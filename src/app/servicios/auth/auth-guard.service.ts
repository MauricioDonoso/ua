import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from 'app/servicios/services/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public _us:UserService,public _router:Router){}

    public canActivate(){
        let identity = this._us.getIdentity();
        if(identity && identity.role){
            if(identity.role == 'ROL_SUPER_ADMIN' || identity.role == 'ROL_ADMINISTRADOR' ){
                return true;
            }else {
                this._router.navigate(['/']);
                return false;
            }
        }else {
            this._router.navigate(['/']);
            return false;
        }
    }
}