import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        const token = localStorage.getItem('token');
        if (token){
            req = req.clone({
                setHeaders: {Authorization: `Bearer ${token}`}
            });
        }
        return next.handle(req);
    }
}