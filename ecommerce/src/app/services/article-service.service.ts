import { Injectable } from '@angular/core';
import { Article } from '../model/article';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  // private articlesList: Article[];
  private baseUrl: string = "http://localhost:3000/api/articles";
  
  constructor(private http: HttpClient) {
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

  getArticles(query: string = ''): Observable<Article[]> {
    console.log("Sending article to server...", query)
    return this.http.get<Article[]>(this.baseUrl ,{params: {q: query}});
  }

  changeQuantity(articleID: number, changeInQuantity: number): Observable<any> {
    /* let article = this.articlesList.find(article => article.id === articleID);
    article.quantityInCart += chagenInQuantity;
    return of(article); */
    console.log("Sending article to server...", changeInQuantity)
    return this.http.patch<Article>(`${this.baseUrl}/${articleID}`, {changeInQuantity});
  }

  create(article: Article): Observable<any> {
/*     article.id = this.articlesList.length + 1;
    article.quantityInCart = 0;
    this.articlesList.push(article);
    return of(article); */

    console.log("Sending article to server...", article);
    return this.http.post<Article>(this.baseUrl , article);
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/${id}`);
  }

}
