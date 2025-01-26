import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article-service.service';
import { Article } from '../../model/article';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {

  public article: Article;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    const id = '1';
    // this.route.snapshot.paramMap.get('id');
    this.articleService.getArticleById(id).subscribe(article => {
      this.article = article;
    });
  }

}
