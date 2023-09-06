import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FileSelectionService {
    private selectedFiles: File[] = [];

    getSelectedFiles(): File[] {
        return this.selectedFiles;
    }

    clearSelectedFiles(): void {
        this.selectedFiles = [];
    }

    addSelectedFile(file: File): void {
        this.selectedFiles.push(file);
    }

    removeSelectedFile(file: File): void {
        const index = this.selectedFiles.indexOf(file);
        if (index !== -1) {
            this.selectedFiles.splice(index, 1);
        }
    }
}
