import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Http, Response } from '@angular/http';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface Post {
  id: Number,
  name: String
}

@Injectable()
export class HeroService {

  constructor(private http: HttpClient) { }

  private productHuntApiUrl = 'https://api.producthunt.com/v1';  // URL to web api

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // getHeroes(): Observable<Hero[]> {
  //   return this.http.get<Hero[]>(this.heroesUrl).pipe(
  //     tap(heroes => this.log(`fetched heroes`)),
  //     catchError(this.handleError('getHeroes', []))
  //   );
  // }

  // getHero(id: number): Observable<Hero> {
  //   const url = `${this.heroesUrl}/${id}`;
  //   return this.http.get<Hero>(url).pipe(
  //     tap(_ => this.log(`fetched hero id=${id}`)),
  //     catchError(this.handleError<Hero>(`getHero id=${id}`))
  //   );
  // }

  getPosts(): Observable<Post[]> {
    const url = `${this.productHuntApiUrl}/posts`
    return this.http.get(url, {
      headers: {
        Authorization: 'Bearer 0cc596d1977552483bdadb48b0e861199b6d258e24be8b67cc39ab126327409e'
      }
    }).map((res: any) => {
      return res.posts.map(post => {
        return {
          name: post.name,
          id: post.id,
        }
      })
    }).catch(this.handleError(`posts`, []));
  }

  getComments(postId: Number): Observable<any> {
    const url = `${this.productHuntApiUrl}/comments?search[post_id]=${postId}`
    return this.http.get(url, {
      headers: {
        Authorization: 'Bearer 0cc596d1977552483bdadb48b0e861199b6d258e24be8b67cc39ab126327409e'
      }
    }).map((res: any) => {
      return res.comments;
    }).catch(this.handleError(`posts`, []));
  }

}
