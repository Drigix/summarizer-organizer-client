import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  title = 'summarizer-organizer-client';
  menuItems: MenuItem[] | undefined;

  constructor(
    private translationService: TranslateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menuItems = [
      {
        label: this.translationService.instant('menu.dashboard'),
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/']);
        }
      },
      {
        label: this.translationService.instant('menu.stockCompanies'),
        icon: 'pi pi-building-columns',
        command: () => {
          this.router.navigate(['/stock-companies']);
        }
      }
    ];
  }

}
