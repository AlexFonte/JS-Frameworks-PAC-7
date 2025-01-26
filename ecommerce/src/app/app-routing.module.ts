import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './articles/article-detail/article-detail.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleNewReactiveComponent } from './articles/article-new-reactive/article-new-reactive.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'article/list', component: ArticleListComponent, canActivate: [AuthGuard] },
  { path: 'article/create', component: ArticleNewReactiveComponent , canActivate: [AuthGuard]},
  { path: 'article/:id', component: ArticleDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a login por defecto
  { path: '**', redirectTo: '/login' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
