import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ArticleAppInterceptor } from './article-app.interceptor';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { ArticleItemComponent } from './articles/article-item/article-item.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleNewReactiveComponent } from './articles/article-new-reactive/article-new-reactive.component';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { ImageUrlPipe } from './pipes/imageUrl.pipe';
import { ArticleService } from './services/article-service.service';
import { UserService } from './services/user.service';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserStoreService } from './user/user-store.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticleItemComponent,
    ArticleListComponent,
    NavbarComponent,
    ArticleNewReactiveComponent,
    ImageUrlPipe,
    LoginComponent,
    RegisterComponent,
    ArticleDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ArticleService,
    UserService,
    UserStoreService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ArticleAppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
