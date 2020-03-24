import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../models/environment';
import { environment } from '../../environments/environment';


@Injectable()
export class EnvironmentService {

  private _env : Environment;
  private _environmentSettingsUrl = 'assets/environment.json';

  constructor(private _http: HttpClient) { }

  getVersion(): string {
    return environment.VERSION;
  }
  /**
   * Gets the environment settings (Web API base URL, APIKey, etc.). Should only request settings
   * from the server once (on app startup), but can override if necessary.
   * @param shouldRequestEnvSettingsFromServer Optional (default false). If true, instructs the method to make an HTTP Request
   * to set the environment settings from the server before returning those settings. If false, returns any cached environment settings.
   */
  async getEnvSettingsAsync(shouldRequestEnvSettingsFromServer = false): Promise<Environment> {

    let resultSet: Environment[] = [];
    let host: Environment;

    // only need to retrieve environment settings if we haven't already got them
    if (shouldRequestEnvSettingsFromServer)  {
      const res = await this.getEnv().then(data => { resultSet = data; });
      if (environment.production === true) {
        host = resultSet.find(x => x.name.toLowerCase() === 'prod');
      } else {
        host = resultSet.find(x => x.name.toLowerCase() === 'dev');
      }
      this._env = host;
      console.log('Environment settings have been updated');
    }
    return this._env;
  }

  /**
   * Non-asynchronous method that allows the environment settings to be retrieved for portions of code that are not async friendly (constructors/interceptors/etc.).
   */
  public getEnvSettings() : Environment {

    return this._env;

  }

  public getEnvironmentSettingsUrl() : string {
    return this._environmentSettingsUrl;
  }

  private async getEnv(): Promise<Environment[]> {
    const res = await this._http.get<Environment[]>(this._environmentSettingsUrl).toPromise();
    return res as Environment[];
  }

  handleError(): string {
    return 'Error';
  }


}
