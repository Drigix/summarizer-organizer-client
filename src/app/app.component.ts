import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from '@services/session-storage.service';
import { MenuItem } from 'primeng/api';
import { UserDataModel } from './models/user-data.model';
import { JwtUtils } from '@shared/utils/jwt.utils';
import { SessionStorageKeys } from './models/constans/session-storage-keys.const';
import { AuthService } from '@services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'summarizer-organizer-client';
  menuItems: MenuItem[] | undefined;
  userData = signal<UserDataModel | null>(null);
  
  private sessionStorageService = inject(SessionStorageService);  
  private translateService = inject(TranslateService);
  private router = inject(Router);
  private userAuthService = inject(AuthService);

  ngOnInit(): void {
    this.menuItems = [
      {
        label: this.translateService.instant('menu.dashboard'),
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/']);
        }
      },
      {
        label: this.translateService.instant('menu.stockCompanies'),
        icon: 'pi pi-building-columns',
        command: () => {
          this.router.navigate(['/stock-companies']);
        }
      },
      {
        label: this.translateService.instant('menu.logout'),
        icon: 'pi pi-power-off',
        command: () => {
          this.logout()
        }
      },
    ];
    this.refreshTokenAndUserData(true);
  }

   private refreshTokenAndUserData(isFirstLoad: boolean): void {
    const token = this.sessionStorageService.load(SessionStorageKeys.AUTH_TOKEN)?.value;
    if (!token || JwtUtils.isTokenExpired(token)) {
      this.logout();
      return;
    }
    const decodedToken = JwtUtils.decodeToken(token);
    this.userAuthService.userData = new UserDataModel(decodedToken.sub, decodedToken.username);
    this.userData.set(this.userAuthService!.userData!);
  }

  private logout(): void {
    this.sessionStorageService.remove(SessionStorageKeys.AUTH_TOKEN);
    this.userAuthService.userData = null;
    this.userData.set(null); 
    this.router.navigate(['/login']);
  }
}