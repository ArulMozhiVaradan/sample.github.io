const cacheName='v3';
const cacheAssets =[
    './',
    './index.html',
    './css/main.css',
    './script/app.js',
    './content/bootstrap/js/bootstrap.min.js',
    './content/jquery/jquery.min.js',
    './content/fontAwesome/css/all.css',
    './content/bootstrap/css/bootstrap.min.css',
    './content/images/light-bulb-122x122.png',
    './content/fontAwesome/webfonts/fa-solid-900.woff2',
    './content/fontAwesome/webfonts/fa-solid-900.woff',
    './content/fontAwesome/webfonts/fa-solid-900.ttf',
    './manifest.json'
]

//Install SW
self.addEventListener('install', (e)=>{
    
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches.open(cacheName)
            .then(cache=> {
                console.log('service worker : caching..');
                cache.addAll(cacheAssets);
            })
            .then(()=> self.skipWaiting())
    );
});

self.addEventListener('activate', (e)=> {
    console.log('service worker: Activated');
    //Remove previous caches
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache !== cacheName){
                        console.log('Service Worker:Cache Cleared');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});


self.addEventListener('fetch', (e)=> {
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request).catch(()=> caches.match(e.request)));

})

