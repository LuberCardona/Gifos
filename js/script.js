
//API
let arrayFavoritos = [];
const API_KEY = "y6Smx1ReQyL4ug8v03jiGHOceC2CMJHS";


async function getGifByName(searchText){
    let url = `https://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=${API_KEY}&limit=12&rating=g`;
    let response = await fetch(url);
    dataGif = await response.json();
    return dataGif;
}

let busqueda = document.getElementById("textoBusqueda");
let contenedorGifs = document.getElementById("contenedor-resultados-busqueda");
let cambiobtnSearch = document.getElementById("btnSearch");
let btnSearchAutoComplete = document.getElementById('btnSearchAutoComplete');

function btnSearchAutoCompleteOnInput (){  // lupa gris on input
    btnSearchAutoComplete.style.display = "block";
} 

btnSearchAutoComplete.addEventListener("click",()=>{  // busqueda click en lupa
    autoComp.style.display = 'none';
    search();               
}); 

// busqueda enter  
busqueda.addEventListener("keyup", enterEvent, false);   
function enterEvent (key){
    if(key.keyCode == 13){
        search(); 
        autoComp.style.display = 'none';
      
    }
}

let btnSearch = document.getElementById("btnSearch");
function cambioLupaAx (){
    btnSearch.src = 'assets/images/button-close.svg';            
}



// funcion buscar clic en texto autocompletado - enter y lupa
let search = () => {
    let textoBuscado = busqueda.value; 
    contenedorGifs.innerHTML = "";
   
    getGifByName(textoBuscado).then((gifData) => {   
       // console.log(gifData);  
                 
         for (let i = 0; i < gifData.data.length; i++) {                    
                let divGif = document.createElement("div");
                divGif.classList.add("gif");
                contenedorGifs.appendChild(divGif);

                const imagenGif = document.createElement("img");               
                imagenGif.classList.add("img-gif-busqueda");
                imagenGif.alt = "Error al cargar el gif";
                imagenGif.src= gifData.data[i].images.downsized.url;              
                divGif.appendChild(imagenGif);  
                

                // EVENT MOUSEOVER///////////////////////////
                imagenGif.addEventListener('mouseover', ()=>{
                    // alert('mouseover');
                    let diviconscards = document.createElement("div"); // DIV CARD
                    divGif.appendChild(diviconscards);
                    diviconscards.classList.add("diviconscard"); 

                  /*  let agregarFavoritos = document.createElement("input"); // FAVORITO ICONO
                    agregarFavoritos.type = "image";
                    agregarFavoritos.src ="assets/images/icon-fav-hover.svg";
                    agregarFavoritos.classList.add("favoritos");
                    agregarFavoritos.classList.add("favoritoFuncion");
                    diviconscards.appendChild(agregarFavoritos);*/

                    let agregarFavoritos = document.createElement("div"); // FAVORITO ICONO         
                    agregarFavoritos.classList.add("no-favoritos");
                    diviconscards.appendChild(agregarFavoritos);

                   
                    let url1 = gifData.data[i].images.downsized.url;  // url descarga         
                    let nombre1 = gifData.data[i].title;  //titulo descarga 

                    let descargargif = document.createElement("input"); // DESCARGAR ICONO
                    descargargif.type = "image";
                    descargargif.src ="assets/images/icon-download.svg";
                    descargargif.dataset.urlDescarga = url1;
                    descargargif.dataset.nombreDescarga = nombre1; 
                    descargargif.classList.add("favoritos");
                    descargargif.classList.add("descargaFuncion");
                    diviconscards.appendChild(descargargif); 

                    let ampliargif = document.createElement("input"); // FULL SCREEN ICONO
                    ampliargif.type = "image";
                    ampliargif.src = "assets/images/icon-max.svg";
                    ampliargif.classList.add("favoritos");
                    ampliargif.classList.add("fullScreen");
                    diviconscards.appendChild(ampliargif);


                        // EVENT MOUSEOUT //////// ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                        diviconscards.addEventListener('mouseout', ()=>{ 
                            //alert('mouseout');
                            diviconscards.style.display = "none";
        
                        })
                        
                        ////// Enviar favoritos al local storage
                        agregarFavoritos.addEventListener("click",(e)=>{               
              
                            if(e.currentTarget.classList.contains("favorito")){
                             e.currentTarget.classList.remove("favorito");
                             const idAlLocalS1 = gifData.data[i].id;
                             //console.log(idAlLocalS1);
                                for (let i = 0; i < localStorage.length; i++) {
                                    if (localStorage.key(i).startsWith(`imagen-${idAlLocalS1}`)){
                                  //  gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                                      localStorage.removeItem(`imagen-${idAlLocalS1}`);
        
                                    }
                                }                                              
                              
                               
                            }else{
                                e.currentTarget.classList.add("favorito");
                               const idAlLocalS = gifData.data[i].id;
                              // console.log(idAlLocalS);
                               localStorage.setItem(`imagen-${idAlLocalS}`,JSON.stringify(gifData.data[i])); 
                                
        
                            }
                        });

                        
                    ///// Descargar GIF             

                    descargargif.addEventListener("click",(e)=>{

                        async function descargarGif(url1, nombre1) {                       
                            await fetch(url1).then((img)=> {
                                img.blob().then((file)=>{
                                    let a = document.createElement("a");
                                    a.href = URL.createObjectURL(file);
                                    a.download= nombre1;
                                    a.click();
                                });
                            });
                        }  
                        descargarGif(url1, nombre1);               

                    });  
                    
                      /////// Full screen

                    const imagenFull1 = document.createElement("img");
                    imagenFull1.src = gifData.data[i].images.original.url; // tamaño original gif
                    imagenFull1.alt = "Error al cargar el gif";                   

                    
                    ampliargif.addEventListener("click",(e)=>{                                            
                        let containerFullScreen1 = document.createElement("div");
                        containerFullScreen1.classList.add("containerFullScreen");
                        main.appendChild(containerFullScreen1);

                        let agregarFavoritosFull = document.createElement("div"); // FAVORITO ICONO         
                        agregarFavoritosFull.classList.add("no-favoritos");
                        agregarFavoritosFull.classList.add("favoritosF");
                        containerFullScreen1.appendChild(agregarFavoritosFull);


                        imagenFull1.classList.add('img-full'); 
                        containerFullScreen1.appendChild(imagenFull1);                       
                        containerFullScreen1.insertAdjacentElement('beforeend',imagenFull1);
                        containerFullScreen1.classList.toggle("show-full");   
                        
                        
                        let descargargifFullTs = document.createElement("input"); // DESCARGA ICONO
                        descargargifFullTs.type = "image";
                        descargargifFullTs.src ="assets/images/icon-download.svg";
                        //descargargifFullTs.dataset.urlDescarga = url;
                       // descargargifFullTs.dataset.nombreDescarga = nombre; 
                        descargargifFullTs.classList.add("favoritosFd");
                        containerFullScreen1.appendChild(descargargifFullTs);

                        let cerrarFullScreenS = document.createElement("input"); // ICONO X CERRAR FULL SCREEN
                        cerrarFullScreenS.type = "image";
                        cerrarFullScreenS.src ="assets/images/close.svg";
                        cerrarFullScreenS.classList.add("favoritosFx");                        
                        containerFullScreen1.appendChild(cerrarFullScreenS);

                        let titleFullScreenUserS = document.createElement("h4"); // 
                        titleFullScreenUserS.textContent = gifData.data[i].username;  //titleFullScreen user
                        titleFullScreenUserS.classList.add('titleFullScreen');
                        containerFullScreen1.appendChild(titleFullScreenUserS);

                        let titleFullScreenS = document.createElement("h3"); // //titleFullScreen title gifo
                        titleFullScreenS.textContent = gifData.data[i].title;  
                        titleFullScreenS.classList.add('titleFullScreen');                                         
                        containerFullScreen1.appendChild(titleFullScreenS);

                        cerrarFullScreenS.addEventListener("click",(e)=>{  
                            containerFullScreen1.style.display = "none";
                        });

                        ///// Descargar GIF             

                        descargargifFullTs.addEventListener("click",(e)=>{

                        async function descargarGif(url1, nombre1) {                       
                            await fetch(url1).then((img)=> {
                                img.blob().then((file)=>{
                                    let a = document.createElement("a");
                                    a.href = URL.createObjectURL(file);
                                    a.download= nombre1;
                                    a.click();
                                });
                            });
                        }  
                        descargarGif(url1, nombre1);               

                       }); 

                        ////// Enviar favoritos al local storage
                       /* agregarFavoritosFull.addEventListener("click",()=>{        
                            arrayFavoritos.push(imagenGif.src);                                              
                            localStorage.setItem("imagen",(arrayFavoritos)); 
                            agregarFavoritosFull.src ="assets/images/icon-fav-active.svg";
                            
                        }); */
                        
                        ////// Enviar favoritos al local storage
                        agregarFavoritosFull.addEventListener("click",(e)=>{               
              
                            if(e.currentTarget.classList.contains("favorito")){
                             e.currentTarget.classList.remove("favorito");
                             const idAlLocalS1 = gifData.data[i].id;
                            // console.log(idAlLocalS1);
                                for (let i = 0; i < localStorage.length; i++) {
                                    if (localStorage.key(i).startsWith(`imagen-${idAlLocalS1}`)){
                                  //  gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                                      localStorage.removeItem(`imagen-${idAlLocalS1}`);
        
                                    }
                                }                                              
                              
                               
                            }else{
                                e.currentTarget.classList.add("favorito");
                               const idAlLocalS = gifData.data[i].id;
                              // console.log(idAlLocalS);
                               localStorage.setItem(`imagen-${idAlLocalS}`,JSON.stringify(gifData.data[i])); 
                                
        
                            }
                        });

                        

                    });
                })
            }
      
    }); 
    tituloTextoBusqueda(); 
}


//el usuario puede borrar cualquier contenido de la barra clic en x
function limpiarBusqueda (){
    let limpiarBusqueda = document.getElementById('textoBusqueda');    
    limpiarBusqueda.value = "";
    let autocompleteContent = document.getElementsByClassName('autocomplete-content')[0];
    autocompleteContent.style.display = "none";
    btnSearch.src = 'assets/images/icon-search.svg';
    btnSearchAutoComplete.style.display = "none";
    location.href = location.href;
}



// Autocompletar busqueda

function resultadoSugerido() {   

    autoComp = document.querySelector(".autocomplete-content");
    autoComp.style.display = "grid";
    search1 = document.getElementById("textoBusqueda");
      
    if (search1.value === "") {
      autoComp.style.display = "none";
    }
    fetch(`https://api.giphy.com/v1/gifs/search?q=${search1.value}&api_key=${API_KEY}&limit=4`)
      .then(response5 => {
        return response5.json();
      }).then(data5 => {
        autoComp.innerHTML = "";
        for (let i = 0; i < data5.data.length; i++) {                      

            searchImgAutocomplete = document.createElement("img");           
            searchImgAutocomplete.classList.add("searchImgAutocomplete");
            searchImgAutocomplete.src = "assets/images/img buscar.png";
            autoComp.appendChild(searchImgAutocomplete);    

            sug = document.createElement("button");           
            sug.classList.add("pAutocomplete");            
            autoComp.appendChild(sug);
            sug.innerText = data5.data[i].title;

            autoComp.classList.add('autocomplete-content2');

            sug.addEventListener("click",()=>{  
                search1.value = data5.data[i].title; 
                autoComp.style.display = 'none';
                search();               

            }); 
        }    

    });   
    cambioLupaAx(); 
    btnSearchAutoCompleteOnInput();   
    
}


//agregar texto buscado como titulo del resultado de la consulta

let titleBusqueda = document.getElementById("title-text-busqueda");
let articlevermas = document.getElementsByTagName("article");
let btnvermasDiv = document.getElementById("btn-ver-mas");

function tituloTextoBusqueda ()  {
    titleBusqueda.innerHTML = "";
    btnvermasDiv.innerHTML = "";

    let spanLineaResultados = document.createElement("span");
    titleBusqueda.appendChild(spanLineaResultados);
    spanLineaResultados.classList.add("spanlinearesultados");

    let hDostextobuscado = document.createElement("h2");
    titleBusqueda.appendChild(hDostextobuscado);
    hDostextobuscado.classList.add("hDostextobuscado");
    hDostextobuscado.innerHTML = busqueda.value[0].toUpperCase() + busqueda.value.slice(1).toLowerCase();
    hDostextobuscado.classList.toggle("modeDarkGeneral");
    
    let btnvermas = document.createElement("a");
    btnvermas.innerHTML = "VER MÁS"
    btnvermas.href = "#";
    btnvermas.classList.add("verMas");
    btnvermasDiv.appendChild(btnvermas);
    btnvermas.classList.toggle("modeDarkGeneral");  
}

//ultimos gif de nuestra comunidad //////////////////////////////////////////////////////////////////////

async function getTrending(getTrendingGifos){
    let url2 = `https://api.giphy.com/v1/gifs/trending?q=${getTrendingGifos}&api_key=${API_KEY}`;
    let response2 = await fetch(url2);
    dataGif2 = await response2.json();
    return dataGif2;
} 

let div = document.getElementsByClassName("content-gifos")[0];
let divActions = document.getElementsByClassName("content-title-btnActions")[0];
let main = document.getElementById("main");

getTrending().then((gifData2) => {  
    for(let i=0; i < gifData2.data.length; i++){
      //  console.log(gifData2.data);

        let divGifT = document.createElement("div");
        divGifT.classList.add("gif");
        divActions.appendChild(divGifT);

        const imagen = document.createElement("img");
        imagen.src = gifData2.data[i].images.downsized.url;
        imagen.alt = "Error al cargar el gif";
        imagen.classList.add('tamaño-gif');         
       
        div.appendChild(divActions);
        divActions.appendChild(imagen); 

        // EVENT MOUSEOVER

        imagen.addEventListener('mouseover', (e)=>{
        gifFavorito();  
      
        function gifFavorito(params) {
            let diviconscardsT = document.createElement("div");  // CARD
            divGifT.appendChild(diviconscardsT);
            diviconscardsT.classList.add("diviconscard"); 

            let agregarFavoritosT = document.createElement("div"); // FAVORITO ICONO         
            agregarFavoritosT.classList.add("no-favoritos");
            diviconscardsT.appendChild(agregarFavoritosT); 

            const idAlLocalSF = gifData2.data[i].id;
            for (let i = 0; i < localStorage.length; i++) {

               if ((localStorage.key(i).startsWith(`imagen-${idAlLocalSF}`)) == true){
                      
              // console.log("entro a favorito");
               let favoritoActive = document.querySelector(".no-favoritos")
               favoritoActive.classList.remove("no-favoritos");
               favoritoActive.classList.add("favorito");
               //console.log("favorito active" + favoritoActive);
               }
            }

            let url = gifData2.data[i].images.downsized.url;  // url descarga         
            let nombre = gifData2.data[i].title;  //titulo descarga        
    
            let descargargifT = document.createElement("input"); // DESCARGA ICONO
            descargargifT.type = "image";
            descargargifT.src ="assets/images/icon-download.svg";
            descargargifT.dataset.urlDescarga = url;
            descargargifT.dataset.nombreDescarga = nombre; 
            descargargifT.classList.add("favoritos");
            descargargifT.classList.add("descargaFuncion");
            diviconscardsT.appendChild(descargargifT);                     
         
            let ampliargifT = document.createElement("input"); // FULL SCREEN ICONO
            ampliargifT.type = "image";
            ampliargifT.src = "assets/images/icon-max.svg";
            ampliargifT.classList.add("favoritos");
            ampliargifT.classList.add("fullScreen");

            diviconscardsT.appendChild(ampliargifT); 
            
                  // EVENT MOUSEOUT //////->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                diviconscardsT.addEventListener('mouseout', ()=>{ 
                    //alert('mouseout');
                    diviconscardsT.style.display = "none";


                }) 

                              
               agregarFavoritosT.addEventListener("click",(e)=>{  
                               
                if(e.currentTarget.classList.contains("favorito")){
                   e.currentTarget.classList.remove("favorito");
                   const idAlLocalS1 = gifData2.data[i].id;
                   //console.log(idAlLocalS1);
                       for (let i = 0; i < localStorage.length; i++) {
                           if (localStorage.key(i).startsWith(`imagen-${idAlLocalS1}`)){
                       //  gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                           localStorage.removeItem(`imagen-${idAlLocalS1}`);
                           // location.href ="./favoritos.html";
                           location.href = location.href;
                           }
                       }                                              
                   
                   
                   }else{
                       e.currentTarget.classList.add("favorito");
                   const idAlLocalS = gifData2.data[i].id;
                   // console.log(idAlLocalS);
                   localStorage.setItem(`imagen-${idAlLocalS}`,JSON.stringify(gifData2.data[i])); 
                   setTimeout(function(){ location.href = location.href }, 100);                   
                                   

                   }
               });

                ///// Descargar GIF             

                descargargifT.addEventListener("click",(e)=>{

                    async function descargarGif(url, nombre) {                       
                        await fetch(url).then((img)=> {
                              img.blob().then((file)=>{
                                  let a = document.createElement("a");
                                  a.href = URL.createObjectURL(file);
                                  a.download= nombre;
                                  a.click();
                              });
                          });
                      }  
                      descargarGif(url, nombre);               

                }); 

                 /////// Full screen

                 const imagenFull = document.createElement("img");
                 imagenFull.src = gifData2.data[i].images.original.url; // tamaño original gif
                 imagenFull.alt = "Error al cargar el gif";
                 
                 ampliargifT.addEventListener("click",(e)=>{    
                    
                    fullFavorito();
                    
                    function fullFavorito(params) {
                        let containerFullScreen = document.createElement("div");
                        containerFullScreen.classList.add("containerFullScreen");
                        main.appendChild(containerFullScreen);
    
                        imagenFull.classList.add('img-full'); 
                        containerFullScreen.appendChild(imagenFull);                       
                        containerFullScreen.insertAdjacentElement('afterbegin',imagenFull);
                        containerFullScreen.classList.toggle("show-full");                        
                          
                        let agregarFavoritosFullT = document.createElement("div"); // FAVORITO ICONO         
                        agregarFavoritosFullT.classList.add("no-favoritos");
                        agregarFavoritosFullT.classList.add("favoritosF");
                        containerFullScreen.appendChild(agregarFavoritosFullT);

                        const idAlLocalSFF = gifData2.data[i].id;
                        for (let i = 0; i < localStorage.length; i++) {
            
                           if ((localStorage.key(i).startsWith(`imagen-${idAlLocalSFF}`)) == true){
                                  
                          // console.log("entro a favorito");
                           let favoritoActiveF = document.querySelector(".no-favoritos")
                           favoritoActiveF.classList.remove("no-favoritos");
                           favoritoActiveF.classList.add("favorito");
                           //console.log("favorito active" + favoritoActive);
                           }
                        }
    
    
    
                        let descargargifFullT = document.createElement("input"); // DESCARGA ICONO
                        descargargifFullT.type = "image";
                        descargargifFullT.src ="assets/images/icon-download.svg";
                        descargargifFullT.dataset.urlDescarga = url;
                        descargargifFullT.dataset.nombreDescarga = nombre; 
                        descargargifFullT.classList.add("favoritosFd");
                        containerFullScreen.appendChild(descargargifFullT);
    
                        let cerrarFullScreen = document.createElement("input"); // ICONO X CERRAR FULL SCREEN
                        cerrarFullScreen.type = "image";
                        cerrarFullScreen.src ="assets/images/close.svg";
                        cerrarFullScreen.classList.add("favoritosFx");                        
                        containerFullScreen.appendChild(cerrarFullScreen);
    
                        let titleFullScreenUser = document.createElement("h4"); // 
                        titleFullScreenUser.textContent = gifData2.data[i].username;  //titleFullScreen user
                        titleFullScreenUser.classList.add('titleFullScreen');
                        containerFullScreen.appendChild(titleFullScreenUser);
    
                        let titleFullScreen = document.createElement("h3"); // //titleFullScreen title gifo
                        titleFullScreen.textContent = gifData2.data[i].title;  
                        titleFullScreen.classList.add('titleFullScreen');                                         
                        containerFullScreen.appendChild(titleFullScreen);
    
                        ////// Enviar favoritos al local storage
                      
                        agregarFavoritosFullT.addEventListener("click",(e)=>{               
                  
                            if(e.currentTarget.classList.contains("favorito")){
                             e.currentTarget.classList.remove("favorito");
                             const idAlLocalS1 = gifData2.data[i].id;
                            // console.log(idAlLocalS1);
                                for (let i = 0; i < localStorage.length; i++) {
                                    if (localStorage.key(i).startsWith(`imagen-${idAlLocalS1}`)){
                                  //  gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
                                      localStorage.removeItem(`imagen-${idAlLocalS1}`);
                                      location.href = location.href;
                                      
        
                                    }
                                }                                              
                              
                               
                            }else{
                                e.currentTarget.classList.add("favorito");
                               const idAlLocalS = gifData2.data[i].id;
                              // console.log(idAlLocalS);
                               localStorage.setItem(`imagen-${idAlLocalS}`,JSON.stringify(gifData2.data[i])); 
                               location.href = location.href;
        
                            }
                        });
                        
                        // descarga
                        descargargifFullT.addEventListener("click",(e)=>{
    
                            async function descargarGif(url, nombre) {                       
                                await fetch(url).then((img)=> {
                                      img.blob().then((file)=>{
                                          let a = document.createElement("a");
                                          a.href = URL.createObjectURL(file);
                                          a.download= nombre;
                                          a.click();
                                      });
                                  });
                              }  
                              descargarGif(url, nombre);               
        
                        });
    
                        cerrarFullScreen.addEventListener("click",(e)=>{  
                            containerFullScreen.style.display = "none";
                        });
                        
                    } 
 
                });            
        }

       
            
        })    
    }     
});


// trending - texto dinamico

async function getTrendingActual(trendingActual){   
    let url3 = `https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`;
    let response3 = await fetch(url3);
    dataGif3 = await response3.json();
    return dataGif3;
}

let trendingDinamico = document.getElementById("trendingDinamico");

getTrendingActual().then((dataGif3) => {  
    for(let i=0; i < dataGif3.data.length; i++){       
      //console.log(dataGif3.data[0]);
    }
  
    let template =   `<a href="#" onclick="searchTrendingText();" class="styleA">${dataGif3.data[0]}<span>, </span></a> 
                      <a href="#" onclick="searchTrendingText1();" class="styleA">${dataGif3.data[1]}<span>, </span></a> 
                      <a href="#" onclick="searchTrendingText2();" class="styleA">${dataGif3.data[2]}<span>, </span></a> 
                      <a href="#" onclick="searchTrendingText3();" class="styleA">${dataGif3.data[3]}<span>,  </span></a> 
                      <a href="#" onclick="searchTrendingText4();" class="styleA">${dataGif3.data[4]}</a>`                

    trendingDinamico.insertAdjacentHTML('beforeend', template);      
});


let searchTrendingText = () => {
    let styleAclass = document.getElementsByClassName('styleA')[0];
    let textoBusquedaTrending = document.getElementById('textoBusqueda');
    textoBusquedaTrending.value = styleAclass.textContent;    
    search(); 
    textoBusquedaTrending.value = "";

}

let searchTrendingText1 = () => {
    let styleAclass1 = document.getElementsByClassName('styleA')[1];
    let textoBusquedaTrending = document.getElementById('textoBusqueda');
    textoBusquedaTrending.value = styleAclass1.textContent;
    search(); 
    textoBusquedaTrending.value = "";
}

let searchTrendingText2 = () => {
    let styleAclass2 = document.getElementsByClassName('styleA')[2];
    let textoBusquedaTrending = document.getElementById('textoBusqueda');
    textoBusquedaTrending.value = styleAclass2.textContent;
    search(); 
    textoBusquedaTrending.value = "";
}

let searchTrendingText3 = () => {
    let styleAclass3 = document.getElementsByClassName('styleA')[3];
    let textoBusquedaTrending = document.getElementById('textoBusqueda');
    textoBusquedaTrending.value = styleAclass3.textContent;
    search(); 
    textoBusquedaTrending.value = "";
}

let searchTrendingText4 = () => {
    let styleAclass4 = document.getElementsByClassName('styleA')[4];
    let textoBusquedaTrending = document.getElementById('textoBusqueda');
    textoBusquedaTrending.value = styleAclass4.textContent;
    search(); 
    textoBusquedaTrending.value = "";
}


// Modo Nocturno - Menu desplegable

let mode = document.getElementsByTagName("li")[0]; 
let modoNoc = document.getElementById("modo");
modoNoc.addEventListener("click", () =>{
    mode.classList.add("dark");   
    
    if (document.modo === "Modo Diurno") {
        cambioTexto("Modo Diurno", "Modo Nocturno");          
    }else {
        cambioTexto("Modo Nocturno","Modo Diurno");      
    } 
    if(document.modo === "Modo Nocturno"){
       mode.classList.remove("dark");      
    } 
});

//cambioModoMenu

var textomenu = document.getElementById("modo");
function cambioTexto(mododiurno, modonocturno) {
    document.modo = modonocturno;     
    textomenu.innerHTML = modonocturno;  
    textomenu.classList.add("capitalize");
}

// Modo Nocturno - backgrounds, img, border y textos en general

let onclickonmodo = document.getElementById("modo");
let darkMode = document.getElementsByClassName("modeDark");
let cambioImgHeader = document.getElementsByTagName("img")[0];
let cambioImgSearch = document.getElementsByTagName("input")[2];
       
onclickonmodo.addEventListener("click", () =>  {
    for (let i = 0; i < darkMode.length; i++) {
        let arraydark = darkMode[i].classList.toggle("modeDarkGeneral");
    }      
        
    cambioImgHeader.src = "assets/images/logo-desktop-modo-noc.svg";       
    cambioImgSearch.src = "assets/images/icon-search-mod-noc.svg";
    if (document.modo == "Modo Nocturno"){
        cambioImgHeader.src = "assets/images/logo-mobile.svg";
        cambioImgSearch.src ="assets/images/icon-search.svg";
    }   
       
});

























