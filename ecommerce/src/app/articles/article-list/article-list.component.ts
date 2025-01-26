import { Component, OnInit } from '@angular/core';
import { Article } from "../../model/article";
import { ArticleQuantityChange } from "../../model/article-quantity-change";
import { debounceTime, distinctUntilChanged, merge, mergeWith, Observable, startWith, Subject, switchMap } from 'rxjs';
import { ArticleService } from '../../services/article-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-list',
  template: `
  <div class="container d-grid mt-3">
    
  <input type="text"
      placeholder="Buscardor d'articles"
      name="searchBox"
      [(ngModel)]="searchText"
      (keyup)="search()"/>

    <div class="d-flex justify-content-between align-items-center flex-wrap">
      <app-article-item
        *ngFor="let item of articlesList$ | async as articlesList"
        [article]="item"
        (quantityChange)="onQuantityChange($event)">
      </app-article-item>
    </div>
    
  </div>
  `,
  styles: []
})
export class ArticleListComponent implements OnInit {

  public articlesList$: Observable<Article[]>;

  public searchText: string = '';
  private searchTerms: Subject<string> = new Subject();
  private reloadArticleList: Subject<void> = new Subject();

  constructor(private articleService: ArticleService, private router: Router, private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.articlesList$ = this.searchTerms.pipe(
      startWith(this.searchText),
      debounceTime(333),
      distinctUntilChanged(),
      mergeWith(this.reloadArticleList),
      switchMap(() => this.articleService.getArticles(this.searchText)),
    );
    // this.articlesList$ = this.articleService.getArticles();
    /* this.articlesList = [{
      id: 1,
      name: "Agua Font Vella 1,5 l.",
      imageUrl: "https://static.carrefour.es/hd_150x_/img_pim_food/000127_00_1.jpg",
      price: 0.64,
      isOnSale: true,
      quantityInCart: 0
    }, {
      id: 2,
      name: "Agua Carrefour 1,5 l.",
      imageUrl: "https://static.carrefour.es/hd_150x_/img_pim_food/609744_00_1.jpg",
      price: 0.39,
      isOnSale: false,
      quantityInCart: 0
    }, {
      id: 3,
      name: "Agua Solán de Cabras 1,5 l.",
      imageUrl: "https://static.carrefour.es/hd_150x_/img_pim_food/492590_00_1.jpg",
      price: 0.87,
      isOnSale: true,
      quantityInCart: 0
    }] */
  }

  onQuantityChange(change: ArticleQuantityChange) {
    console.log("article: ", change.article.quantityInCart);
    console.log("quantitychange: ", change.quantityChange);

    const currentQuantity = change.article.quantityInCart + change.quantityChange;
    console.log("currentQuantity: ", currentQuantity);
    this.articleService.changeQuantity(change.article.id, change.quantityChange)
      .subscribe({
        next: (response) => {
          console.log(response.msg)
          this.reloadArticleList.next();
        },
        error: (err) => {
          console.error('Error to updating quantity', err);
        },
      });
  }

  search() {
    this.searchTerms.next(this.searchText);
  }
}
