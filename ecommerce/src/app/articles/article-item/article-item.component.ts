import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Article} from "../../model/article";
import {ArticleQuantityChange} from "../../model/article-quantity-change";
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ArticleItemComponent implements OnInit {

  @Input() public article: Article;
  public stockClasses;
  @Output() public quantityChange: EventEmitter<ArticleQuantityChange>;

  constructor(private router: Router) {
    this.quantityChange = new EventEmitter<ArticleQuantityChange>();
  }

  ngOnInit() {
    this.stockClasses = {
      "notSale": !this.article.isOnSale
    }
  }

  addInCart() {
    // this.article.quantityInCart++;
    this.quantityChange.emit({article: this.article, quantityChange: 1})
  }

  removeInCart() {
    if (this.article.quantityInCart > 0) {
      this.quantityChange.emit({article: this.article, quantityChange: -1})
    }
  }

  goToDetail() {
    console.log('Go to detail');
    this.router.navigate(['/article-detail', this.article.id]);
  }
}
