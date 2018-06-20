import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiServiceComponent {

  constructor(private http: HttpClient) {

  }

  post(url, params): Observable<HttpResponse<String>> {
    const subject = new Subject<any>();
    let headers: HttpHeaders = new HttpHeaders();
    console.log('calling: ', url);
    headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    this.http.post( url, params, { observe: 'response' })
      .map(
        data => {
          subject.next({ value: data.body});
        },
        error => {
          subject.next({ error: error});

        }
      );
    return subject;
  }

  get(url, params): Observable<HttpResponse<String>> {
    const subject = new Subject<any>();
    this.http.post( url, params, { observe: 'response' })
      .map(
        data => {
          subject.next({ value: data.body});
        },
        error => {
          subject.next({ error: error});

        }
      );
    return subject;
  }


}
