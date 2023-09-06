import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { environment } from '../../../environments/environment';

declare const google: any;

@Injectable()
export class CustomMapsAPILoader implements MapsAPILoader {
    GOOGLE_MAPS_API_KEY = environment.googleMapsApiKey;

    private _scriptLoadingPromise!: Promise<void>;

    load(): Promise<void> {
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            // Google Maps API already loaded, resolve immediately
            return Promise.resolve();
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.defer = true;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.GOOGLE_MAPS_API_KEY}&libraries=places`;
        document.body.appendChild(script);

        this._scriptLoadingPromise = new Promise<void>((resolve: Function, reject: Function) => {
            script.onload = () => {
                resolve();
            };
            script.onerror = (error: Event | string) => {
                if (typeof error === 'string') {
                    reject(new Error(error));
                } else {
                    reject(error);
                }
            };
        });

        return this._scriptLoadingPromise;
    }
}
