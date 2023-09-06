// "Production" enabled environment

const firebaseConfig = require('../../firebase.config.js');

export const environment = {
    production: true,
    hmr: false,
    appConfig: 'appconfig.production.json',
    googleMapsApiKey: 'AIzaSyAKC3KS4L48wEJ7KO_DILGkevUCbir7Lww',
    firebaseConfig: firebaseConfig,
};
