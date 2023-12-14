let intentos = 0;
let palabra = "APPLE";
const GRID = document.getElementById("grid");
const ROW = document.createElement('div');
ROW.className = 'row';
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

palabra=diccionario[getRandomInt(4)];
console.log(palabra);



const button = document.getElementById("guess-button");


button.addEventListener('click',intentar);

//Leer intentos
//const input = document.getElementById("guess-input");
//const valor = input.value;

function leerIntento(){
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase(); 
    return intento;
}


function intentar(){
    const INTENTO = leerIntento();
    console.clear();
    console.log(INTENTO);
    
    if(INTENTO.length==5){
        
        if(INTENTO==palabra){
            terminar("<h1>GANASTE!😵</h1>");
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
        console.log(intentos);
        
        if(intentos==5){
            terminar("<h1>PERDISTE!😖</h1>");
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







