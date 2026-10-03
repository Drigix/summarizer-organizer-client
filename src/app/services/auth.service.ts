import { inject, Injectable } from "@angular/core";
import { UserDataModel } from "../models/user-data.model";
import { HttpClient } from "@angular/common/http";
import { UserLoginModel } from "../models/user-login.model";
import { TokenPairModel } from "../models/auth/token-pair.model";
import { BehaviorSubject, map, Observable } from "rxjs";
import { SERVER_URL } from "@config/url.const";
import { JwtUtils } from "@shared/utils/jwt.utils";

@Injectable({ providedIn: 'root' })
export class AuthService {

  userDataChanges: BehaviorSubject<string> = new BehaviorSubject<string>('');

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
    return this.httpClient.post<TokenPairModel>(url, userLogin, { responseType: 'json' })
    .pipe(
      map((tokenPair: TokenPairModel) => {
        const decodedToken = JwtUtils.decodeToken(tokenPair.accessToken);
        this.userData = new UserDataModel(decodedToken.sub, decodedToken.username);
        this.activeUserDatChange(this.userData.userId);
        return tokenPair;
      }));
  }

  activeUserDatChange(key: string): void {
    this.userDataChanges.next(key);
  }
} 