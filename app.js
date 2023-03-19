let main = document.getElementsByTagName("main")[0];
let div;
let objetivo;
let j1;
let j2;
let posicionesOcupadas = {
    j1: null,
    j2: null,
};
let posicionObjetivo;
let puntos = {
    puntos_j1: 0,
    puntos_j2: 0
}
let nFilas;
let nColumnas;

/**
 * Funcion que recibe por parametro el evento producido y dependiendo del codigo se ejecuta una funcion u otra.
 * @param {event} evento
 * @returns no
 */
function movimiento(event) {
    switch (event.code) {
        case "ArrowUp":
            moveUp("j1");
            break;
        case "ArrowDown":
            moveDown("j1");
            break;
        case "ArrowLeft":
            moveLeft("j1");
            break;
        case "ArrowRight":
            moveRight("j1");
            break;
        case "KeyW":
            moveUp("j2");
            break;
        case "KeyS":
            moveDown("j2");
            break;
        case "KeyA":
            moveLeft("j2");
            break;
        case "KeyD":
            moveRight("j2");
            break;
        default:
            break;
    }
}

/**
 * Funcion que crea los marcadores y los añade al HTML
 * @param no
 * @returns no
 */
function marcadores() {
    let contenedorContador;
    let contador;
    let h1;
    let p;
    contenedorContador = document.createElement("div");
    contenedorContador.classList.add("container-contadores");
    for (let i = 0; i < 2; i++) {
        contador = document.createElement("div");
        contador.setAttribute("class", `contador`);
        contador.setAttribute("id", `j${(i + 1)}`);
        contenedorContador.appendChild(contador);
        h1 = document.createElement("h1");
        h1.textContent = `Jugador ${(i + 1)}`;
        p = document.createElement("p");
        p.textContent = puntos[`puntos_j${(i + 1)}`];
        contador.appendChild(h1);
        contador.appendChild(p);
        main.appendChild(contenedorContador);
    }

}
/**
 * Funcion que recibe el id del contador que debe sumar y lo suma en el HTML.
 * @param {String} id 
 * @returns no
 */
function sumarContador(id) {
    let contadorSumar = document.getElementById(id);
    let p = contadorSumar.getElementsByTagName("p")[0];
    puntos[`puntos_${id}`]++;
    p.textContent = puntos[`puntos_${id}`];
}
/**
 * Funcion que valida si hay un ganador y de ser el caso muestra el alert y ejecuta las funciones correspondientes.
 * @param {String} clase
 * @param {String} posiciones
 * @returns no
 */
function validarGanador(clase, posiciones) {
    let boton;
    let contador;
    if (posiciones === posicionObjetivo) {
        alert(`Ha ganado ${clase}`);
        document.removeEventListener("keydown", movimiento);
        boton = document.getElementsByClassName("reset")[0];
        contador = document.getElementsByClassName("container-contadores")[0];
        boton.style.display = "block";
        contador.style.display = "flex";
        sumarContador(clase);
    }
}
/**
 * Funcion que recibe por parametro el numero de fila y columnas y ajusta el tamaño del tablero en funcion de la diferencia.
 * @param {number} nFilas
 * @param {number} nColumnas
 * @returns no
 */
function ajustarTamanio(nFilas, nColumnas) {
    main.style.height = "100vh";
    main.style.width = "100vw";

    if (Math.abs(nFilas - nColumnas) >= 4) {
        if (nFilas > nColumnas) {
            main.style.width = `${(nColumnas * 100) / nFilas}vw`;
        } else {
            main.style.height = `${(nFilas * 100) / nColumnas}vh`;
        }
    }
}
/**
 * Funcion que recibe por parametro el numero de fila y columnas y crea la cantidad de casillas correspondiente.
 * @param {number} nFilas
 * @param {number} nColumnas
 * @returns no
 */
function crearCasillas(nFilas, nColumnas) {
    let div;
    for (let i = 0; i < nFilas; i++) {
        for (let j = 0; j < nColumnas; j++) {
            div = document.createElement("div");
            div.classList.add("casilla");
            div.setAttribute("id", `f${i}c${j}`);
            main.appendChild(div);

        }
    }
}
/**
 * Funcion que incia el tablero.
 * @param no
 * @returns no
 */
function inicio() {
    nFilas = Math.floor(Math.random() * 24) + 5;
    nColumnas = Math.floor(Math.random() * 24) + 5;
    main.classList.add("container");
    main.style.gridTemplateColumns = `repeat(${nColumnas}, 1fr)`;
    main.style.gridTemplateRows = `repeat(${nFilas}, 1fr)`;

    ajustarTamanio(nFilas, nColumnas);
    crearCasillas(nFilas, nColumnas);

    pintarCasillas();
    boton();
    marcadores();
}
/**
 * Funcion que recibe por parametro el id de la casilla y devuelve el id con una fila sumada
 * @param {string} id
 * @returns {string} id
 */
function sumarFila(id) {
    let posicionColumna = id.indexOf("c");
    let valorColumna = parseInt(id.substring(posicionColumna + 1));
    let valorFila = parseInt(id.substring(1, posicionColumna));

    if (valorFila < nFilas - 1) {
        valorFila++;
    }
    return convertirId([valorFila, valorColumna]);
}
/**
 * Funcion que recibe por parametro el id de la casilla y devuelve el id con una fila restada
 * @param {string} id
 * @returns {string} id
 */
function RestarFila(id) {
    let posicionColumna = id.indexOf("c");
    let valorColumna = parseInt(id.substring(posicionColumna + 1));
    let valorFila = parseInt(id.substring(1, posicionColumna));

    if (valorFila > 0) {
        valorFila--;
    }
    return convertirId([valorFila, valorColumna]);
}
/**
 * Funcion que recibe por parametro el id de la casilla y devuelve el id con una columna sumada
 * @param {string} id
 * @returns {string} id
 */
function sumarColumna(id) {
    let posicionColumna = id.indexOf("c");
    let valorColumna = parseInt(id.substring(posicionColumna + 1));
    let valorFila = parseInt(id.substring(1, posicionColumna));

    if (valorColumna < nColumnas - 1) {
        valorColumna++;
    }
    return convertirId([valorFila, valorColumna]);
}
/**
 * Funcion que recibe por parametro el id de la casilla y devuelve el id con una columna restada
 * @param {string} id
 * @returns {string} id
 */
function restarColumna(id) {
    let posicionColumna = id.indexOf("c");
    let valorColumna = parseInt(id.substring(posicionColumna + 1));
    let valorFila = parseInt(id.substring(1, posicionColumna));

    if (valorColumna > 0) {
        valorColumna--;
    }
    return convertirId([valorFila, valorColumna]);
}
/**
 * Funcion que recibe por parametro la clase de la ficha a mover y la mueve si esta posicion no esta ocupada
 * @param {string} clase
 * @returns no
 */
function moveUp(clase) {
    let posicionActual = posicionesOcupadas[clase];
    let casillaActual = document.getElementById(posicionActual);
    let posicionNueva = RestarFila(posicionActual);


    if (!Object.values(posicionesOcupadas).includes(posicionNueva)) {
        casillaActual.classList.remove(clase);
        casillaActual.removeAttribute("style");
        imprimirCasilla(clase, posicionNueva, "Up");
    }

}

/**
 * Funcion que recibe por parametro la clase de la ficha a mover y la mueve si esta posicion no esta ocupada
 * @param {string} clase
 * @returns no
 */
function moveDown(clase) {
    let posicionActual = posicionesOcupadas[clase];
    let casillaActual = document.getElementById(posicionActual);
    let posicionNueva = sumarFila(posicionActual);

    if (!Object.values(posicionesOcupadas).includes(posicionNueva)) {
        casillaActual.classList.remove(clase);
        casillaActual.removeAttribute("style");
        imprimirCasilla(clase, posicionNueva, "Down");
    }


}
/**
 * Funcion que recibe por parametro la clase de la ficha a mover y la mueve si esta posicion no esta ocupada
 * @param {string} clase
 * @returns no
 */
function moveRight(clase) {
    let posicionActual = posicionesOcupadas[clase];
    let casillaActual = document.getElementById(posicionActual);
    let posicionNueva = sumarColumna(posicionActual);


    if (!Object.values(posicionesOcupadas).includes(posicionNueva)) {
        casillaActual.classList.remove(clase);
        casillaActual.removeAttribute("style");
        imprimirCasilla(clase, posicionNueva, "Right");
    }


}
/**
 * Funcion que recibe por parametro la clase de la ficha a mover y la mueve si esta posicion no esta ocupada
 * @param {string} clase
 * @returns no
 */
function moveLeft(clase) {
    let posicionActual = posicionesOcupadas[clase];
    let casillaActual = document.getElementById(posicionActual);
    let posicionNueva = restarColumna(posicionActual);

    if (!Object.values(posicionesOcupadas).includes(posicionNueva)) {
        casillaActual.classList.remove(clase);
        casillaActual.removeAttribute("style");
        imprimirCasilla(clase, posicionNueva, "Left");
    }


}
/**
 * Funcion que reinicia todo el juego.
 * @param no
 * @returns no
 */
function reset() {
    posicionesOcupadas = {
        j1: null,
        j2: null,
    };
    main.replaceChildren();
    inicio();
    document.addEventListener("keydown", movimiento);
}
/**
 * Funcion que crea el boton de reinicio.
 * @param no
 * @returns no
 */
function boton() {
    let boton = document.createElement("button");
    boton.classList.add("reset");
    boton.textContent = "Volver a Jugar";
    boton.setAttribute("onclick", "reset()");
    main.appendChild(boton);
}
/**
 * Funcion que recibe por parametro la fila y columna limite y devuelve una posicion valida que no exista ya.
 * @param {Number} columnaLimite
 * @param {Number} filaLimite
 * @returns {String} id
 */
function generarPosicionesAleatorias(filaLimite, columnaLimite) {
    let fila;
    let columna;
    let id;
    do {
        fila = Math.floor(Math.random() * filaLimite);
        columna = Math.floor(Math.random() * columnaLimite);
        id = convertirId([fila, columna]);
    } while (Object.values(posicionesOcupadas).includes(id) || id == posicionObjetivo);
    return convertirId([fila, columna]);
}
/**
 * Funcion que recibe por parametro las posiciones en formato array y devuelve el id en cadena
 * @param {number[]} posiciones
 * @returns {string} id
 */
function convertirId(posiciones) {
    return `f${posiciones[0]}c${posiciones[1]}`;
}
/**
 * Funcion que recibe por parametro la clase, posicion y estaddo de la ficha a imprimir por pantalla
 * @param {string} clase
 * @param {string} posiciones
 * @param {string} estado
 * @returns no
 */
function imprimirCasilla(clase, posiciones, estado) {
    let casilla = document.getElementById(posiciones);
    casilla.classList.add(clase);

    switch (clase) {
        case "objetivo":
            posicionObjetivo = posiciones;
            casilla.style.backgroundImage = `url(img/${clase}${estado}.png)`;
            break;
        default:
            if (estado === "Roca") {
                casilla.style.backgroundImage = `url(img/${estado}.png)`;
            } else {
                casilla.style.backgroundImage = `url(img/${clase}${estado}.png)`;
            }
            posicionesOcupadas[clase] = posiciones;
            validarGanador(clase, posiciones);
            break;
    }
}
/**
 * Funcion que recibe por parametro la cantidad de obstaculos a crear y los crea en el tablero
 * @param {number} cantidad
 * @returns no
 */
function crearObstaculos(cantidad) {
    for (let i = 0; i < cantidad; i++) {
        imprimirCasilla(`roca${i}`, generarPosicionesAleatorias(nFilas, nColumnas), "Roca");
    }
}
/**
 * Funcion que pinta en el tablero las fichas de los jugadores, objetivo y tesoro
 * @param no
 * @returns no
 */
function pintarCasillas() {
    /**Usar MATH.RANDOM con las nfilas y ncolumnas para colocarlo en el sitio  */
    imprimirCasilla("objetivo", generarPosicionesAleatorias(nFilas, nColumnas), "objetivo");
    imprimirCasilla("j1", generarPosicionesAleatorias(nFilas, nColumnas), "Down");
    imprimirCasilla("j2", generarPosicionesAleatorias(nFilas, nColumnas), "Down");
    crearObstaculos((nFilas * nColumnas) / 10);
}

// agregamos el evento load al documento
document.addEventListener("load", inicio());
document.addEventListener("keydown", movimiento);