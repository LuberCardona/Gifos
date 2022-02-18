
//  CREAR GIF  comenzar
let btnComenzar = document.getElementsByClassName("comenzar")[0];
let h2cambio = document.getElementById("textCapture");
let p1cambio = document.getElementById("parrafo1Capture");
let p2cambio = document.getElementById("parrafo2Capture");
let boton1 = document.getElementsByClassName("boton123")[0];

btnComenzar.addEventListener("click", ()=>{
  btnComenzar.classList.add("hide"); 
  h2cambio.textContent = "¿Nos das accceso a tu cámara?"; 
  p1cambio.textContent = "El acceso a tu cámara será válido sólo";
  p2cambio.textContent = "por el tiempo en el que estés creando el GIFO";  
  boton1.classList.add("btnhover");
 
  btnComenzar.style.display = "none";

});

// acceso a la camara
let btn1 = document.getElementsByClassName("boton123")[0];
let camara = document.getElementById("camara");
let btn2 = document.getElementsByClassName("boton123")[1];
let bntComenzarGrabar = document.getElementById("bnt-comenzar-grabar");


function getStreamAndRecord () { 
  navigator.mediaDevices.getUserMedia({ 
      audio: false,
      video: {
        height: { max: 480 }
    }
  }).then(stream =>{
      camara.srcObject = stream;
      camara.play()
  }).catch(console.error);
}


boton1.addEventListener("click", ()=>{ 
       
      getStreamAndRecord ();

      h2cambio.classList.add("hide");
      p1cambio.classList.add("hide");
      p2cambio.classList.add("hide"); 

      btn2.classList.toggle("btnhover");
      btn1.classList.toggle("btnhover");   
      
      let grabarbtn = document.getElementsByClassName("grabar")[0];
      grabarbtn.classList.toggle("show");
}); 

// start recording  
let grabarbtn = document.getElementsByClassName("grabar")[0];
let finalizarbtn = document.getElementsByClassName("finalizar")[0];
let repetir = document.getElementsByClassName("repetir")[0];
let counter = document.getElementById("counter");

grabarbtn.addEventListener("click",()=>{ 
  grabarbtn.classList.remove("show");
  finalizarbtn.classList.add("show"); 
  counter.style.display = "block";
  function startRecording() {
    recording = true;
    recorder = RecordRTC(camara.srcObject, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted: function() {
     // console.log('started')
      },
    });
    recorder.startRecording();   
  }  
  startRecording();
})
 
/// stop recording 
let subir = document.getElementsByClassName("subir")[0];
function stopRecording() {
    finalizarbtn.classList.remove("show");
    subir.classList.add("show");
    repetir.classList.add("show");
    counter.style.display = "none";
    camara.srcObject.getTracks().forEach(function (track) {
      track.stop();
    });
    recorder.stopRecording(function () {
      recording = false;
      // vista previa gif
      camara.style.display = "none";
      document.querySelector(".gif-preview-container").style.display = "block";
      preview = document.getElementById("gif-preview");
      preview.src = URL.createObjectURL(recorder.getBlob());
      
      // Crear formulario - enviar por el body del POST
      let form = new FormData();
      form.append("file", recorder.getBlob(), "myGif.gif");
      //.log(form.get('file'))

      let upload1 = document.getElementById("upload");

      upload1.addEventListener("click", () => {      
        subirGifo(form);

      });

    });
    pause();
}


function ocultarBtnSubirYrepetirCaptura(params) {
  subir.classList.remove("show");
  repetir.classList.remove("show");  
}

 
// timer
let hh = 0;
let mm = 0;
let ss = 0;
let time = 1000;
let cronometro;
function start() {
  cronometro = setInterval(()=>{timer();}, time);  
  //console.log(cronometro);
}
function pause() {
  clearInterval(cronometro);
}
function stop() {
  clearInterval(cronometro);
  hh = 0;
  mm = 0;
  ss = 0; 
  document.getElementById("counter").innerText = "00:00:00";
}
function timer() {
  ss++;
  if(ss == 60){
    ss = 0;
    mm++;
    if(mm = 60){
      mm = 0;
      hh++;
    }
  }
  let format = (mm < 10? "0" + mm : mm)+ ":" + (hh < 10 ? "0" + hh : hh)+ ":" +(ss < 10 ? "0" + ss : ss);
  document.getElementById("counter").innerText = format;
}

/// subir gifo 
let subiendoGifo = document.querySelector(".gif-preview-container");
let btn3 = document.getElementsByClassName("boton123")[2];


function subirGifo(gif) {

  let fondoSubirGifo = document.createElement("div");
  fondoSubirGifo.classList.add("fondoSubirGifo");
  subiendoGifo.appendChild(fondoSubirGifo);

  let loader = document.createElement("img");
  loader.src = "assets/images/loader.svg";
  loader.alt = "No se puedo cargar la imagen loader";
  loader.classList.add("loader");
  fondoSubirGifo.appendChild(loader);

  let textSubiendo = document.createElement("h3");
  textSubiendo.innerText = "Estamos subiendo tu GIFO";
  textSubiendo.classList.add("textSubiendo");
  fondoSubirGifo.appendChild(textSubiendo);

  btn2.classList.remove("btnhover");
  btn3.classList.add("btnhover");
  boton1.classList.remove("btnhover");
  
  
fetch("https://upload.giphy.com/v1/gifs?api_key=y6Smx1ReQyL4ug8v03jiGHOceC2CMJHS",
  {
    method: "POST",
    body: gif
  }
  ).then(response => {
      if (response.status === 200) {
       // console.log(response);

        textSubiendo.innerText = "GIFO Subido con exito";
        loader.src = "assets/images/check.svg"; 
        
        return response.json(); 
         
      } else {
        console.log('error.');
      }
      
    }).then(data11 => {
       // console.log(data11);
          fetch(
           // `https://api.giphy.com/v1/gifs/${data11.data}?&api_key=y6Smx1ReQyL4ug8v03jiGHOceC2CMJHS`
            `https://api.giphy.com/v1/gifs/${data11.data.id}?&api_key=y6Smx1ReQyL4ug8v03jiGHOceC2CMJHS`
          )
            .then(response => {
             // console.log(response);

              return response.json();
            })
            .then(data12 => {

             if(data12){

              const url5 = data12.data.images.downsized.url;
              //console.log(url5);
              const nombre5 = "mis gifos";
             // console.log(nombre5);
             

              const descargargif3 = document.createElement("input"); // DESCARGAR ICONO
              descargargif3.type = "image";
              descargargif3.dataset.url = url5;
              descargargif3.dataset.nombre = nombre5;
              descargargif3.src ="assets/images/icon-download.svg";           
              descargargif3.classList.add("favoritosD");
              fondoSubirGifo.appendChild(descargargif3);

              const link = document.createElement("div"); // copiar link
              //link.type = "image";
              //link.src ="assets/images/link.png";         
              link.classList.add("favoritosDLink");
              fondoSubirGifo.appendChild(link);
            
              ///// Descargar GIF          

              descargargif3.addEventListener("click",(e)=>{
              console.log("este es el click en el boton descarga");                

                async function descargarGif5 (url5, nombre5) {
                  await fetch(url5).then((img5)=> {
                      img5.blob().then((file5)=>{
                       // console.log(file5);
                          let a = document.createElement("a");
                          a.href = URL.createObjectURL(file5);
                        //  console.log(a)
                          a.download= nombre5;
                          a.click();
                      });
                  });
                  
                }descargarGif5(url5, nombre5);    
              });   
              
            // copiar link

            link.addEventListener("click", ()=>{
             // console.log("clic link");
              var $URL = data12.data.url;
             // console.log($URL);

              let inputCopy = document.createElement("input");
              inputCopy.type = "text";
              inputCopy.value = $URL;
              fondoSubirGifo.appendChild(inputCopy);   
              inputCopy.select();
              document.execCommand("copy");
              inputCopy.remove();
            });

              localStorage.setItem(`mygif-${data12.data.id}`,JSON.stringify(data12.data)            
              
            ); 
          }

        });
       
    });  
}





