import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GLOBAL } from '../global/global';

// import { User } from '../../models/user/user';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class UserService{
        public url_app: string;

        public identity;
        public token;
        constructor(private _http: HttpClient,public router:Router){
            this.url_app = GLOBAL.url;

        }
        getIdentity(){
            var identity = JSON.parse(localStorage.getItem('identity'));
            if(identity != "undefined"){
                this.identity = identity;
            }else{
                this.identity = null;
            }
            return this.identity;
          }
          getToken(){
            let token = localStorage.getItem('token');
            if(token != "undefined"){
                this.token = token;
            }else{
                this.token = null;
            }
            return this.token
          }

 

        registerSolicitud(user): Observable<any>{
            let params = JSON.stringify(user);//json convertido a un string
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            // .set('Authorization', this.getToken());
            return this._http.post(this.url_app+'saveUser',params, {headers:headers});
        }
        registerWebinar(user): Observable<any>{
            let params = JSON.stringify(user);//json convertido a un string
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            // .set('Authorization', this.getToken());
            return this._http.post(this.url_app+'saveWebinar',params, {headers:headers});
        }
        getZoom(): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            // .set('Authorization', this.getToken());
            return this._http.get(this.url_app+'getZoom', {headers:headers});
        }
        saveBienvenida(user): Observable<any>{
            let params = JSON.stringify(user);//json convertido a un string
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            // .set('Authorization', this.getToken());
            return this._http.post(this.url_app+'saveBienvenida',params, {headers:headers});
        }
        saveVespertino(user): Observable<any>{
            let params = JSON.stringify(user);//json convertido a un string
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            // .set('Authorization', this.getToken());
            return this._http.post(this.url_app+'saveVespertino',params, {headers:headers});
        }
        savePostgrado(user): Observable<any>{
            let params = JSON.stringify(user);//json convertido a un string
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            // .set('Authorization', this.getToken());
            return this._http.post(this.url_app+'savePostgrado',params, {headers:headers});
        }
        getPostgrado(): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            // .set('Authorization', this.getToken());
            return this._http.get(this.url_app+'getPostgrado', {headers:headers});
        }
        getUsuarios(): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            // .set('Authorization', this.getToken());
            return this._http.get(this.url_app+'getUsuarios', {headers:headers});
        }
        getVespertino(): Observable<any>{
            let headers = new HttpHeaders().set('Content-Type', 'application/json')
            // .set('Authorization', this.getToken());
            return this._http.get(this.url_app+'getVespertino', {headers:headers});
        }
}
