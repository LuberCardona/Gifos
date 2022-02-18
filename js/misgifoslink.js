
// Display Gifs 

const myGifos = document.getElementById("mygifos");
const savedGifos = document.getElementById("savedgifos");
const animateCrear = document.getElementById("animateCrear");

(function displayGifs() {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith('mygif-')) {
        gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));

        animateCrear.style.display = "none"; 

        gif = document.createElement("img");
        gif.id = gifObj.id;
        gif.src = `${gifObj.images.original.url}`;
        gif.className = 'img-gif';
        myGifos.appendChild(gif);
      }
      if (localStorage.key(i).startsWith('gif-')) {
        gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        gif = document.createElement("img");
        gif.id = gifObj.id;
        gif.src = `${gifObj.images.original.url}`;
        gif.className = 'img-gif';
        savedGifos.appendChild(gif);
      }
    }
 })();

 


  