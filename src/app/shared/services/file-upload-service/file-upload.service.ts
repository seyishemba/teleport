import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, forkJoin, from } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class FileUploadService {
    constructor(private storage: AngularFireStorage) {}

    uploadFiles(files: File[]): Observable<string[]> {
        const uploadObservables: Observable<string>[] = [];

        files.forEach((file: File, index: number) => {
            const filePath = `/files/${new Date().getTime()}_${file.name.split(' ').join('_')}`;
            const fileRef = this.storage.ref(filePath);
            const task = this.storage.upload(filePath, file);

            const uploadTrackObservable = new Observable((observer) => {
                task.percentageChanges().subscribe({
                    next: (percent) => {
                        console.log(`File ${index}: Uploaded: ${percent}%`);
                        if (percent === 100) {
                            observer.next();
                            observer.complete();
                        }
                    },
                    error: (error) => observer.error(error),
                });
            });

            const downloadUrlObservable = uploadTrackObservable.pipe(switchMap(() => from(fileRef.getDownloadURL())));
            uploadObservables.push(downloadUrlObservable);
        });

        return forkJoin(uploadObservables);
    }
}
