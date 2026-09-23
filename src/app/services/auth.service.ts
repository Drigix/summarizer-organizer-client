import { inject, Injectable } from "@angular/core";
import { UserDataModel } from "../models/user-data.model";
import { HttpClient } from "@angular/common/http";
import { UserLoginModel } from "../models/user-login.model";
import { TokenPairModel } from "../models/auth/token-pair.model";
import { Observable } from "rxjs";
import { SERVER_URL } from "@config/url.const";

@Injectable({ providedIn: 'root' })
export class AuthService {

  private httpClient = inject(HttpClient);
  private resourceUrl = SERVER_URL + 'auth';
  private _userData: UserDataModel | null = null;


  get userData(): UserDataModel | null {
    return this._userData;
  }

  set userData(value: UserDataModel | null) {
    this._userData = value;
  }

  login(userLogin: UserLoginModel): Observable<TokenPairModel> {
    const url = this.resourceUrl + "/login";
    return this.httpClient.post<TokenPairModel>(url, userLogin, { responseType: 'json' });
  }
} 