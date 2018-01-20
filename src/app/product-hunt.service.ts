import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface Post {
  id: Number,
  name: String,
  auhtor: String,
  userImage: String,
  comments: Comment[],
  tagline: String,
  topics: String[]
}

export interface Comment {
  id: Number
}

@Injectable()
export class ProductHuntService {

  constructor(private http: HttpClient) { }

  private productHuntApiUrl = 'https://api.producthunt.com/v1';
  private developer_token = '0cc596d1977552483bdadb48b0e861199b6d258e24be8b67cc39ab126327409e'

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPosts (page, perPage?): Observable<Post[]> {
    const url = `${this.productHuntApiUrl}/posts/all`
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.developer_token}`
      },
      params: {
        page: page || 1,
        per_page: perPage || 12
      }
    }).map((res: any) => {
      return res.posts.map(post => {
        return {
          name: post.name,
          id: post.id,
          author: post.user.username,
          userImage: post.user.image_url['50px'],
          tagline: post.tagline,
          topics: post.topics.map(topic => topic.name)
        }
      })
    }).catch(this.handleError(`posts`, []));
  }

  getPost (postId: Number): Observable<Post> {
    const url = `${this.productHuntApiUrl}/posts/${postId}`;
    return this.http.get(url, {
      headers: {
        Authorization: `Bearer ${this.developer_token}`
      }
    }).map((res: any) => {
      return res.post;
    }).catch(this.handleError(`post`, []));
  }

}
