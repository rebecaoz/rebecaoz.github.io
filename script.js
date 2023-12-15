let intentos = 0;
var word = "APPLE";
const GRID = document.getElementById("grid");
const ROW = document.createElement('div');
ROW.className = 'row';
var diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

word=diccionario[getRandomInt(4)];
//console.log(word);

async function promesa(){
    let url= 'https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase';
    let response= await fetch(url);
    if(!response.ok){
        return word;

    }

    let myJson= await response.json();
    let palabra= myJson[0];
    //console.log(word);
    return palabra;
    
    
}

promesa()
    .then((palabra)=>{
        const button = document.getElementById("guess-button");


        button.addEventListener('click',intentar);



        function leerIntento(){
            let intento = document.getElementById("guess-input");
            intento = intento.value;
            intento = intento.toUpperCase(); 
            return intento;
        }


        function intentar(){
            const INTENTO = leerIntento();
            console.clear();
            //console.log(INTENTO);
            //console.log(palabra);
            
            if(INTENTO.length==5){
                
                if(INTENTO==palabra){
                    terminar("<h1>GANASTE!😵</h1>");
                    GRID.appendChild(ROW);
                    ROW.innerHTML='<img src="https://media.giphy.com/media/o75ajIFH0QnQC3nCeD/giphy.gif">';
                    return;
                }

                for(let i in palabra){
                    const SPAN = document.createElement('span');
                    SPAN.className = 'letter';
                    if(palabra[i]==INTENTO[i]){
                        SPAN.innerHTML = INTENTO[i];
                        SPAN.style.backgroundColor = 'green';
                    }else if(palabra.includes(INTENTO[i])){
                        SPAN.innerHTML = INTENTO[i];
                        SPAN.style.backgroundColor = 'yellow';
                        SPAN.style.borderColor='#FDE12D';
                        
                        
                    }else{
                        SPAN.innerHTML = INTENTO[i];
                        SPAN.style.backgroundColor = 'grey';
                    }
                    ROW.appendChild(SPAN);   
                }
                GRID.appendChild(ROW)
                        
                intentos++;
                //console.log(intentos);
                
                if(intentos==5){
                    terminar("<h1>PERDISTE!😖</h1>");
                    GRID.appendChild(ROW);
                    ROW.innerHTML='<img src="https://media.giphy.com/media/u03ahOT8hXFUGYaZ1n/giphy.gif">';
                }   
            }else{
                alert("La palabra debe tener 5 letras")
            }
            
        }

        function terminar(mensaje){
            const INPUT = document.getElementById("guess-input");
            INPUT.disabled = true;
            button.disabled = true;
            let contenedor = document.getElementById('guesses');
            contenedor.innerHTML = mensaje;
        }

        })
    .catch(e=>console.log(e));
