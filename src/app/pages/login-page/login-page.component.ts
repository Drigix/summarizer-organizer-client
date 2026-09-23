import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageKeys } from '../../models/constans/session-storage-keys.const';
import { Router } from '@angular/router';
import { TokenPairModel } from 'src/app/models/auth/token-pair.model';
import { StorageModel } from 'src/app/models/storage.model';
import { SessionStorageService } from '@services/session-storage.service';
import { UserLoginModel } from 'src/app/models/user-login.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@services/auth.service';

@Component({
    selector: 'login-page',
    templateUrl: 'login-page.component.html',
    styleUrls: ['login-page.component.scss'],
    standalone: false,
})
export class LoginPageComponent implements OnInit {

    private userAuthService = inject(AuthService);
    private messageService = inject(MessageService);
    private translateService = inject(TranslateService);
    private sessionStorageService = inject(SessionStorageService);
    private router = inject(Router);
    
    userLoginModel: WritableSignal<UserLoginModel> = signal<UserLoginModel>(new UserLoginModel('', ''));
    isRegisterMode: WritableSignal<boolean> = signal<boolean>(false);
    repeatPassword: WritableSignal<string> = signal<string>('');


    ngOnInit(): void {
    }

    onLoginClick(): void {
        this.userAuthService.login(this.userLoginModel()).subscribe({
            next: (tokenPair: TokenPairModel) => {
                this.sessionStorageService.save(new StorageModel(SessionStorageKeys.AUTH_TOKEN, tokenPair.accessToken));
            },
            complete: () => {
                this.router.navigate(['/']);
            }
        });
    }

    onKeyUp(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
                this.onLoginClick();
        }
    }
}