import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpAPIService {
  contextpath: string;
  httpdata: any ;
  httpOptions = {
   headers: new HttpHeaders({
     'Content-Type':  'application/json'
   })
 };

  constructor(private http: HttpClient) { }
  getRequest(apiRequestMethod: string) {
    apiRequestMethod = environment.API_BASE_URL + apiRequestMethod;
  
    return this.http.get<any[]>(apiRequestMethod);
   }
   private extractData(res: Response) {
    const body = res;
    return body ;
    }
   
    public postRequest(baseUrl: string, jsonObj: any) {
      baseUrl = environment.API_BASE_URL + baseUrl;
      return this.http.post(baseUrl, jsonObj, this.httpOptions);
    }
}
