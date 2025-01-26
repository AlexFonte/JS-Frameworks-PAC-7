import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ArticleItemComponent } from './articles/article-item/article-item.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleNewReactiveComponent } from './articles/article-new-reactive/article-new-reactive.component';
import { ArticleService } from './services/article-service.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ImageUrlPipe } from './pipes/imageUrl.pipe';
import { LoginComponent } from './user/login/login.component';
import { UserService } from './services/user.service';
import { RegisterComponent } from './user/register/register.component';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { UserStoreService } from './user/user-store.service';
import { ArticleAppInterceptor } from './article-app.interceptor';
import { AuthGuard } from './guards/auth.guard';

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
