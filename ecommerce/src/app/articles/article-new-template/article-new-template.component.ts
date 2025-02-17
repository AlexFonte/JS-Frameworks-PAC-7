import { Component, Input } from '@angular/core';
import { Article } from '../../model/article';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-new-template',
  templateUrl: './article-new-template.component.html',
  styleUrl: './article-new-template.component.css'
})
export class ArticleNewTemplateComponent {

  public invalidForm: boolean = false;

  constructor(private router: Router, route: ActivatedRoute) {
  }

  createArticle(articleForm: NgForm): void {
    if (articleForm.invalid) {
      this.invalidForm = true;
      console.log("Article invalid", articleForm.value);
    } else {
      const newArticle: Article = articleForm.value;
      this.invalidForm = false;
      console.log("Nou article", newArticle);
    }
  }
}
