import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';

@Injectable()
export class UserService{

  private url = 'http://localhost:3000/api/users';
  // private url = 'https://vladskudor.github.io/api/users';
  constructor(private http: HttpClient){ }

  getUsers(): Observable<any>{
    return this.http.get<Array<User>>(this.url);
  }

  createUser(user: User): Observable<any>{
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<User>(this.url, JSON.stringify(user), {headers: myHeaders});
  }
  updateUser(user: User): Observable<any>{
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<User>(this.url, JSON.stringify(user), {headers: myHeaders});
  }
  deleteUser(id: string): Observable<any>{
    return this.http.delete<User>(this.url + '/' + id);
  }
}
