import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStoreService } from './user/user-store.service';
import { Observable } from 'rxjs';

@Injectable()
export class ArticleAppInterceptor implements HttpInterceptor {

  constructor(private userStore: UserStoreService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('INTERCEPTING');
    const token = this.userStore.getToken();
    
    if (token) { // Si hi ha token, l'afegim a la petició
      console.log('INTERCEPTING, HAS TOKEN', token);
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req); // Si no hi ha token, continuem sense modificar la petició
    }
  }
}