// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/Lab7/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      var counter = 1;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.num = counter++;
        document.querySelector('main').appendChild(newPost);
        newPost.addEventListener('click', () => {
          setState({page: 'Entry page', id: newPost.num, entry: entry});
        });
      });
      setState({page: "home page"}, false);
    });
});

window.onpopstate = function(event) {
  setState(event.state, true);
}

document.querySelector("[alt='settings']").addEventListener("click", () => {
    setState({page:"settings"}, false);
});

document.querySelector('h1').addEventListener('click', () => {
  setState({page: "home page"}, false);
});





