
self.addEventListener('install', function (event) {
    console.log('Installed sw.js', event);
});


self.addEventListener('activate', function (event) {
    console.log('Activated sw.js', event);
});


// self.addEventListener('fetch', function (event) {
//     console.log(event.request);
// });