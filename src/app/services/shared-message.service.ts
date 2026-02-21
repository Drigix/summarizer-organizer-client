import {inject, Injectable} from "@angular/core";
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {SharedMessage} from "@entities/shared-message.model";

@Injectable({providedIn: 'root'})
export class SharedMessageService {

  private messageService = inject(MessageService);
  private translateService = inject(TranslateService);

  showSuccessMessage(sharedMessage: SharedMessage): void {
    this.messageService.add({
      severity: 'success',
      summary: this.translateService.instant(sharedMessage?.summary!),
      detail: this.translateService.instant(sharedMessage?.detail!)
    });
  }

  showErrorMessage(sharedMessage: SharedMessage): void {
    this.messageService.add({
      severity: 'error',
      summary: this.translateService.instant(sharedMessage?.summary!),
      detail: this.translateService.instant(sharedMessage?.detail!)
    });
  }
}
