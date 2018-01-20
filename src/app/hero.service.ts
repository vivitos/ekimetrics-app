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
  name: String,
  auhtor: String,
  comments: Comment[]
}

export interface Comment {
  id: Number,
  created_at: Date
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

  getPosts (page, per_page?): Observable<Post[]> {
    const url = `${this.productHuntApiUrl}/posts/all`
    return this.http.get(url, {
      headers: {
        Authorization: 'Bearer 0cc596d1977552483bdadb48b0e861199b6d258e24be8b67cc39ab126327409e'
      },
      params: {
        page: page || 1,
        per_page: per_page || 12
      }
    }).map((res: any) => {
      return res.posts.map(post => {
        return {
          name: post.name,
          id: post.id,
          author: post.user.username
        }
      })
    }).catch(this.handleError(`posts`, []));
  }

  getPost (postId: Number): Observable<Post> {
    const url = `${this.productHuntApiUrl}/posts/${postId}`;
    return this.http.get(url, {
      headers: {
        Authorization: 'Bearer 0cc596d1977552483bdadb48b0e861199b6d258e24be8b67cc39ab126327409e'
      }
    }).map((res: any) => {
      return res.post;
    }).catch(this.handleError(`post`, []));
  }

}
