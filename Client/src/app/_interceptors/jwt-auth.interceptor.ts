import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.authenticationService.currentUser$.pipe(take(1)).subscribe({
      next:(user)=>{
        if(user){
          request = request.clone({ //intercepts outgoing request and authenticates
            setHeaders:{Authorization:`Bearer ${user.token}`}
          })
        }
      }
    })
    return next.handle(request);
  }
}
