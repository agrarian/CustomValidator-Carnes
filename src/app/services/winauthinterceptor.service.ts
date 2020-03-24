import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpInterceptor,HttpEvent,HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvironmentService} from '../services/environment.service';
import {Environment} from '../models/environment';


@Injectable()
export class WinAuthInterceptorService implements HttpInterceptor {

  constructor(private _env : EnvironmentService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let apiKey = '';
    if (req.url !== this._env.getEnvironmentSettingsUrl()) {
      const envSettings = this._env.getEnvSettings();

      apiKey = envSettings.apiKey;
    }

    let reqHeaders = req.headers.set('Accept', 'application/json').set('access-control-expose-headers', 'Authorization')
    .set('Cache-Control', 'no-cache, no-store, must-revalidate')
    .set('Pragma', 'no-cache')
    .set('Expires', '0')
    // set Content-Type to application/json to solve 'invalid request' issue
    // when call service to save changes back to database
    .set('Content-Type', 'application/json');

    if (apiKey) {
      reqHeaders = reqHeaders.append('apikey', apiKey);
    }

    const auth = req.clone({withCredentials: true,  headers: reqHeaders});

    return next.handle(auth);
  }

}
