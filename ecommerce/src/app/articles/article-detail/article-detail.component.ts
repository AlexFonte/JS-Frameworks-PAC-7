import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article-service.service';
import { Article } from '../../model/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {

  public article: Article;
  public errMsg: String ="";

  constructor(private route: ActivatedRoute,
    private articleService: ArticleService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.articleService.getArticleById(id).subscribe({
      next: (article) => {
        this.article = article;
        console.log('Article found !!!', article);
      },
      error: err => {
        console.error('Article not fount !!!', err);
        this.errMsg = 'Article not found.';
      }
    });
  }
}
