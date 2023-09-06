import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerTextService } from '@app/shared/ngx-spinner-text.service';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>
        <ngx-spinner type="ball-clip-rotate" size="medium" color="#5ba7ea">
            <p *ngIf="ngxSpinnerText">{{ getSpinnerText() }}</p>
        </ngx-spinner>
    `,
})
export class RootComponent {
    ngxSpinnerText: NgxSpinnerTextService;

    constructor(
        _ngxSpinnerText: NgxSpinnerTextService,
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
        ) {
        this.ngxSpinnerText = _ngxSpinnerText;

        this.matIconRegistry.addSvgIcon(
            'apple_logo',
            this.domSanitizer.bypassSecurityTrustResourceUrl('src/assets/icons/apple_logo.svg')
          );
          this.matIconRegistry.addSvgIcon(
            'google_logo',
            this.domSanitizer.bypassSecurityTrustResourceUrl('src/assets/icons/google_logo.svg')
          );
    }

    getSpinnerText(): string {
        return this.ngxSpinnerText.getText();
    }
}
