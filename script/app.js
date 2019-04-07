const networkStatus = document.getElementById('networkStatus');
//Registering Service Worker
    if ('serviceWorker' in navigator) {
        console.log('ok');
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('../sw.js')
                .then(() => console.log('service worker registed'))
                .catch(err => console.log(`service worker error: ${err}`));
        });
    }

window.addEventListener('load', e => {
    checkNetworkStatus();
    loadConsumerList();
    

});

window.addEventListener('offline', () => updateNetworkIsOffline());
window.addEventListener('online', () => updateNetworkIsOnline());

function checkNetworkStatus() {
    //check network status
    if (navigator.onLine)
        networkStatus.style.backgroundColor = "#28a745";
    else
        networkStatus.style.backgroundColor = "#dc3545";


}

function updateNetworkIsOffline() {
    networkStatus.innerHTML = "You are offline :(";
    networkStatus.classList.remove("online");
    networkStatus.classList.add('offline');
    setTimeout(function () {
        networkStatus.style.backgroundColor = "#dc3545";
        networkStatus.innerHTML = "";
        networkStatus.classList.remove('offline');
    }, 5000);
}
function updateNetworkIsOnline() {
    networkStatus.innerHTML = "You are online :)";
    networkStatus.classList.remove('offline');
    networkStatus.classList.add('online');
    setTimeout(() => {
        networkStatus.style.backgroundColor = "#28a745";
        networkStatus.innerHTML = "";
        networkStatus.classList.remove('online');
    }, 5000);
}


function loadConsumerList() {
    let consumers = [];
    const consumerList = document.querySelector("#consumerList");
    consumerList.innerHTML="<h6 class='mt-3 text-center'>Loading...</h6>";
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then((consumers) => {
            let appendElement = "";
            consumers.forEach(function (consumer) {
                appendElement += `<a href="#" class="list-group-item list-group-item-action sidebar_menu" >${consumer.id}</a>`;
            });
            consumerList.innerHTML = appendElement;
        });
}

// //Enable font awesome for css content
// window.FontAwesomeConfig = {
//     searchPseudoElements: true
// }



