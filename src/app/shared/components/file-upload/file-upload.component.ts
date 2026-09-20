import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-file-upload',
    template: `
        <div class="flex flex-col items-center file-upload gap-6">
            <p-fileupload mode="basic" [customUpload]="true" [auto]="true" (uploadHandler)="onFileSelect($event)" [chooseLabel]="chooseLabel! | translate" [chooseButtonProps]="{ severity: 'secondary', variant: 'outlined' }" />
            @if (imageSrc) {
                <img [src]="imageSrc" alt="Image" class="shadow-md rounded-xl w-full sm:w-64" />
            }
        </div>
    `,
    styleUrls: ['./file-upload.component.scss'],
    standalone: false
})
export class FileUploadComponent {
    @Input() chooseLabel?: string;
    @Input() imageSrc: string | null = null;
    @Output() imageSrcChange = new EventEmitter<string | null>();
   
    onFileSelect(event: FileUploadHandlerEvent) {
        const file = event.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
            if (e.target?.result && typeof e.target.result === 'string') {
                this.imageSrc = e.target.result;
                this.imageSrcChange.emit(this.imageSrc);
            }
        };
        
        reader.readAsDataURL(file);
    }
}