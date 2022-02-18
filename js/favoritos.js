
// favoritos 

const divContenedorFavVacio = document.getElementById("guardaPrimerFav");
const mostrarFavoritos = document.getElementById("mostrarFavoritos");


function displayGifs1(e) {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).startsWith('imagen-')) {
        gifObj = JSON.parse(localStorage.getItem(localStorage.key(i)));
        //console.log(gifObj);        
        divContenedorFavVacio.style.display = "none";       

        const template =   `<div class="contenedor-img" id="${gifObj.id}">
                             <div class="favoritoHover" id="${gifObj.embed_url}"></div>
                             <div class="favoritoHoverDescarga" id="${gifObj.title}"></div>
                             <div class="favoritoHoverAmpliar" id="${gifObj.slug}"></div>
                           </div>`
        mostrarFavoritos.insertAdjacentHTML('beforeend', template);     

       let contenedorimg = document.getElementById(`${gifObj.id}`);     

        const templateImg = `<img src="${gifObj.images.original.url}"  id="${gifObj.bitly_url}" class="classImgFav" alt=""No se pudo cargar el favorito"></img>`
        contenedorimg.insertAdjacentHTML('beforeend', templateImg); 
    
        let imagenFav = document.getElementById(`${gifObj.bitly_url}`);
        
        let eliminarFavorito = document.getElementById(`${gifObj.embed_url}`);
        let favoritoHoverDescarga = document.getElementById(`${gifObj.title}`);
        let favoritoHoverAmpliar = document.getElementById(`${gifObj.slug}`);
        
        contenedorimg.addEventListener("mouseover",(e)=>{  
          
          eliminarFavorito.style.zIndex = 1;
          eliminarFavorito.classList.add("bgFavCorazon");

          favoritoHoverDescarga.style.zIndex = 1;
          favoritoHoverDescarga.classList.add("bgFavCorazon");

          favoritoHoverAmpliar.style.zIndex = 1;
          favoritoHoverAmpliar.classList.add("bgFavCorazon");

          imagenFav.classList.add("bgFavCapa");

            contenedorimg.addEventListener("mouseout",(e)=>{
              eliminarFavorito.style.zIndex = 0;
              favoritoHoverDescarga.style.zIndex = 0;
              favoritoHoverAmpliar.style.zIndex = 0;

              imagenFav.classList.remove("bgFavCapa");
            });

        });
        // corazon
          eliminarFavorito.addEventListener("mouseover",(e)=>{            
              eliminarFavorito.classList.add("bgFavCorazonMO");   
              
                eliminarFavorito.addEventListener("mouseout",(e)=>{
                  eliminarFavorito.classList.remove("bgFavCorazonMO");
                });        
          });       

          eliminarFavorito.addEventListener("click",(e)=>{
           // alert("remover del localstorage");
            if (e.currentTarget) { 
              let gitObjetId = JSON.parse(localStorage.getItem(localStorage.key(i)));              
              //console.log(gitObjetId);
              if (localStorage.key(i).startsWith(`imagen-${gitObjetId.id}`)){
                   localStorage.removeItem(`imagen-${gitObjetId.id}`);
                   location.href = location.href;
              }
              
            }
          });

          // descarga
          favoritoHoverDescarga.addEventListener("mouseover",(e)=>{            
            favoritoHoverDescarga.classList.add("bgFavCorazonMO");   
            
            favoritoHoverDescarga.addEventListener("mouseout",(e)=>{
              favoritoHoverDescarga.classList.remove("bgFavCorazonMO");
              });        
           });

           let url = gifObj.images.downsized.url;  // url descarga         
           let nombre = gifObj.title;  //titulo descarga 

           favoritoHoverDescarga.dataset.urlDescarga = url;
           favoritoHoverDescarga.dataset.nombreDescarga = nombre; 

            favoritoHoverDescarga.addEventListener("click",(e)=>{
             // alert("descargar");

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


             // ampliar

            favoritoHoverAmpliar.addEventListener("mouseover",(e)=>{            
              favoritoHoverAmpliar.classList.add("bgFavCorazonMO");   
            
               favoritoHoverAmpliar.addEventListener("mouseout",(e)=>{
                favoritoHoverAmpliar.classList.remove("bgFavCorazonMO");
               });

            });

            const imagenFull = document.createElement("img");
                 imagenFull.src = gifObj.images.downsized.url; // tamaño original gif
                 imagenFull.alt = "Error al cargar el gif";

            favoritoHoverAmpliar.addEventListener("click",(e)=>{
                 // alert("ampliar");

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

                    const idAlLocalSFF = gifObj.id;
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
                    titleFullScreenUser.textContent = gifObj.username;  //titleFullScreen user
                    titleFullScreenUser.classList.add('titleFullScreen');
                    containerFullScreen.appendChild(titleFullScreenUser);

                    let titleFullScreen = document.createElement("h3"); // //titleFullScreen title gifo
                    titleFullScreen.textContent = gifObj.title;  
                    titleFullScreen.classList.add('titleFullScreen');                                         
                    containerFullScreen.appendChild(titleFullScreen);

                     ////// Enviar favoritos al local storage
                      
                     agregarFavoritosFullT.addEventListener("click",(e)=>{               
                  
                      if(e.currentTarget.classList.contains("favorito")){
                       e.currentTarget.classList.remove("favorito");
                       const idAlLocalS1 = gifObj.id;
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
                         const idAlLocalS = gifObj.id;
                        // console.log(idAlLocalS);
                         localStorage.setItem(`imagen-${idAlLocalS}`,JSON.stringify(gifObj.data[i])); 
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
     }
     
 }
 displayGifs1();
