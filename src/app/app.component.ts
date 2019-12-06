import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spark-Devops';
  name = 'TechItalians';
  errorMessage = 'ciao';
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  public performCall(name: string) {
    this.errorMessage = null;
    this.http.get('/insert/' + name, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
      .subscribe(data => console.log(data));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    this.errorMessage = errorMessage;
    return throwError(errorMessage);
  }

}
